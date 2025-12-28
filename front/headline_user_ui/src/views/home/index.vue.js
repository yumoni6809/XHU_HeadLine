"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Love_svg_1 = require("@/asset/img/Love.svg");
var lamb_love_svg_1 = require("@/asset/img/lamb-love.svg");
var vue_1 = require("vue");
var icons_vue_1 = require("@element-plus/icons-vue");
var vue_router_1 = require("vue-router");
var stores_1 = require("@/stores");
var main_js_1 = require("@/utils/axios/main.js");
var element_plus_1 = require("element-plus");
defineOptions({
    name: 'HomePage'
});
var router = (0, vue_router_1.useRouter)();
// 设置动画的过度方向
var animationTransitionStore = (0, stores_1.useAnimationTransitionStore)();
var setTransitionDirection = animationTransitionStore.setTransitionDirection;
var articleList = (0, vue_1.ref)([]);
var loading = (0, vue_1.ref)(false); // 增加加载状态
var bgUrl = (0, vue_1.ref)(''); // 背景图片路径
// 文章查询分页
var page = (0, vue_1.ref)(1);
var pageSize = 10;
var hasMore = (0, vue_1.ref)(true);
// 默认按时间排序，不显示切换按钮
var sort = (0, vue_1.ref)('time');
var timeRange = (0, vue_1.ref)('all');
// 获取文章列表数据
var getArticleList = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (reset) {
        var params, res, list, articles, error_1;
        var _a, _b, _c, _d, _e, _f;
        if (reset === void 0) { reset = false; }
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (loading.value)
                        return [2 /*return*/];
                    loading.value = true;
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, 4, 5]);
                    params = { page: page.value, size: pageSize, sort: sort.value };
                    // 新增：时间范围参数
                    if (timeRange.value && timeRange.value !== 'all') {
                        params.timeRange = timeRange.value;
                    }
                    return [4 /*yield*/, main_js_1.default.get('/user/news', {
                            params: params,
                            skipAuthRedirect: true
                        })];
                case 2:
                    res = _g.sent();
                    list = (_e = (_d = (_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : res === null || res === void 0 ? void 0 : res.data) !== null && _c !== void 0 ? _c : res === null || res === void 0 ? void 0 : res.rows) !== null && _d !== void 0 ? _d : res) !== null && _e !== void 0 ? _e : [];
                    articles = (Array.isArray(list) ? list : [])
                        .map(function (item) {
                        var _a, _b, _c, _d, _e;
                        var images = [];
                        var rawCover = item.coverImages || item.coverImage || '';
                        if (Array.isArray(rawCover)) {
                            images = rawCover;
                        }
                        else if (typeof rawCover === 'string' && rawCover.trim() !== '') {
                            var str = rawCover.trim();
                            if (str.startsWith('[') && str.endsWith(']')) {
                                try {
                                    images = JSON.parse(str);
                                }
                                catch (e) {
                                    images = str.split(',');
                                }
                            }
                            else {
                                images = str.split(',');
                            }
                        }
                        return __assign(__assign({}, item), { coverImages: images.filter(function (url) { return url && typeof url === 'string' && url.length > 0; }), avatarUrl: (_c = (_b = (_a = item.avatar_url) !== null && _a !== void 0 ? _a : item.avatarUrl) !== null && _b !== void 0 ? _b : item.authorAvatar) !== null && _c !== void 0 ? _c : '', authorName: (_e = (_d = item.authorName) !== null && _d !== void 0 ? _d : item.source) !== null && _e !== void 0 ? _e : '匿名用户', status: item.status !== undefined ? item.status : 1 });
                    })
                        .filter(function (item) { return item.status === 1; });
                    if (reset) {
                        articleList.value = articles;
                    }
                    else {
                        articleList.value = __spreadArray(__spreadArray([], articleList.value, true), articles, true);
                    }
                    hasMore.value = articles.length === pageSize;
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _g.sent();
                    if (((_f = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _f === void 0 ? void 0 : _f.status) === 401) {
                        element_plus_1.ElMessage.warning('该接口目前要求登录，需后端放开匿名访问');
                    }
                    else {
                        console.error(error_1);
                        element_plus_1.ElMessage.error('获取文章列表失败');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    loading.value = false;
                    setTimeout(function () {
                        var docHeight = document.documentElement.scrollHeight;
                        var winHeight = window.innerHeight;
                        if (hasMore.value && docHeight <= winHeight + 100 && articleList.value.length > 0) {
                            page.value += 1;
                            getArticleList();
                        }
                    }, 100);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
};
// 监听 layout 的筛选条件变化
var onFilterChange = function (e) {
    var detail = e.detail || {};
    sort.value = detail.sort || 'time';
    timeRange.value = detail.timeRange || 'all';
    page.value = 1;
    getArticleList(true);
};
// 点击帖子标题和摘要跳转到帖子首页
var jumpToArticleDetail = function (articleId) {
    if (!articleId)
        return;
    // 前进动画
    setTransitionDirection('forward');
    router.push({
        path: '/article',
        query: {
            id: articleId
        }
    });
};
// 定义是否点赞 (这里暂时是前端模拟，实际应该调用接口)
var handleLike = function (article) {
    // 注意：这里修改的是单个文章的点赞状态，而不是全局变量
    // 实际开发中应该调用后端点赞接口
    if (article.isLiked) {
        article.isLiked = false;
        article.likeCount = (article.likeCount || 0) - 1;
    }
    else {
        article.isLiked = true;
        article.likeCount = (article.likeCount || 0) + 1;
    }
};
// 无限滚动加载更多
var handleScroll = function () {
    if (loading.value || !hasMore.value)
        return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;
    // 距离底部200px时自动加载
    if (scrollTop + windowHeight + 200 >= docHeight) {
        page.value += 1;
        getArticleList();
    }
};
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var storedBg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storedBg = localStorage.getItem('backgroundImage');
                if (storedBg) {
                    bgUrl.value = storedBg;
                }
                articleList.value = [];
                page.value = 1;
                hasMore.value = true;
                return [4 /*yield*/, getArticleList(true)];
            case 1:
                _a.sent();
                window.addEventListener('scroll', handleScroll);
                // 监听筛选事件
                window.addEventListener('homeFilterChange', onFilterChange);
                return [2 /*return*/];
        }
    });
}); });
(0, vue_1.onUnmounted)(function () {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('homeFilterChange', onFilterChange);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['componentsCommonStyle']} */ ;
/** @type {__VLS_StyleScopedClasses['fancy-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['fancy-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['fancy-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "allContentContainer" }, { style: (__VLS_ctx.bgUrl ? { backgroundImage: "url(".concat(__VLS_ctx.bgUrl, ")") } : { backgroundColor: '#ffffff' }) }));
// @ts-ignore
[bgUrl, bgUrl,];
if (!__VLS_ctx.loading && __VLS_ctx.articleList.length === 0) {
    // @ts-ignore
    [loading, articleList,];
    var __VLS_0 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    ElEmpty;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        description: "暂无文章内容",
    }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
            description: "暂无文章内容",
        }], __VLS_functionalComponentArgsRest(__VLS_1), false));
}
var _loop_1 = function (article) {
    // @ts-ignore
    [articleList,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "singleArticle" }, { key: (article.hid || article.id) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.jumpToArticleDetail(article.hid || article.id);
            // @ts-ignore
            [jumpToArticleDetail,];
        } }, { class: "userInfoContainer" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "authorImage" }));
    var __VLS_5 = {}.ElAvatar;
    /** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
    // @ts-ignore
    ElAvatar;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        size: (40),
        src: (article.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'),
    }));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
            size: (40),
            src: (article.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'),
        }], __VLS_functionalComponentArgsRest(__VLS_6), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "postTimeAndAuthorName" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "authorName" }));
    (article.authorName || '匿名用户');
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "postTime" }));
    (article.createTime || article.createdAt);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.jumpToArticleDetail(article.hid || article.id);
            // @ts-ignore
            [jumpToArticleDetail,];
        } }, { class: "articleTitleContainer" }));
    (article.title);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.jumpToArticleDetail(article.hid || article.id);
            // @ts-ignore
            [jumpToArticleDetail,];
        } }, { class: "summaryContailer" }));
    (article.content ? article.content.replace(/<[^>]+>/g, '').substring(0, 80) + (article.content.length > 80 ? '...' : '') : '');
    if (article.coverImages && article.coverImages.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "coverImageDisplay" }));
        for (var _b = 0, _c = __VLS_getVForSourceType(((article.coverImages.length > 3 ? article.coverImages.slice(0, 3) : article.coverImages))); _b < _c.length; _b++) {
            var _d = _c[_b], image = _d[0], index = _d[1];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "singleCoverContainer" }, { key: (image) }));
            var __VLS_10 = {}.ElImage;
            /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
            // @ts-ignore
            ElImage;
            // @ts-ignore
            var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ class: "previewCoversInHome" }, { src: (image), fit: "cover", previewSrcList: (article.coverImages), initialIndex: (index), hideOnClickModal: true, loading: "lazy" })));
            var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ class: "previewCoversInHome" }, { src: (image), fit: "cover", previewSrcList: (article.coverImages), initialIndex: (index), hideOnClickModal: true, loading: "lazy" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
            if (index === 2 && article.coverImages.length > 3) {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "more-images-mask" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
                (article.coverImages.length - 3);
            }
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "otherComponents" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "componentsCommonStyle" }));
    var __VLS_15 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
    var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_16), false));
    var __VLS_19 = __VLS_18.slots.default;
    var __VLS_20 = {}.View;
    /** @type {[typeof __VLS_components.View, ]} */ ;
    // @ts-ignore
    icons_vue_1.View;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_21), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (article.pageViews || article.viewCount || 0);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "likedAndCommentComponent" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.handleLike(article);
            // @ts-ignore
            [handleLike,];
        } }, { class: "componentsCommonStyle" }));
    if (!article.isLiked) {
        __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign(__assign({ src: (__VLS_ctx.Heart) }, { class: "action-icon" }), { alt: "like" }));
        // @ts-ignore
        [Love_svg_1.default,];
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign(__assign({ src: (__VLS_ctx.Loved) }, { class: "action-icon" }), { alt: "liked" }));
        // @ts-ignore
        [lamb_love_svg_1.default,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (article.likes || article.likeCount || 0);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "componentsCommonStyle" }));
    var __VLS_25 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_26), false));
    var __VLS_29 = __VLS_28.slots.default;
    var __VLS_30 = {}.Comment;
    /** @type {[typeof __VLS_components.Comment, ]} */ ;
    // @ts-ignore
    icons_vue_1.Comment;
    // @ts-ignore
    var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_31), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (article.commentCount || 0);
};
var __VLS_18, __VLS_28;
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.articleList)); _i < _a.length; _i++) {
    var article = _a[_i][0];
    _loop_1(article);
}
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "fancy-loading" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "dot" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "dot" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "dot" }));
}
if (!__VLS_ctx.hasMore && !__VLS_ctx.loading) {
    // @ts-ignore
    [loading, hasMore,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ style: {} }));
}
/** @type {__VLS_StyleScopedClasses['allContentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['singleArticle']} */ ;
/** @type {__VLS_StyleScopedClasses['userInfoContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['authorImage']} */ ;
/** @type {__VLS_StyleScopedClasses['postTimeAndAuthorName']} */ ;
/** @type {__VLS_StyleScopedClasses['authorName']} */ ;
/** @type {__VLS_StyleScopedClasses['postTime']} */ ;
/** @type {__VLS_StyleScopedClasses['articleTitleContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['summaryContailer']} */ ;
/** @type {__VLS_StyleScopedClasses['coverImageDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['singleCoverContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['previewCoversInHome']} */ ;
/** @type {__VLS_StyleScopedClasses['more-images-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['otherComponents']} */ ;
/** @type {__VLS_StyleScopedClasses['componentsCommonStyle']} */ ;
/** @type {__VLS_StyleScopedClasses['likedAndCommentComponent']} */ ;
/** @type {__VLS_StyleScopedClasses['componentsCommonStyle']} */ ;
/** @type {__VLS_StyleScopedClasses['action-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['action-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['componentsCommonStyle']} */ ;
/** @type {__VLS_StyleScopedClasses['fancy-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
/** @type {__VLS_StyleScopedClasses['dot']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
