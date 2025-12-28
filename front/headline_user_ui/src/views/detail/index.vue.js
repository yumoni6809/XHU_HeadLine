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
var icons_vue_1 = require("@element-plus/icons-vue");
var vue_router_1 = require("vue-router");
var vue_1 = require("vue");
var ScrollIsland_vue_1 = require("@/components/ScrollIsland.vue");
var pinia_1 = require("pinia");
var stores_1 = require("../../stores");
var stores_2 = require("../../stores");
var main_js_1 = require("@/utils/axios/main.js");
var element_plus_1 = require("element-plus");
var auth_js_1 = require("@/utils/axios/auth.js");
var markdown_it_1 = require("markdown-it");
var Love_svg_1 = require("@/asset/img/Love.svg");
var lamb_love_svg_1 = require("@/asset/img/lamb-love.svg");
defineOptions({
    name: 'ArticleDetailPage',
});
var route = (0, vue_router_1.useRoute)();
var router = (0, vue_router_1.useRouter)();
// 从路由上获取文章 id
var articleId = Number(route.query.articleId || route.query.id || 0);
// 动画方向
var animationTransitionStore = (0, stores_2.useAnimationTransitionStore)();
var setTransitionDirection = animationTransitionStore.setTransitionDirection;
// 文章详情相关状态
var articleUserAvatarUrl = (0, vue_1.ref)('');
var avatarUrl = (0, vue_1.ref)(''); // 当前登录用户头像
var articleUserName = (0, vue_1.ref)('');
var publishTime = (0, vue_1.ref)('');
var titleNameSelf = (0, vue_1.ref)('');
var commentCount = (0, vue_1.ref)(0);
var viewCount = (0, vue_1.ref)(0);
var categoryName = (0, vue_1.ref)('');
var updateTime = (0, vue_1.ref)('');
var likeCounts = (0, vue_1.ref)(0);
var isLiked = (0, vue_1.ref)(false); // 整篇文章是否被当前用户点赞
var parentId = (0, vue_1.ref)(0);
var targetId = (0, vue_1.ref)(0);
var userSelfId = (0, vue_1.ref)(0);
// 浏览量展示友好格式
var viewCountContent = (0, vue_1.computed)(function () {
    if (viewCount.value >= 10000) {
        return (viewCount.value / 10000).toFixed(2).toString() + '万';
    }
    return viewCount.value.toString();
});
// 文章封面图 & 内容
var coverImagesSelf = (0, vue_1.ref)([]);
var content = (0, vue_1.ref)(''); // 原始 Markdown
var contentHtml = (0, vue_1.ref)(''); // 渲染后的 HTML
// 评论输入框内容
var commentContent = (0, vue_1.ref)('');
// markdown-it 实例
var md = new markdown_it_1.default({
    html: true,
    linkify: true,
    typographer: true,
});
// 评论列表
var articleCommentList = (0, vue_1.ref)([]);
// Pinia store（分页）
var ArticleDetailStore = (0, stores_1.useArticleDetailStore)();
var CommentDetailStore = (0, stores_1.useCommentDetailStore)();
var _a = (0, pinia_1.storeToRefs)(CommentDetailStore), page = _a.page, pageSize = _a.pageSize, totalCount = _a.totalCount;
var setPage = CommentDetailStore.setPage, setPageSize = CommentDetailStore.setPageSize, setTotalCount = CommentDetailStore.setTotalCount;
// 返回首页
var returnToHome = function () {
    setTransitionDirection('backward');
    router.push('/layout/home');
};
// ScrollIsland 开关
var scrollIslandEnabled = (0, vue_1.ref)(true);
/**
 * 从后端拉取文章详情
 */
