
const SENSITIVE_WORDS_LIST = []

// 这里我们需要用到文件读取的方式来导入


// 将敏感词转为正则模式（处理特殊字符）
const pattern = SENSITIVE_WORDS_LIST.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')

// 最终正则：包含所有词，忽略大小写
const sensitiveRegex = new RegExp(pattern, 'i')

const hasSensitiveWord = (text:string):boolean=> {
  return sensitiveRegex.test(text)
}

// 替换函数（统一替换成“*”）
const replaceAllSensitiveWord = (text:string):string =>{
  return text.replace(sensitiveRegex, (match)=>{
    return '*'.repeat(match.length)
  })
}

export {
  hasSensitiveWord,
  replaceAllSensitiveWord
}
