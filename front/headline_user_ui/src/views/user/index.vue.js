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
var FileUpload_vue_1 = require("@/components/FileUpload.vue");
var FileUploadGrid_vue_1 = require("@/components/FileUploadGrid.vue");
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var element_plus_1 = require("element-plus");
var icons_vue_1 = require("@element-plus/icons-vue");
var main_js_1 = require("@/utils/axios/main.js");
var router = (0, vue_router_1.useRouter)();
var globalBgUrl = (0, vue_1.ref)('');
var showAvatarDialog = (0, vue_1.ref)(false);
var activeTab = (0, vue_1.ref)('my-posts');
var userInfo = (0, vue_1.ref)({
    id: '',
    nickname: '未登录用户',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
});
var signature = (0, vue_1.ref)('这个人很懒，什么都没有写');
var myPosts = (0, vue_1.ref)([]);
var myComments = (0, vue_1.ref)([]);
var loading = (0, vue_1.ref)(false);
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var storedGlobalBg, userRaw, u, e_1, storedSig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storedGlobalBg = localStorage.getItem('backgroundImage');
                if (storedGlobalBg) {
                    globalBgUrl.value = storedGlobalBg;
                }
                userRaw = localStorage.getItem('login_user');
                if (!userRaw) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                u = JSON.parse(userRaw);
                userInfo.value.id = u.userId || u.id;
                userInfo.value.avatar = u.avatarUrl || u.avatar || userInfo.value.avatar;
                userInfo.value.nickname = u.nickname || u.username || userInfo.value.nickname;
                return [4 /*yield*/, fetchUserInfo(userInfo.value.id)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 4];
            case 4:
                storedSig = localStorage.getItem('signature');
                if (storedSig) {
                    signature.value = storedSig;
                }
                if (!userInfo.value.id) return [3 /*break*/, 6];
                return [4 /*yield*/, fetchMyContent()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
var fetchUserInfo = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, main_js_1.default.get('/user/info', { params: { id: id } })];
            case 1:
                res = _a.sent();
                data = res.data || res;
                if (data.code !== 0) {
                    userInfo.value.nickname = data.nickname || data.username || userInfo.value.nickname;
                    userInfo.value.avatar = data.avatar || userInfo.value.avatar;
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.error('获取用户信息失败', e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// 头像上传
var handleAvatarChange = function (files) { return __awaiter(void 0, void 0, void 0, function () {
    var file, formData, res, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!files.length)
                    return [2 /*return*/];
                file = files[0];
                formData = new FormData();
                formData.append('image', file);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, main_js_1.default.post('/user/upload', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })];
            case 2:
                res = _a.sent();
                data = res.data || res;
                if (!(data.code === 1 && data.imageUrl)) return [3 /*break*/, 4];
                // 上传成功后，更新用户表头像
                return [4 /*yield*/, main_js_1.default.put('/user/info', {
                        id: userInfo.value.id,
                        avatar: data.imageUrl
                    })];
            case 3:
                // 上传成功后，更新用户表头像
                _a.sent();
                userInfo.value.avatar = data.imageUrl;
                element_plus_1.ElMessage.success('头像已更新');
                showAvatarDialog.value = false;
                return [3 /*break*/, 5];
            case 4:
                element_plus_1.ElMessage.error(data.message || '上传失败');
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                element_plus_1.ElMessage.error(err_1.message || '上传失败');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var fetchMyContent = function () { return __awaiter(void 0, void 0, void 0, function () {
    var resPosts, list, formData, resComments, commentData, e_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loading.value = true;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, 5, 6]);
                return [4 /*yield*/, main_js_1.default.get('/user/news', { params: { page: 1, size: 50 } })];
            case 2:
                resPosts = _b.sent();
                list = ((_a = resPosts.data) === null || _a === void 0 ? void 0 : _a.list) || resPosts.data || [];
                if (Array.isArray(list)) {
                    myPosts.value = list.filter(function (item) {
                        var authorId = item.authorId || item.userId || item.uid;
                        return String(authorId) === String(userInfo.value.id);
                    }).map(function (item) { return (__assign(__assign({}, item), { createTime: item.createTime || item.createdAt })); });
                }
                formData = new URLSearchParams();
                formData.append('userId', userInfo.value.id);
                return [4 /*yield*/, main_js_1.default.post('/user/comment/list', formData)];
            case 3:
                resComments = _b.sent();
                commentData = resComments.data || resComments;
                if (Array.isArray(commentData)) {
                    myComments.value = commentData.map(function (item) { return (__assign(__assign({}, item), { postTitle: "\u5E16\u5B50ID:".concat(item.postId), postId: item.postId, content: item.content, createTime: item.createTime })); });
                }
                else if (commentData.code === 1 && Array.isArray(commentData.data)) {
                    myComments.value = commentData.data.map(function (item) { return (__assign(__assign({}, item), { postTitle: "\u5E16\u5B50ID:".concat(item.postId), postId: item.postId, content: item.content, createTime: item.createTime })); });
                }
                else {
                    myComments.value = [];
                    console.warn('获取评论失败:', commentData.message);
                }
                return [3 /*break*/, 6];
            case 4:
                e_3 = _b.sent();
                myComments.value = [];
                console.error('获取内容异常', e_3);
                return [3 /*break*/, 6];
            case 5:
                loading.value = false;
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var openAvatarUpload = function () {
    showAvatarDialog.value = true;
};
var handleUploadClose = function () {
    showAvatarDialog.value = false;
    if (userInfo.value.id)
        fetchUserInfo(userInfo.value.id);
};
var editSignature = function () {
    element_plus_1.ElMessageBox.prompt('请输入新的个性签名', '修改签名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: signature.value,
        inputPattern: /^.{0,50}$/,
        inputErrorMessage: '签名长度不能超过50个字符'
    }).then(function (_a) {
        var value = _a.value;
        signature.value = value;
        localStorage.setItem('signature', value);
        element_plus_1.ElMessage.success('签名已更新');
    }).catch(function () { });
};
var handleEditPost = function (post) {
    router.push({ path: '/layout/addNewArticle', query: { id: post.id } });
    element_plus_1.ElMessageBox.confirm('确定要修改这条帖子吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main_js_1.default.post('/admin/port/delete', { id: post.id })];
                case 1:
                    data = (_a.sent()).data;
                    if (!(data.code === 1)) return [3 /*break*/, 3];
                    element_plus_1.ElMessage.success('删除成功');
                    return [4 /*yield*/, fetchMyContent()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    element_plus_1.ElMessage.error(data.message || '删除失败');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); })
        .catch(function () { });
};
var handleDeletePost = function (post) {
    element_plus_1.ElMessageBox.confirm('确定要删除这条帖子吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, main_js_1.default.post('/admin/port/delete', { id: post.id })];
                case 1:
                    data = (_a.sent()).data;
                    if (!(data.code === 1)) return [3 /*break*/, 3];
                    element_plus_1.ElMessage.success('删除成功');
                    return [4 /*yield*/, fetchMyContent()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    element_plus_1.ElMessage.error(data.message || '删除失败');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); })
        .catch(function () { });
};
var handleDeleteComment = function (comment) {
    element_plus_1.ElMessageBox.confirm('确定要删除这条评论吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data, idx, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, main_js_1.default.delete("/user/news/comment/".concat(comment.id))];
                case 1:
                    res = _a.sent();
                    data = res.data || res;
                    if (data.code === 1 || data.code === 200) {
                        element_plus_1.ElMessage.success('评论删除成功');
                        idx = myComments.value.findIndex(function (c) { return c.id === comment.id; });
                        if (idx > -1)
                            myComments.value.splice(idx, 1);
                    }
                    else {
                        element_plus_1.ElMessage.error(data.message || '删除失败');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    element_plus_1.ElMessage.error('删除异常');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }).catch(function () { });
};
var goDetail = function (id) {
    if (id)
        router.push({ path: '/article', query: { id: id } });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['signature']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-item']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-item']} */ ;