var fetchArticleDetail = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, detail, arr, arr, e_1;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (!articleId)
                    return [2 /*return*/];
                _h.label = 1;
            case 1:
                _h.trys.push([1, 3, , 4]);
                return [4 /*yield*/, main_js_1.default.get("/user/news/".concat(articleId))];
            case 2:
                res = _h.sent();
                detail = res;
                // 标题 & 正文
                titleNameSelf.value = detail.title || '';
                content.value = detail.content || '';
                contentHtml.value = md.render(content.value);
                // 封面图解析
                if (typeof detail.cover_images === 'string') {
                    try {
                        arr = JSON.parse(detail.cover_images);
                        coverImagesSelf.value = Array.isArray(arr) ? arr : [];
                    }
                    catch (_j) {
                        coverImagesSelf.value = [];
                    }
                }
                else if (Array.isArray(detail.cover_images)) {
                    coverImagesSelf.value = detail.cover_images;
                }
                else if (Array.isArray(detail.coverImages)) {
                    coverImagesSelf.value = detail.coverImages;
                }
                else if (typeof detail.coverImages === 'string') {
                    try {
                        arr = JSON.parse(detail.coverImages);
                        coverImagesSelf.value = Array.isArray(arr) ? arr : [];
                    }
                    catch (_k) {
                        coverImagesSelf.value = [];
                    }
                }
                else {
                    coverImagesSelf.value = [];
                }
                // 作者信息
                articleUserName.value = detail.authorName || detail.author_name || '';
                articleUserAvatarUrl.value = detail.avatarUrl || detail.avatar_url || '';
                publishTime.value = detail.create_time || detail.createTime || '';
                updateTime.value = detail.update_time || detail.updateTime || '';
                // 浏览量兼容多种命名
                viewCount.value = (_c = (_b = (_a = detail.view_count) !== null && _a !== void 0 ? _a : detail.viewCount) !== null && _b !== void 0 ? _b : detail.ViewCount) !== null && _c !== void 0 ? _c : 0;
                // 文章总点赞数 & 是否已点赞（如果后端有的话）
                likeCounts.value = (_e = (_d = detail.like_count) !== null && _d !== void 0 ? _d : detail.likeCount) !== null && _e !== void 0 ? _e : 0;
                if (typeof detail.liked === 'boolean') {
                    isLiked.value = detail.liked;
                }
                // 评论总数
                commentCount.value = (_g = (_f = detail.comment_count) !== null && _f !== void 0 ? _f : detail.commentCount) !== null && _g !== void 0 ? _g : 0;
                return [3 /*break*/, 4];
            case 3:
                e_1 = _h.sent();
                element_plus_1.ElMessage.error('获取文章详情失败');
                console.error(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * 增加浏览量
 */
var addViewCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, v, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!articleId)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, main_js_1.default.post("/user/news/".concat(articleId, "/view"))];
            case 2:
                res = _b.sent();
                data = res;
                v = (_a = data.ViewCount) !== null && _a !== void 0 ? _a : data.viewCount;
                if (typeof v === 'number') {
                    viewCount.value = v;
                }
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                console.error('增加浏览量失败', e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * 从后端拉取评论列表（含楼中楼）
 */
var fetchArticleComments = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, payload, rawList, result_1, rootMap_1, idMap_1, findRootId_1, total, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!articleId)
                    return [2 /*return*/];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, main_js_1.default.get("/user/news/".concat(articleId, "/comments"), {
                        params: { page: page.value, size: pageSize.value },
                    })];
            case 2:
                res = _a.sent();
                payload = res;
                rawList = [];
                if (Array.isArray(payload)) {
                    rawList = payload;
                }
                else if (Array.isArray(payload.list)) {
                    rawList = payload.list;
                }
                else if (Array.isArray(payload.data)) {
                    rawList = payload.data;
                }
                else if (payload.data && Array.isArray(payload.data.list)) {
                    rawList = payload.data.list;
                }
                // === 2. 数据清洗：给缺失的字段加上默认值 (关键步骤) ===
                rawList = rawList.map(function (item) {
                    // 昵称兜底
                    var finalNickName = item.nickName || item.nickname || item.userName || item.user_name || "\u7528\u6237".concat(item.userId || item.user_id || '未知');
                    // 头像兜底
                    var finalAvatar = item.avatarUrl || item.avatar_url || item.headImg || item.head_img || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
                    return __assign(__assign({}, item), { nickName: finalNickName, avatarUrl: finalAvatar, id: item.id || item.commentId, userId: item.userId || item.user_id, likeCount: item.likeCount || item.like_count || 0, createTime: item.createTime || item.create_time || '' });
                });
                result_1 = [];
                rootMap_1 = new Map();
                idMap_1 = new Map();
                // 建立 ID 索引
                rawList.forEach(function (c) { return idMap_1.set(c.id, c); });
                findRootId_1 = function (currentId) {
                    var c = idMap_1.get(currentId);
                    if (!c)
                        return null;
                    if (!c.parentId || c.parentId === 0)
                        return c.id;
                    return findRootId_1(c.parentId);
                };
                // 第一遍：收集根评论
                rawList.forEach(function (c) {
                    if (!c.parentId || c.parentId === 0) {
                        var item = { mainCommentBody: c, underCommentBody: [] };
                        result_1.push(item);
                        rootMap_1.set(c.id, item);
                    }
                });
                // 第二遍：收集子评论
                rawList.forEach(function (c) {
                    if (c.parentId && c.parentId !== 0) {
                        // 补全 targetName (如果后端没给)
                        if (!c.targetName && c.targetId) {
                            var target = idMap_1.get(c.targetId);
                            if (target)
                                c.targetName = target.nickName;
                        }
                        var rootId = findRootId_1(c.id);
                        if (rootId && rootMap_1.has(rootId)) {
                            rootMap_1.get(rootId).underCommentBody.push(c);
                        }
                        else {
                            // 孤儿评论处理
                            if (!rootMap_1.has(c.id)) {
                                var item = { mainCommentBody: c, underCommentBody: [] };
                                result_1.push(item);
                                rootMap_1.set(c.id, item);
                            }
                        }
                    }
                });
                articleCommentList.value = result_1;
                total = payload.total || (payload.data && payload.data.total) || rawList.length || 0;
                setTotalCount(total);
                commentCount.value = total;
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                element_plus_1.ElMessage.error('获取评论失败');
                console.error(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 抽屉中显示的那条主评论
var underCommentDrawerDisplay = (0, vue_1.ref)(false);
/**
 * 防止模板访问 null 报错的空对象
 */
var emptyComment = {
    mainCommentBody: {
        id: 0,
        postId: 0,
        userId: 0,
        nickName: '',
        avatarUrl: '',
        content: '',
        parentId: 0,
        targetId: 0,
        targetName: null,
        likeCount: 0,
        createTime: '',
        liked: false,
    },
    underCommentBody: [],
};
var el_drawerDisplayCommentInfoLists = (0, vue_1.ref)(emptyComment);
var openUnderCommentDisplayPart = function (mainCommentIndex) {
    el_drawerDisplayCommentInfoLists.value = articleCommentList.value[mainCommentIndex];
    underCommentDrawerDisplay.value = true;
};
// 新增：用于悬浮窗显示当前回复对象
var replyingTarget = (0, vue_1.computed)(function () {
    if (targetId.value && parentId.value) {
        var allComments = articleCommentList.value.flatMap(function (item) { return __spreadArray([item.mainCommentBody], item.underCommentBody, true); });
        return allComments.find(function (c) { return c.id === targetId.value; });
    }
    return null;
});
// 新增：取消回复
function cancelReply() {
    parentId.value = 0;
    targetId.value = 0;
}
// 分页
var handleCommentSizeChange = function (newPageSize) {
    setPageSize(newPageSize);
    fetchArticleComments();
};
var handleCommentCurrentPageChange = function (newPage) {
    setPage(newPage);
    fetchArticleComments();
};
/**
 * 回复评论
 */
var handleReply = function (comment) {
    if (!comment.parentId) {
        parentId.value = comment.id;
        targetId.value = 0;
    }
    else {
        parentId.value = comment.parentId;
        targetId.value = comment.id;
    }
    element_plus_1.ElMessage.success("\u6B63\u5728\u56DE\u590D\uFF1A".concat(comment.nickName));
};
/**
 * 发送评论
 */
var sendComment = function (articleId_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([articleId_1], args_1, true), void 0, function (articleId, pId, tId) {
        var ok, raw, info, res, code, data, nextRes, nextCode, nextMsg, err_1;
        var _a, _b, _c, _d;
        if (pId === void 0) { pId = 0; }
        if (tId === void 0) { tId = 0; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, auth_js_1.ensureLogin)()];
                case 1:
                    ok = _e.sent();
                    if (!ok)
                        return [2 /*return*/];
                    if (!userSelfId.value) {
                        try {
                            raw = localStorage.getItem('login_user');
                            if (raw) {
                                info = JSON.parse(raw);
                                userSelfId.value = Number(info.userId || info.id || 0);
                            }
                        }
                        catch (e) { }
                    }
                    if (!userSelfId.value) {
                        element_plus_1.ElMessage.error('用户信息失效，请退出后重新登录');
                        return [2 /*return*/];
                    }
                    if (!commentContent.value.trim()) {
                        element_plus_1.ElMessage.warning('请输入评论内容');
                        return [2 /*return*/];
                    }
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 9, , 10]);
                    return [4 /*yield*/, main_js_1.default.post('/user/news/post/sensitive', {
                            content: commentContent.value,
                        })];
                case 3:
                    res = _e.sent();
                    code = res.code;
                    data = res.data;
                    if (!(code === 1)) return [3 /*break*/, 7];
                    if (!data) return [3 /*break*/, 4];
                    element_plus_1.ElMessage.warning('当前内容中包含敏感词，请重新检查输入');
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, main_js_1.default.post("/user/news/".concat(articleId, "/comments"), {
                        content: commentContent.value,
                        parentId: pId === 0 ? null : pId,
                        targetId: tId === 0 ? null : tId,
                        userId: userSelfId.value
                    })];
                case 5:
                    nextRes = _e.sent();
                    nextCode = (_b = (_a = nextRes.code) !== null && _a !== void 0 ? _a : nextRes.Code) !== null && _b !== void 0 ? _b : 1;
                    nextMsg = (_d = (_c = nextRes.message) !== null && _c !== void 0 ? _c : nextRes.msg) !== null && _d !== void 0 ? _d : '';
                    if (nextCode === 1 || nextCode === 200) {
                        element_plus_1.ElMessage.success(nextMsg || '评论成功！');
                        commentContent.value = '';
                        fetchArticleComments();
                    }
                    else {
                        element_plus_1.ElMessage.error(nextMsg || '评论失败');
                    }
                    _e.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    element_plus_1.ElMessage.error('发生错误：' + ((data && data.message) || '敏感词检测失败'));
                    _e.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    err_1 = _e.sent();
                    element_plus_1.ElMessage.error('评论发送失败，请稍后重试');
                    console.error(err_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
};
// 文章整体点赞（底部那个心）
var changeIsLiked = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ok, prevLiked, prevCount, res, data, err_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, auth_js_1.ensureLogin)()];
            case 1:
                ok = _c.sent();
                if (!ok)
                    return [2 /*return*/];
                if (!articleId)
                    return [2 /*return*/];
                prevLiked = isLiked.value;
                prevCount = (_a = likeCounts.value) !== null && _a !== void 0 ? _a : 0;
                isLiked.value = !prevLiked;
                likeCounts.value = prevCount + (prevLiked ? -1 : 1);
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, main_js_1.default.post("/user/news/".concat(articleId, "/like"), null, {
                        params: {
                            liked: prevLiked
                        }
                    })];
            case 3:
                res = _c.sent();
                data = res;
                if (data && typeof data.liked === 'boolean') {
                    isLiked.value = data.liked;
                }
                if (data && (typeof data.likeCount === 'number' || typeof data.like_count === 'number')) {
                    likeCounts.value = (_b = data.likeCount) !== null && _b !== void 0 ? _b : data.like_count;
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _c.sent();
                isLiked.value = prevLiked;
                likeCounts.value = prevCount;
                element_plus_1.ElMessage.error('操作失败，请稍后重试');
                console.error(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// 轮播宽度
var sightWidth = (0, vue_1.ref)(0);
var dynamicCoverImagesWidth = (0, vue_1.ref)('');
// 初始化
var initPage = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, addViewCount()];
            case 1:
                _a.sent();
                return [4 /*yield*/, fetchArticleDetail()];
            case 2:
                _a.sent();
                fetchArticleComments();
                return [2 /*return*/];
        }
    });
}); };
(0, vue_1.onMounted)(function () {
    try {
        var raw = localStorage.getItem('login_user');
        if (raw) {
            var info = JSON.parse(raw);
            avatarUrl.value = info.avatarUrl || info.avatar_url || info.headImg || '';
            var rawId = info.userId || info.id || info.uid;
            userSelfId.value = rawId ? Number(rawId) : 0;
        }
    }
    catch (e) {
        console.error('解析本地登录用户信息失败', e);
    }
    sightWidth.value = document.documentElement.clientWidth;
    dynamicCoverImagesWidth.value = sightWidth.value - 30 + 'px';
    document.documentElement.style.setProperty('--dynamicCoverImagesWidth', dynamicCoverImagesWidth.value);
    document.documentElement.style.setProperty('--dynamicCoverImagesHeight', dynamicCoverImagesWidth.value);
    var saved = localStorage.getItem('enable_scroll_island');
    scrollIslandEnabled.value = saved === null ? true : saved === '1';
    initPage();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['like-btn-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-img']} */ ;
/** @type {__VLS_StyleScopedClasses['coverImagesDisplayPart']} */ ;
/** @type {__VLS_StyleScopedClasses['likeComponent']} */ ;
/** @type {__VLS_StyleScopedClasses['LikedIcon']} */ ;
/** @type {__VLS_StyleScopedClasses['likeComponent']} */ ;
/** @type {__VLS_StyleScopedClasses['sendComponents']} */ ;
/** @type {__VLS_StyleScopedClasses['sendComponents']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['allContentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['middlePartDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['commentDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-input']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['like-btn-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-img']} */ ;
/** @type {__VLS_StyleScopedClasses['like-btn-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-img']} */ ;
/** @type {__VLS_StyleScopedClasses['commentPartAvatarImg']} */ ;
/** @type {__VLS_StyleScopedClasses['singleComment']} */ ;
/** @type {__VLS_StyleScopedClasses['articleTitleDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['like-img']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-input']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-input-bar']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "allContentContainer" }));
if (__VLS_ctx.scrollIslandEnabled) {
    // @ts-ignore
    [scrollIslandEnabled,];
    /** @type {[typeof ScrollIsland, ]} */ ;
    // @ts-ignore
    var __VLS_0 = __VLS_asFunctionalComponent(ScrollIsland_vue_1.default, new ScrollIsland_vue_1.default({
        title: "阅读进度",
    }));
    var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{
            title: "阅读进度",
        }], __VLS_functionalComponentArgsRest(__VLS_0), false));
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "leftHeaderContainer" }));
var __VLS_4 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(__assign({ 'onClick': {} })));
var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_5), false));
var __VLS_8;
var __VLS_9;
var __VLS_10 = ({ click: {} },
    { onClick: (__VLS_ctx.returnToHome) });
