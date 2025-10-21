/**
 * 环境变量配置
 */
export const env = {
    PORT: parseInt(Deno.env.get('PORT') || '8080'),
    MUSEDAM_AUTH_URL: Deno.env.get('APP_REGION') === 'mainland' ? Deno.env.get('MUSEDAM_AUTH_URL_MAINLAND')! : Deno.env.get('MUSEDAM_AUTH_URL_OVERSEA')!,
    CALLBACK_URL: Deno.env.get('APP_REGION') === 'mainland' ? Deno.env.get('CALLBACK_URL_MAINLAND')! : Deno.env.get('CALLBACK_URL_OVERSEA')!,
} as const

/**
 * 验证必需的环境变量
 */
export function validateEnv() {
    const required =  ['APP_REGION']

    if (Deno.env.get('APP_REGION') === 'mainland') {
        required.push('MUSEDAM_AUTH_URL_MAINLAND', 'CALLBACK_URL_MAINLAND')
    } else {
        required.push('MUSEDAM_AUTH_URL_OVERSEA', 'CALLBACK_URL_OVERSEA')
    }

    const missing = required.filter(key => !Deno.env.get(key))

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}`
        )
    }
}