/** @type {__VLS_StyleScopedClasses['post-item']} */ ;
/** @type {__VLS_StyleScopedClasses['post-title']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-link']} */ ;
/** @type {__VLS_StyleScopedClasses['base-info']} */ ;
/** @type {__VLS_StyleScopedClasses['post-actions']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "profile-page" }, { style: (__VLS_ctx.globalBgUrl ? { backgroundImage: "url(".concat(__VLS_ctx.globalBgUrl, ")") } : {}) }));
// @ts-ignore
[globalBgUrl, globalBgUrl,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "profile-header" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "base-info" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.openAvatarUpload) }, { class: "avatar-container" }));
// @ts-ignore
[openAvatarUpload,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ src: (__VLS_ctx.userInfo.avatar), alt: "用户头像" }, { class: "avatar" }));
// @ts-ignore
[userInfo,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "avatar-mask" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-info" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "nickname" }));
(__VLS_ctx.userInfo.nickname);
// @ts-ignore
[userInfo,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: (__VLS_ctx.editSignature) }, { class: "signature" }), { title: "点击修改" }));
// @ts-ignore
[editSignature,];
(__VLS_ctx.signature || '编辑个性签名');
// @ts-ignore
[signature,];
var __VLS_0 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ class: "edit-icon" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "edit-icon" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
var __VLS_5 = {}.Edit;
/** @type {[typeof __VLS_components.Edit, ]} */ ;
// @ts-ignore
icons_vue_1.Edit;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({}));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "main-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "tab-nav" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'my-posts';
        // @ts-ignore
        [activeTab,];
    } }, { class: "tab-item" }), { class: ({ active: __VLS_ctx.activeTab === 'my-posts' }) }));