var __VLS_11 = __VLS_7.slots.default;
// @ts-ignore
[returnToHome,];
var __VLS_12 = {}.ArrowLeft;
/** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
// @ts-ignore
icons_vue_1.ArrowLeft;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_13), false));
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
var __VLS_17 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_18), false));
var __VLS_21 = __VLS_20.slots.default;
var __VLS_22 = {}.MoreFilled;
/** @type {[typeof __VLS_components.MoreFilled, ]} */ ;
// @ts-ignore
icons_vue_1.MoreFilled;
// @ts-ignore
var __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
var __VLS_24 = __VLS_23.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_23), false));
var __VLS_20;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "middlePartDisplay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "articleDisplay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "articleTitleDisplay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.titleNameSelf);
// @ts-ignore
[titleNameSelf,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "articleUserContainer" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ style: {} }, { src: (__VLS_ctx.articleUserAvatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'), alt: "" }));
// @ts-ignore
[articleUserAvatarUrl,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "nameAndPublishTime" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
(__VLS_ctx.articleUserName);
// @ts-ignore
[articleUserName,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
(__VLS_ctx.publishTime);
// @ts-ignore
[publishTime,];
if (__VLS_ctx.coverImagesSelf.length) {
    // @ts-ignore
    [coverImagesSelf,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "coverImagesDisplayPart" }));
    var __VLS_27 = {}.ElCarousel;
    /** @type {[typeof __VLS_components.ElCarousel, typeof __VLS_components.elCarousel, typeof __VLS_components.ElCarousel, typeof __VLS_components.elCarousel, ]} */ ;
    // @ts-ignore
    ElCarousel;
    // @ts-ignore
    var __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27(__assign({ class: "el-carousel" }, { indicatorPosition: "outside", trigger: "hover", height: (__VLS_ctx.dynamicCoverImagesWidth) })));
    var __VLS_29 = __VLS_28.apply(void 0, __spreadArray([__assign({ class: "el-carousel" }, { indicatorPosition: "outside", trigger: "hover", height: (__VLS_ctx.dynamicCoverImagesWidth) })], __VLS_functionalComponentArgsRest(__VLS_28), false));
    var __VLS_31 = __VLS_30.slots.default;
    // @ts-ignore
    [dynamicCoverImagesWidth,];
    for (var _i = 0, _b = __VLS_getVForSourceType((__VLS_ctx.coverImagesSelf)); _i < _b.length; _i++) {
        var _c = _b[_i], item = _c[0], index = _c[1];
        // @ts-ignore
        [coverImagesSelf,];
        var __VLS_32 = {}.ElCarouselItem;
        /** @type {[typeof __VLS_components.ElCarouselItem, typeof __VLS_components.elCarouselItem, typeof __VLS_components.ElCarouselItem, typeof __VLS_components.elCarouselItem, ]} */ ;
        // @ts-ignore
        ElCarouselItem;
        // @ts-ignore
        var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
            key: (item),
        }));
        var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
                key: (item),
            }], __VLS_functionalComponentArgsRest(__VLS_33), false));
        var __VLS_36 = __VLS_35.slots.default;
        var __VLS_37 = {}.ElImage;
        /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
        // @ts-ignore
        ElImage;
        // @ts-ignore
        var __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37(__assign({ class: "previewCoversInHome" }, { src: (item), fit: "cover", previewSrcList: (__VLS_ctx.coverImagesSelf), initialIndex: (index), hideOnClickModal: (true) })));
        var __VLS_39 = __VLS_38.apply(void 0, __spreadArray([__assign({ class: "previewCoversInHome" }, { src: (item), fit: "cover", previewSrcList: (__VLS_ctx.coverImagesSelf), initialIndex: (index), hideOnClickModal: (true) })], __VLS_functionalComponentArgsRest(__VLS_38), false));
        // @ts-ignore
        [coverImagesSelf,];
        var __VLS_35;
    }
    var __VLS_30;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div)(__assign({ class: "articleContentDisplay" }));
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.contentHtml) }), null, null);
// @ts-ignore
[contentHtml,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "viewAndUpdateTime" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "viewCountDisplay" }));
var __VLS_42 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    color: "rgba(0, 0, 0, 0.3)",
}));
var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([{
        color: "rgba(0, 0, 0, 0.3)",
    }], __VLS_functionalComponentArgsRest(__VLS_43), false));
