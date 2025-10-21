#!/usr/bin/env -S deno run --allow-net test.ts

/**
 * 简单的功能测试脚本
 * 测试转换后的 OAuth 服务是否正常工作
 */

const BASE_URL = 'http://localhost:8081'

async function testEndpoint(path: string, expectedStatus: number = 200) {
	try {
		console.log(`Testing ${path}...`)
		const response = await fetch(`${BASE_URL}${path}`)

		if (response.status === expectedStatus) {
			console.log(`✅ ${path} - Status: ${response.status}`)
			return true
		} else {
			console.log(
				`❌ ${path} - Expected: ${expectedStatus}, Got: ${response.status}`,
			)
			return false
		}
	} catch (error) {
		console.log(
			`❌ ${path} - Error: ${
				error instanceof Error ? error.message : 'Invalid request'
			}`,
		)
		return false
	}
}

async function runTests() {
	console.log('🧪 开始测试 OAuth 服务...\n')

	// 测试基本端点
	const tests = [
		{ path: '/plugin?state=test123', status: 200 },
		{ path: '/write?state=test123&code=abc123', status: 200 },
		{ path: '/read?state=nonexistent', status: 408 }, // 应该超时，但我们只测试连接
	]

	let passed = 0
	const total = tests.length

	for (const test of tests) {
		const success = await testEndpoint(test.path, test.status)
		if (success) passed++
		await new Promise((resolve) => setTimeout(resolve, 100)) // 短暂延迟
	}

	console.log(`\n📊 测试结果: ${passed}/${total} 通过`)

	if (passed === total) {
		console.log('🎉 所有测试通过！OAuth 服务转换成功。')
	} else {
		console.log('⚠️  部分测试失败，请检查服务状态。')
	}
}

// 检查服务是否运行
async function checkService() {
	try {
		await fetch(BASE_URL)
		return true
	} catch {
		return false
	}
}

if (import.meta.main) {
	const isRunning = await checkService()

	if (!isRunning) {
		console.log('❌ OAuth 服务未运行。请先启动服务：')
		console.log('   cd packages/oauth && deno task dev')
		Deno.exit(1)
	}

	await runTests()
}