// @ts-ignore
[activeTab,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.activeTab = 'my-comments';
        // @ts-ignore
        [activeTab,];
    } }, { class: "tab-item" }), { class: ({ active: __VLS_ctx.activeTab === 'my-comments' }) }));
// @ts-ignore
[activeTab,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "content-wrap" }));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.loading) }), null, null);
// @ts-ignore
[vLoading, loading,];
if (__VLS_ctx.activeTab === 'my-posts') {
    // @ts-ignore
    [activeTab,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "content-module" }));
    if (__VLS_ctx.myPosts.length === 0) {
        // @ts-ignore
        [myPosts,];
        var __VLS_10 = {}.ElEmpty;
        /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
        // @ts-ignore
        ElEmpty;
        // @ts-ignore
        var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            description: "暂无帖子",
        }));
        var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
                description: "暂无帖子",
            }], __VLS_functionalComponentArgsRest(__VLS_11), false));
    }
    else {
        var _loop_1 = function (post) {
            // @ts-ignore
            [myPosts,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "post-item" }, { key: (post.id) }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.activeTab === 'my-posts'))
                        return;
                    if (!!(__VLS_ctx.myPosts.length === 0))
                        return;
                    __VLS_ctx.goDetail(post.id || post.hid);
                    // @ts-ignore
                    [goDetail,];
                } }, { class: "post-title" }));
            (post.title);
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.activeTab === 'my-posts'))
                        return;
                    if (!!(__VLS_ctx.myPosts.length === 0))
                        return;
                    __VLS_ctx.goDetail(post.id || post.hid);
                    // @ts-ignore
                    [goDetail,];
                } }, { class: "post-content" }));
            (post.content ? post.content.replace(/<[^>]+>/g, '').substring(0, 100) + (post.content.length > 100 ? '...' : '') : '暂无摘要');
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "post-meta" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (post.createTime);
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (post.viewCount || 0);
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (post.likeCount || 0);
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "post-actions" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.activeTab === 'my-posts'))
                        return;
                    if (!!(__VLS_ctx.myPosts.length === 0))
                        return;
                    __VLS_ctx.handleEditPost(post);
                    // @ts-ignore
                    [handleEditPost,];
                } }, { class: "action-btn edit-btn" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.activeTab === 'my-posts'))
                        return;
                    if (!!(__VLS_ctx.myPosts.length === 0))
                        return;
                    __VLS_ctx.handleDeletePost(post);
                    // @ts-ignore
                    [handleDeletePost,];
                } }, { class: "action-btn delete-btn" }));
        };
        for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.myPosts)); _i < _a.length; _i++) {
            var post = _a[_i][0];
            _loop_1(post);
        }
    }
}
if (__VLS_ctx.activeTab === 'my-comments') {
    // @ts-ignore
    [activeTab,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "content-module" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ style: {} }));
    (__VLS_ctx.myComments.length);
    // @ts-ignore
    [myComments,];
    if (__VLS_ctx.myComments.length === 0) {
        // @ts-ignore
        [myComments,];
        var __VLS_15 = {}.ElEmpty;
        /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
        // @ts-ignore
        ElEmpty;
        // @ts-ignore
        var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            description: "暂无评论",
        }));
        var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
                description: "暂无评论",
            }], __VLS_functionalComponentArgsRest(__VLS_16), false));
    }
    else {
        var _loop_2 = function (comment) {
            // @ts-ignore
            [myComments,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "comment-item" }, { key: (comment.id) }));
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.activeTab === 'my-comments'))
                        return;
                    if (!!(__VLS_ctx.myComments.length === 0))
                        return;
                    __VLS_ctx.goDetail(comment.postId);
                    // @ts-ignore
                    [goDetail,];
                } }, { class: "comment-post-title" }));
            (comment.postTitle);
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "comment-content" }));
            (comment.content);
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "comment-time" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (comment.createTime);
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ onClick: function () {
                    var _a = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _a[_i] = arguments[_i];
                    }
                    var $event = _a[0];
                    if (!(__VLS_ctx.activeTab === 'my-comments'))
                        return;
                    if (!!(__VLS_ctx.myComments.length === 0))
                        return;
                    __VLS_ctx.handleDeleteComment(comment);
                    // @ts-ignore
                    [handleDeleteComment,];
                } }, { class: "delete-link" }));
        };
        for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.myComments)); _b < _c.length; _b++) {
            var comment = _c[_b][0];
            _loop_2(comment);
        }
    }
}
var __VLS_20 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
ElDialog;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(__assign({ modelValue: (__VLS_ctx.showAvatarDialog), title: "修改头像", width: "90%", maxWidth: "500px", alignCenter: true }, { class: "avatar-dialog" })));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.showAvatarDialog), title: "修改头像", width: "90%", maxWidth: "500px", alignCenter: true }, { class: "avatar-dialog" })], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_24 = __VLS_23.slots.default;
// @ts-ignore
[showAvatarDialog,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "upload-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "upload-tip" }));
/** @type {[typeof FileUpload, typeof FileUpload, ]} */ ;
// @ts-ignore
var __VLS_25 = __VLS_asFunctionalComponent(FileUpload_vue_1.default, new FileUpload_vue_1.default(__assign({ 'onOnChange': {} })));
var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([__assign({ 'onOnChange': {} })], __VLS_functionalComponentArgsRest(__VLS_25), false));
var __VLS_28;
var __VLS_29;
var __VLS_30 = ({ onChange: {} },
    { onOnChange: (__VLS_ctx.handleAvatarChange) });
