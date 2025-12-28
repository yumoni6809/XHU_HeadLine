"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAllSensitiveWord = exports.hasSensitiveWord = void 0;
var SENSITIVE_WORDS_LIST = [];
// 这里我们需要用到文件读取的方式来导入
// 将敏感词转为正则模式（处理特殊字符）
var pattern = SENSITIVE_WORDS_LIST.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|');
// 最终正则：包含所有词，忽略大小写
var sensitiveRegex = new RegExp(pattern, 'i');
var hasSensitiveWord = function (text) {
    return sensitiveRegex.test(text);
};
exports.hasSensitiveWord = hasSensitiveWord;
// 替换函数（统一替换成“*”）
var replaceAllSensitiveWord = function (text) {
    return text.replace(sensitiveRegex, function (match) {
        return '*'.repeat(match.length);
    });
};
exports.replaceAllSensitiveWord = replaceAllSensitiveWord;
