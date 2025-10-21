/**
 * 环境变量配置
 */
export const env = {
    PORT: parseInt(Deno.env.get('PORT') || '8080'),
    MUSEDAM_AUTH_URL: Deno.env.get('MUSEDAM_AUTH_URL')!,
    CALLBACK_URL: Deno.env.get('CALLBACK_URL')!,
} as const

/**
 * 验证必需的环境变量
 */
export function validateEnv() {
    const required =  ['CALLBACK_URL', 'MUSEDAM_AUTH_URL']

    const missing = required.filter(key => !Deno.env.get(key))

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}`
        )
    }
}