var __VLS_31 = __VLS_27.slots.default;
// @ts-ignore
[handleAvatarChange,];
/** @type {[typeof FileUploadGrid, ]} */ ;
// @ts-ignore
var __VLS_32 = __VLS_asFunctionalComponent(FileUploadGrid_vue_1.default, new FileUploadGrid_vue_1.default({}));
var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_32), false));
var __VLS_27;
{
    var __VLS_36 = __VLS_23.slots.footer;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "dialog-footer" }));
    var __VLS_37 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37(__assign({ 'onClick': {} })));
    var __VLS_39 = __VLS_38.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_38), false));
    var __VLS_41 = void 0;
    var __VLS_42 = void 0;
    var __VLS_43 = ({ click: {} },
        { onClick: (__VLS_ctx.handleUploadClose) });
    var __VLS_44 = __VLS_40.slots.default;
    // @ts-ignore
    [handleUploadClose,];
    var __VLS_40;
}
var __VLS_23;
/** @type {__VLS_StyleScopedClasses['profile-page']} */ ;
/** @type {__VLS_StyleScopedClasses['profile-header']} */ ;
/** @type {__VLS_StyleScopedClasses['base-info']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-mask']} */ ;
/** @type {__VLS_StyleScopedClasses['user-info']} */ ;
/** @type {__VLS_StyleScopedClasses['nickname']} */ ;
/** @type {__VLS_StyleScopedClasses['signature']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['main-container']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['content-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['content-module']} */ ;
/** @type {__VLS_StyleScopedClasses['post-item']} */ ;
/** @type {__VLS_StyleScopedClasses['post-title']} */ ;
/** @type {__VLS_StyleScopedClasses['post-content']} */ ;
/** @type {__VLS_StyleScopedClasses['post-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['post-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['action-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['content-module']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-item']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-post-title']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-content']} */ ;
/** @type {__VLS_StyleScopedClasses['comment-time']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-link']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-container']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-tip']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