var __VLS_46 = __VLS_45.slots.default;
var __VLS_47 = {}.View;
/** @type {[typeof __VLS_components.View, ]} */ ;
// @ts-ignore
icons_vue_1.View;
// @ts-ignore
var __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({}));
var __VLS_49 = __VLS_48.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_48), false));
var __VLS_45;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.viewCountContent);
// @ts-ignore
[viewCountContent,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "updateTimeDisplay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.updateTime);
// @ts-ignore
[updateTime,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentDisplay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentTitle" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
(__VLS_ctx.commentCount);
// @ts-ignore
[commentCount,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "allCommentContainer" }));
var _loop_1 = function (article, mainCommentIndex) {
    // @ts-ignore
    [articleCommentList,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "singleComment" }, { key: (article.mainCommentBody.id) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "mainInfo" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ class: "commentPartAvatarImg" }, { src: (article.mainCommentBody.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'), alt: "" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "nameAndTimeAndContent" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentUserInfo" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (article.mainCommentBody.nickName);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
    (article.mainCommentBody.createTime);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentContent" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (article.mainCommentBody.content);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "replyAndLiked" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.handleReply(article.mainCommentBody);
            // @ts-ignore
            [handleReply,];
        } }, { class: "replyAndNumberDisplay" }));
    var __VLS_52 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        size: "20px",
    }));
    var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
            size: "20px",
        }], __VLS_functionalComponentArgsRest(__VLS_53), false));
    var __VLS_56 = __VLS_55.slots.default;
    var __VLS_57 = {}.ChatLineSquare;
    /** @type {[typeof __VLS_components.ChatLineSquare, ]} */ ;
    // @ts-ignore
    icons_vue_1.ChatLineSquare;
    // @ts-ignore
    var __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
    var __VLS_59 = __VLS_58.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_58), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    if (article.underCommentBody.length) {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "underCommentDisplayPreviewOne" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "firstReply" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
        (article.underCommentBody[0].nickName);
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
        (article.underCommentBody[0].content);
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(article.underCommentBody.length))
                    return;
                __VLS_ctx.openUnderCommentDisplayPart(mainCommentIndex);
                // @ts-ignore
                [openUnderCommentDisplayPart,];
            } }, { class: "replyCountAndIconDisplay" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (article.underCommentBody.length);
        var __VLS_62 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        ElIcon;
        // @ts-ignore
        var __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({}));
        var __VLS_64 = __VLS_63.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_63), false));
        var __VLS_66 = __VLS_65.slots.default;
        var __VLS_67 = {}.ArrowRight;
        /** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
        // @ts-ignore
        icons_vue_1.ArrowRight;
        // @ts-ignore
        var __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({}));
        var __VLS_69 = __VLS_68.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_68), false));
    }
};
var __VLS_55, __VLS_65;
for (var _d = 0, _e = __VLS_getVForSourceType((__VLS_ctx.articleCommentList)); _d < _e.length; _d++) {
    var _f = _e[_d], article = _f[0], mainCommentIndex = _f[1];
    _loop_1(article, mainCommentIndex);
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "drawerToDisplay" }));
var __VLS_72 = {}.ElDrawer;
/** @type {[typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, typeof __VLS_components.ElDrawer, typeof __VLS_components.elDrawer, ]} */ ;
// @ts-ignore
ElDrawer;
// @ts-ignore
var __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    modelValue: (__VLS_ctx.underCommentDrawerDisplay),
    withHeader: (false),
    modal: (false),
    direction: "btt",
    size: "90%",
}));
var __VLS_74 = __VLS_73.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.underCommentDrawerDisplay),
        withHeader: (false),
        modal: (false),
        direction: "btt",
        size: "90%",
    }], __VLS_functionalComponentArgsRest(__VLS_73), false));
