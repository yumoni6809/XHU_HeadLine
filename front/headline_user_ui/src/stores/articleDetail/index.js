"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArticleDetailStore = void 0;
var vue_1 = require("vue");
var pinia_1 = require("pinia");
exports.useArticleDetailStore = (0, pinia_1.defineStore)('ArticleDetailInfo', function () {
    var singleArticleInfo = (0, vue_1.ref)({
        id: null,
        title: '',
        categoryId: null,
        authorId: null,
        avatarUrl: '',
        coverImages: [],
        status: 0,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        createTime: '',
        content: '',
        source: '',
        updateTime: ''
    });
    // 重置articleDetailInfo
    var resetSingleArticleDetailInfo = function () {
        singleArticleInfo.value = {
            id: null,
            title: '',
            categoryId: null,
            authorId: null,
            avatarUrl: '',
            coverImages: [],
            status: 0,
            viewCount: 0,
            likeCount: 0,
            commentCount: 0,
            createTime: '',
            content: '',
            source: '',
            updateTime: ''
        };
    };
    // 定义状态
    var statusToDescription = {
        0: '待审核',
        1: '发布',
        2: '草稿',
        3: '删除'
    };
    // 从后端得到的信息中设置表单
    var setSingleArticleDetailInfoFromEndData = function (endFormData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        singleArticleInfo.value.id = (_a = endFormData.id) !== null && _a !== void 0 ? _a : null;
        singleArticleInfo.value.title = (_b = endFormData.title) !== null && _b !== void 0 ? _b : '';
        singleArticleInfo.value.categoryId = (_c = endFormData.categoryId) !== null && _c !== void 0 ? _c : null;
        singleArticleInfo.value.authorId = (_d = endFormData.authorId) !== null && _d !== void 0 ? _d : null;
        singleArticleInfo.value.avatarUrl = (_e = endFormData.avatarUrl) !== null && _e !== void 0 ? _e : '';
        singleArticleInfo.value.coverImages = (_f = endFormData.coverImages) !== null && _f !== void 0 ? _f : [];
        singleArticleInfo.value.status = (_g = endFormData.status) !== null && _g !== void 0 ? _g : 0;
        singleArticleInfo.value.viewCount = (_h = endFormData.viewCount) !== null && _h !== void 0 ? _h : 0;
        singleArticleInfo.value.likeCount = (_j = endFormData.likeCount) !== null && _j !== void 0 ? _j : 0;
        singleArticleInfo.value.commentCount = (_k = endFormData.commentCount) !== null && _k !== void 0 ? _k : 0;
        singleArticleInfo.value.createTime = (_l = endFormData.createTime) !== null && _l !== void 0 ? _l : '';
        singleArticleInfo.value.content = (_m = endFormData.content) !== null && _m !== void 0 ? _m : '';
        singleArticleInfo.value.source = (_o = endFormData.source) !== null && _o !== void 0 ? _o : '';
        singleArticleInfo.value.updateTime = (_p = endFormData.updateTime) !== null && _p !== void 0 ? _p : '';
    };
    return {
        singleArticleInfo: singleArticleInfo,
        statusToDescription: statusToDescription,
        resetSingleArticleDetailInfo: resetSingleArticleDetailInfo,
        setSingleArticleDetailInfoFromEndData: setSingleArticleDetailInfoFromEndData
    };
});
