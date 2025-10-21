// 支持的语言类型
export type SupportedLanguage = 'zh' | 'en'

// 翻译资源类型
interface TranslationResource {
  auth: {
    success: string
    returning: string
    openFigma: string
  }
}

// 翻译资源
const translations: Record<SupportedLanguage, TranslationResource> = {
  zh: {
    auth: {
      success: '授权成功',
      returning: '正在自动返回 Figma...',
      openFigma: '打开 Figma'
    }
  },
  en: {
    auth: {
      success: 'Authorization successful',
      returning: 'Automatically returning to Figma...',
      openFigma: 'Open Figma'
    }
  }
}

/**
 * 获取翻译文本
 * @param lng 语言代码，只支持 'zh' 和 'en'
 * @param key 翻译键，使用点号分隔的路径
 * @returns 翻译后的文本
 */
export function getTranslation(lng: string | undefined, key: string): string {
  // 标准化语言代码，只支持 zh 和 en
  const normalizedLng: SupportedLanguage = lng === 'zh' ? 'zh' : 'en'
  
  // 获取翻译资源
  const resource = translations[normalizedLng]
  
  // 解析键路径
  const keys = key.split('.')
  let value: any = resource
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // 如果找不到翻译，返回英文作为后备
      const fallbackResource = translations.en
      let fallbackValue: any = fallbackResource
      for (const fk of keys) {
        if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
          fallbackValue = fallbackValue[fk]
        } else {
          return key // 如果连英文都找不到，返回键本身
        }
      }
      return fallbackValue
    }
  }
  
  return typeof value === 'string' ? value : key
}

/**
 * 创建翻译函数
 * @param lng 语言代码
 * @returns 翻译函数
 */
export function createTranslator(lng: string | undefined) {
  return (key: string) => getTranslation(lng, key)
}