var __VLS_76 = __VLS_75.slots.default;
// @ts-ignore
[underCommentDrawerDisplay,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "underCommentTitle" }));
var __VLS_77 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77(__assign({ 'onClick': {} })));
var __VLS_79 = __VLS_78.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_78), false));
var __VLS_81;
var __VLS_82;
var __VLS_83 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.underCommentDrawerDisplay = false;
            // @ts-ignore
            [underCommentDrawerDisplay,];
        } });
var __VLS_84 = __VLS_80.slots.default;
var __VLS_85 = {}.ArrowLeft;
/** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
// @ts-ignore
icons_vue_1.ArrowLeft;
// @ts-ignore
var __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({}));
var __VLS_87 = __VLS_86.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_86), false));
var __VLS_80;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "innerCommentContainer" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "mainCommentDisplay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ class: "commentPartAvatarImg" }, { src: (__VLS_ctx.el_drawerDisplayCommentInfoLists.mainCommentBody.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'), alt: "" }));
// @ts-ignore
[el_drawerDisplayCommentInfoLists,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "nameAndTimeAndContent" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentUserInfo" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.el_drawerDisplayCommentInfoLists.mainCommentBody.nickName);
// @ts-ignore
[el_drawerDisplayCommentInfoLists,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
(__VLS_ctx.el_drawerDisplayCommentInfoLists.mainCommentBody.createTime);
// @ts-ignore
[el_drawerDisplayCommentInfoLists,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentContent" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.el_drawerDisplayCommentInfoLists.mainCommentBody.content);
// @ts-ignore
[el_drawerDisplayCommentInfoLists,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "replyAndLiked" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.handleReply(__VLS_ctx.el_drawerDisplayCommentInfoLists.mainCommentBody);
        // @ts-ignore
        [handleReply, el_drawerDisplayCommentInfoLists,];
    } }, { class: "replyAndNumberDisplay" }));
var __VLS_90 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    size: "20px",
}));
var __VLS_92 = __VLS_91.apply(void 0, __spreadArray([{
        size: "20px",
    }], __VLS_functionalComponentArgsRest(__VLS_91), false));
var __VLS_94 = __VLS_93.slots.default;
var __VLS_95 = {}.ChatLineSquare;
/** @type {[typeof __VLS_components.ChatLineSquare, ]} */ ;
// @ts-ignore
icons_vue_1.ChatLineSquare;
// @ts-ignore
var __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({}));
var __VLS_97 = __VLS_96.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_96), false));
var __VLS_93;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "underCommentTitleAndReplyCount" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.el_drawerDisplayCommentInfoLists.underCommentBody.length);
// @ts-ignore
[el_drawerDisplayCommentInfoLists,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "underCommentContainer" }));
var _loop_2 = function (underComment, underCommentIndex) {
    // @ts-ignore
    [el_drawerDisplayCommentInfoLists,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "singleUnderCommentReply" }, { key: (underComment.id) }));
    __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ class: "commentPartAvatarImg" }, { src: (underComment.avatarUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'), alt: "" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "nameAndTimeAndContent" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "commentUserInfo" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (underComment.nickName);
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
    (underComment.createTime);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "replyCommentContentContainer" }));
    if (underComment.targetName) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
    if (underComment.targetName) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ style: {} }));
        (underComment.targetName);
    }
    if (underComment.targetName) {
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (underComment.content);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "replyAndLiked" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.handleReply(underComment);
            // @ts-ignore
            [handleReply,];
        } }, { class: "replyAndNumberDisplay" }));
    var __VLS_100 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
        size: "20px",
    }));
    var __VLS_102 = __VLS_101.apply(void 0, __spreadArray([{
            size: "20px",
        }], __VLS_functionalComponentArgsRest(__VLS_101), false));
    var __VLS_104 = __VLS_103.slots.default;
    var __VLS_105 = {}.ChatLineSquare;
    /** @type {[typeof __VLS_components.ChatLineSquare, ]} */ ;
    // @ts-ignore
    icons_vue_1.ChatLineSquare;
    // @ts-ignore
    var __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({}));
    var __VLS_107 = __VLS_106.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_106), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
};
var __VLS_103;
for (var _g = 0, _h = __VLS_getVForSourceType((__VLS_ctx.el_drawerDisplayCommentInfoLists.underCommentBody)); _g < _h.length; _g++) {
    var _j = _h[_g], underComment = _j[0], underCommentIndex = _j[1];
    _loop_2(underComment, underCommentIndex);
}
var __VLS_75;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "pageManagement" }));
var __VLS_110 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
ElPagination;
// @ts-ignore
var __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110(__assign(__assign({ 'onSizeChange': {} }, { 'onCurrentChange': {} }), { currentPage: (__VLS_ctx.page), pageSize: (__VLS_ctx.pageSize), pageSizes: ([5, 10, 20, 50]), size: "default", background: true, layout: "sizes, prev, pager, next, jumper", total: (__VLS_ctx.totalCount), pagerCount: (5), defaultCurrentPage: (1) })));
var __VLS_112 = __VLS_111.apply(void 0, __spreadArray([__assign(__assign({ 'onSizeChange': {} }, { 'onCurrentChange': {} }), { currentPage: (__VLS_ctx.page), pageSize: (__VLS_ctx.pageSize), pageSizes: ([5, 10, 20, 50]), size: "default", background: true, layout: "sizes, prev, pager, next, jumper", total: (__VLS_ctx.totalCount), pagerCount: (5), defaultCurrentPage: (1) })], __VLS_functionalComponentArgsRest(__VLS_111), false));
var __VLS_114;
var __VLS_115;
var __VLS_116 = ({ sizeChange: {} },
    { onSizeChange: (__VLS_ctx.handleCommentSizeChange) });
