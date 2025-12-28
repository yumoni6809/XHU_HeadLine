"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArticleHomeStore = void 0;
var vue_1 = require("vue");
var pinia_1 = require("pinia");
exports.useArticleHomeStore = (0, pinia_1.defineStore)('ArticleInfo', function () {
    var page = (0, vue_1.ref)(1);
    var size = (0, vue_1.ref)(10);
    var keyword = (0, vue_1.ref)('');
    var categoryId = (0, vue_1.ref)(undefined);
    var articleList = (0, vue_1.ref)([]);
    // 从后端数据设置
    var setArticleHomeInfoFromEnd = function (endData) {
        page.value = endData.page;
        size.value = endData.size;
        articleList.value = endData.list;
    };
    return {
        page: page,
        size: size,
        keyword: keyword,
        categoryId: categoryId,
        articleList: articleList,
        setArticleHomeInfoFromEnd: setArticleHomeInfoFromEnd
    };
});
