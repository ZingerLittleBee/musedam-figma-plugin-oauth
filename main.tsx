import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import type { Context } from 'hono'
import { logError, logInfo, logSuccess, logWarning } from './utils.ts'
import { PluginAuthPage } from './components/PluginAuthPage.tsx'
import { AuthSuccessPage } from './components/AuthSuccessPage.tsx'
import { env } from './env.ts'

const app = new Hono()

logInfo('OAuth 服务初始化开始')

// 添加 CORS 中间件
app.use(
	'*',
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowHeaders: ['*'],
	}),
)

logInfo('CORS 中间件已配置', {
	origin: '*',
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.use(logger())

logInfo('Hono 日志中间件已启用')

// Time-to-live for a pending auth state. Must comfortably exceed the /read
// long-poll timeout so a legitimate login is never evicted mid-flight.
const STATE_TTL_MS = 10 * 60 * 1000
// Hard cap on concurrent pending states, so an abusive client that spams
// /plugin or /write with random states cannot grow memory without bound.
const MAX_STATES = 10_000

interface StateEntry {
	code?: string
	lng?: string
	app?: string
	createdAt: number
}

// Single bounded store for pending auth states, replacing the previously
// unbounded state2code / state2lng / state2app maps. Resolvers live in their
// own map because they are cleared eagerly on resolve/timeout.
const states = new Map<string, StateEntry>()
const state2resolver = new Map()

function getEntry(state: string): StateEntry | undefined {
	const entry = states.get(state)
	if (!entry) return undefined
	if (Date.now() - entry.createdAt > STATE_TTL_MS) {
		states.delete(state)
		return undefined
	}
	return entry
}

function upsertEntry(state: string, patch: Partial<StateEntry>): StateEntry {
	const existing = getEntry(state)
	if (existing) {
		Object.assign(existing, patch)
		return existing
	}
	if (states.size >= MAX_STATES) {
		// Evict the oldest entry (Map preserves insertion order).
		const oldest = states.keys().next().value
		if (oldest !== undefined) states.delete(oldest)
	}
	const entry: StateEntry = { createdAt: Date.now(), ...patch }
	states.set(state, entry)
	return entry
}

// Periodically drop expired states so idle keys do not accumulate.
setInterval(() => {
	const now = Date.now()
	for (const [state, entry] of states) {
		if (now - entry.createdAt > STATE_TTL_MS) states.delete(state)
	}
}, 60 * 1000)

logInfo('OAuth 状态存储已初始化', {
	states: 'Bounded map for state -> { code, lng, app } with TTL',
	state2resolver: 'Map for storing state-to-resolver mappings',
	ttlMs: STATE_TTL_MS,
	maxStates: MAX_STATES,
})

app.get('/', (c: Context) => {
	const response = {
		message: 'Hello from MuseDAM for Figma OAuth Service!',
		time: new Date().toISOString(),
	}
	return c.json(response)
})

// 插件路由，提供 HTML 内容
app.get('/plugin', (c: Context) => {
	logInfo('OAuth 插件授权流程开始', { path: '/plugin', method: 'GET' })

	const state = c.req.query('state')
	const lng = c.req.query('lng')
	const appParam = c.req.query('app') ?? 'figma'

	logInfo(`lng: ${lng}`)

	if (!state) {
		logWarning('插件授权请求缺少 state 参数')
	} else {
		logInfo('接收到 state 参数', { state })

		// Record the pending state so /write can look up lng/app later.
		upsertEntry(state, lng ? { lng, app: appParam } : { app: appParam })
		logInfo('已存储 state 的 lng/app 映射', { state, lng, app: appParam })
	}

	logSuccess('插件授权页面已生成', {
		state,
		redirectTarget: env.MUSEDAM_AUTH_URL,
	})

	return c.html(<PluginAuthPage state={state} />)
})

// 写入代码的路由
app.get('/write', (c: Context) => {
	logInfo('OAuth 授权码写入请求', { path: '/write', method: 'GET' })

	const state = c.req.query('state')
	const code = c.req.query('code')

	// Only accept a code for a state that /plugin previously registered.
	const entry = state ? getEntry(state) : undefined
	const lng = entry?.lng
	const appParam = entry?.app

	logInfo('接收到授权参数', { state, code: code ? '***' : undefined, lng })

	if (state && code && entry) {
		// Store the code on the pending entry.
		entry.code = code
		logSuccess('授权码已存储', { state, codeLength: code.length })

		// 如果有等待的解析器，解析它
		const resolver = state2resolver.get(state)
		if (resolver) {
			logInfo('找到等待的解析器，正在解析授权码', { state })
			resolver(code)
			state2resolver.delete(state)
			logSuccess('解析器已触发并清理', { state })
		} else {
			logInfo('暂无等待的解析器', { state })
		}
	} else {
		logWarning('授权码写入请求参数不完整或 state 未知', {
			hasState: !!state,
			hasCode: !!code,
			knownState: !!entry,
		})
	}

	// 返回自动拉起 Figma 的 HTML 页面
	logSuccess('授权成功页面已生成', {
		message: '用户将被重定向到 Figma 应用',
		lng,
	})

	return c.html(<AuthSuccessPage lng={lng} app={appParam} />)
})

// 读取代码的路由
app.get('/read', async (c: Context) => {
	logInfo('OAuth 授权码读取请求', { path: '/read', method: 'GET' })

	const state = c.req.query('state')

	if (!state) {
		logError('读取授权码请求缺少 state 参数')
		return c.text('Missing state parameter', 400)
	}

	logInfo('尝试读取授权码', { state })

	// If the code already arrived, return it and drop the state (one-time use).
	const entry = getEntry(state)
	if (entry?.code) {
		const code = entry.code
		states.delete(state)
		logSuccess('授权码已找到，立即返回', {
			state,
			codeLength: code.length,
		})
		return c.text(code)
	}

	// 否则等待代码
	logInfo('授权码尚未到达，开始等待', { state, timeoutMs: 300000 })

	try {
		const code: string = await new Promise((resolve, reject) => {
			// 设置超时
			const timeout = setTimeout(() => {
				state2resolver.delete(state)
				logWarning('等待授权码超时', { state, timeoutMs: 300000 })
				reject(new Error('Timeout waiting for code'))
			}, 300000) // 5分钟超时

			// 存储解析器
			state2resolver.set(state, (code: string) => {
				clearTimeout(timeout)
				logSuccess('通过解析器接收到授权码', {
					state,
					codeLength: code.length,
				})
				resolve(code)
			})

			logInfo('解析器已注册，等待授权码到达', { state })
		})

		// One-time use: drop the state now that the code has been delivered.
		states.delete(state)
		logSuccess('授权码等待完成，返回结果', {
			state,
			codeLength: code.length,
		})
		return c.text(code)
	} catch (error) {
		logError('授权码等待失败', {
			state,
			error: error instanceof Error ? error.message : 'Unknown error',
		})
		return c.text('Timeout waiting for authorization', 408)
	}
})

// 启动服务器
const port = parseInt(Deno.env.get('PORT') || '8080')
const host = Deno.env.get('HOST') || '0.0.0.0'

logInfo('准备启动 OAuth 服务器', { host, port })

Deno.serve({
	port,
	hostname: host,
}, app.fetch)

logSuccess('OAuth 服务器已启动', {
	host,
	port,
	url: `http://${host}:${port}`,
	endpoints: ['/plugin', '/write', '/read', '/'],
})