var __VLS_117 = ({ currentChange: {} },
    { onCurrentChange: (__VLS_ctx.handleCommentCurrentPageChange) });
// @ts-ignore
[page, pageSize, totalCount, handleCommentSizeChange, handleCommentCurrentPageChange,];
var __VLS_113;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "comment-input-bar" }));
var __VLS_119 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119(__assign(__assign(__assign({ 'onKeydown': {} }, { modelValue: (__VLS_ctx.commentContent) }), { class: "comment-input" }), { placeholder: (__VLS_ctx.replyingTarget ? "\u56DE\u590D @".concat(__VLS_ctx.replyingTarget.nickName) : '本公主来喵两句'), clearable: true })));
var __VLS_121 = __VLS_120.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onKeydown': {} }, { modelValue: (__VLS_ctx.commentContent) }), { class: "comment-input" }), { placeholder: (__VLS_ctx.replyingTarget ? "\u56DE\u590D @".concat(__VLS_ctx.replyingTarget.nickName) : '本公主来喵两句'), clearable: true })], __VLS_functionalComponentArgsRest(__VLS_120), false));
var __VLS_123;
var __VLS_124;
var __VLS_125 = ({ keydown: {} },
    { onKeydown: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.sendComment(__VLS_ctx.articleId, __VLS_ctx.parentId, __VLS_ctx.targetId);
            // @ts-ignore
            [commentContent, replyingTarget, replyingTarget, sendComment, articleId, parentId, targetId,];
        } });
