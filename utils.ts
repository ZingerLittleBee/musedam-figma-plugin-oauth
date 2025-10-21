import { blue, bold, green, red, yellow } from '@std/fmt/colors'

export function getTime(): string {
	return new Date().toISOString()
}

export function logError(message: string, details?: Record<string, unknown>): void {
	const time = getTime()
	console.log(red(`❌🚨 [${time}] ERROR: ${bold(message)}`))
	if (details) {
		console.log(red(`   Details: ${JSON.stringify(details)}`))
	}
}

export function logWarning(message: string, details?: Record<string, unknown>): void {
	const time = getTime()
	console.log(yellow(`⚠️🔔 [${time}] WARNING: ${bold(message)}`))
	if (details) {
		console.log(yellow(`   Details: ${JSON.stringify(details)}`))
	}
}

export function logSuccess(message: string, details?: Record<string, unknown>): void {
	const time = getTime()
	console.log(green(`✅🎉 [${time}] SUCCESS: ${bold(message)}`))
	if (details) {
		console.log(green(`   Details: ${JSON.stringify(details)}`))
	}
}

export function logInfo(message: string, details?: Record<string, unknown>): void {
	const time = getTime()
	console.log(blue(`ℹ️📝 [${time}] INFO: ${bold(message)}`))
	if (details) {
		console.log(blue(`   Details: ${JSON.stringify(details)}`))
	}
}