var __VLS_122;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "comment-actions" }));
var __VLS_127 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127(__assign(__assign({ 'onClick': {} }, { class: "send-btn" }), { size: (36) })));
var __VLS_129 = __VLS_128.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { class: "send-btn" }), { size: (36) })], __VLS_functionalComponentArgsRest(__VLS_128), false));
var __VLS_131;
var __VLS_132;
var __VLS_133 = ({ click: {} },
    { onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.sendComment(__VLS_ctx.articleId, __VLS_ctx.parentId, __VLS_ctx.targetId);
            // @ts-ignore
            [sendComment, articleId, parentId, targetId,];
        } });
var __VLS_134 = __VLS_130.slots.default;
var __VLS_135 = {}.Promotion;
/** @type {[typeof __VLS_components.Promotion, ]} */ ;
// @ts-ignore
icons_vue_1.Promotion;
// @ts-ignore
var __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({}));
var __VLS_137 = __VLS_136.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_136), false));
var __VLS_130;
var __VLS_140 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140(__assign(__assign({ 'onClick': {} }, { class: "like-btn-button" }), { type: "text", circle: true, size: "medium", 'aria-label': "like" })));
var __VLS_142 = __VLS_141.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { class: "like-btn-button" }), { type: "text", circle: true, size: "medium", 'aria-label': "like" })], __VLS_functionalComponentArgsRest(__VLS_141), false));
var __VLS_144;
var __VLS_145;
var __VLS_146 = ({ click: {} },
    { onClick: (__VLS_ctx.changeIsLiked) });
var __VLS_147 = __VLS_143.slots.default;
// @ts-ignore
[changeIsLiked,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ src: (__VLS_ctx.isLiked ? __VLS_ctx.Loved : __VLS_ctx.Heart), alt: "like" }, { class: "like-img" }));
// @ts-ignore
[isLiked, lamb_love_svg_1.default, Love_svg_1.default,];
var __VLS_143;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "like-num" }));
(__VLS_ctx.likeCounts);
// @ts-ignore
[likeCounts,];
var __VLS_148 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
var __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({
    name: "fade",
}));
var __VLS_150 = __VLS_149.apply(void 0, __spreadArray([{
        name: "fade",
    }], __VLS_functionalComponentArgsRest(__VLS_149), false));
var __VLS_152 = __VLS_151.slots.default;
if (__VLS_ctx.replyingTarget) {
    // @ts-ignore
    [replyingTarget,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "reply-float" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "reply-nick" }));
    (__VLS_ctx.replyingTarget.nickName);
    // @ts-ignore
    [replyingTarget,];
    var __VLS_153 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153(__assign({ 'onClick': {} }, { class: "reply-cancel" })));
    var __VLS_155 = __VLS_154.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { class: "reply-cancel" })], __VLS_functionalComponentArgsRest(__VLS_154), false));
    var __VLS_157 = void 0;
    var __VLS_158 = void 0;
    var __VLS_159 = ({ click: {} },
        { onClick: (__VLS_ctx.cancelReply) });
    var __VLS_160 = __VLS_156.slots.default;
    // @ts-ignore
    [cancelReply,];
    var __VLS_161 = {}.Close;
    /** @type {[typeof __VLS_components.Close, ]} */ ;
    // @ts-ignore
    icons_vue_1.Close;
    // @ts-ignore
    var __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({}));
    var __VLS_163 = __VLS_162.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_162), false));
    var __VLS_156;
}
var __VLS_151;
/** @type {__VLS_StyleScopedClasses['allContentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['leftHeaderContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['middlePartDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['articleDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['articleTitleDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['articleUserContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['nameAndPublishTime']} */ ;
/** @type {__VLS_StyleScopedClasses['coverImagesDisplayPart']} */ ;
/** @type {__VLS_StyleScopedClasses['el-carousel']} */ ;
/** @type {__VLS_StyleScopedClasses['previewCoversInHome']} */ ;
/** @type {__VLS_StyleScopedClasses['articleContentDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['viewAndUpdateTime']} */ ;
/** @type {__VLS_StyleScopedClasses['viewCountDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['updateTimeDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['commentDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['commentTitle']} */ ;
/** @type {__VLS_StyleScopedClasses['allCommentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['singleComment']} */ ;
/** @type {__VLS_StyleScopedClasses['mainInfo']} */ ;
/** @type {__VLS_StyleScopedClasses['commentPartAvatarImg']} */ ;
/** @type {__VLS_StyleScopedClasses['nameAndTimeAndContent']} */ ;
/** @type {__VLS_StyleScopedClasses['commentUserInfo']} */ ;
/** @type {__VLS_StyleScopedClasses['commentContent']} */ ;
/** @type {__VLS_StyleScopedClasses['replyAndLiked']} */ ;
/** @type {__VLS_StyleScopedClasses['replyAndNumberDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['underCommentDisplayPreviewOne']} */ ;
/** @type {__VLS_StyleScopedClasses['firstReply']} */ ;
/** @type {__VLS_StyleScopedClasses['replyCountAndIconDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['drawerToDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['underCommentTitle']} */ ;
/** @type {__VLS_StyleScopedClasses['innerCommentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['mainCommentDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['commentPartAvatarImg']} */ ;
/** @type {__VLS_StyleScopedClasses['nameAndTimeAndContent']} */ ;
/** @type {__VLS_StyleScopedClasses['commentUserInfo']} */ ;
/** @type {__VLS_StyleScopedClasses['commentContent']} */ ;
/** @type {__VLS_StyleScopedClasses['replyAndLiked']} */ ;
/** @type {__VLS_StyleScopedClasses['replyAndNumberDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['underCommentTitleAndReplyCount']} */ ;
/** @type {__VLS_StyleScopedClasses['underCommentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['singleUnderCommentReply']} */ ;
/** @type {__VLS_StyleScopedClasses['commentPartAvatarImg']} */ ;
/** @type {__VLS_StyleScopedClasses['nameAndTimeAndContent']} */ ;
/** @type {__VLS_StyleScopedClasses['commentUserInfo']} */ ;
/** @type {__VLS_StyleScopedClasses['replyCommentContentContainer']} */ ;
/** @type {__VLS_StyleScopedClasses['replyAndLiked']} */ ;
/** @type {__VLS_StyleScopedClasses['replyAndNumberDisplay']} */ ;
/** @type {__VLS_StyleScopedClasses['pageManagement']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-input-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-input']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['like-btn-button']} */ ;
/** @type {__VLS_StyleScopedClasses['like-img']} */ ;
/** @type {__VLS_StyleScopedClasses['like-num']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-float']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-nick']} */ ;
/** @type {__VLS_StyleScopedClasses['reply-cancel']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
