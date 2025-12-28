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
var vue_1 = require("vue");
var icons_vue_1 = require("@element-plus/icons-vue");
var element_plus_1 = require("element-plus");
var main_js_1 = require("@/utils/axios/main.js");
var vue_router_1 = require("vue-router");
var route = (0, vue_router_1.useRoute)();
defineOptions({
    name: 'AddArticlePage'
});
var router = (0, vue_router_1.useRouter)();
var submitting = (0, vue_1.ref)(false);
// 简化的工具栏配置
var toolbarOptions = [
    [{ 'header': [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'clean']
];
var articleForm = (0, vue_1.ref)({
    title: '',
    coverImages: [],
    content: '',
    categoryId: null,
    status: 1
});
// 存储当前用户ID
var currentUserId = (0, vue_1.ref)(null);
// 分类选项
var categoryOptions = (0, vue_1.ref)([
    { id: 1, name: '校园' },
    { id: 2, name: '生活' },
    { id: 3, name: '科技' },
    { id: 4, name: '要闻' },
    { id: 5, name: '通知公告' },
]);
// --- 图片管理逻辑 ---
var customUpload = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var file, onSuccess, onError, formData, res, responseData, url, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = options.file, onSuccess = options.onSuccess, onError = options.onError;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                formData = new FormData();
                // 修复1：后端 @RequestParam("image") 要求参数名为 image
                formData.append('image', file);
                return [4 /*yield*/, main_js_1.default.post('/user/upload', formData)];
            case 2:
                res = _a.sent();
                responseData = res.data || res;
                // 修复2：后端返回结构是 { code: 1, imageUrl: "..." }
                if (responseData.code === 1 || responseData.code === 200) {
                    url = responseData.imageUrl;
                    if (url) {
                        articleForm.value.coverImages.push(url);
                        element_plus_1.ElMessage.success('上传成功');
                        onSuccess(responseData);
                    }
                    else {
                        throw new Error('返回的图片地址为空');
                    }
                }
                else {
                    throw new Error(responseData.message || '上传失败');
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                element_plus_1.ElMessage.error(err_1.message || '网络错误，上传失败');
                onError(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var beforeUpload = function (file) {
    var isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        element_plus_1.ElMessage.warning('图片大小不能超过 5MB!');
    }
    return isLt5M;
};
var removeImage = function (index) {
    articleForm.value.coverImages.splice(index, 1);
};
// --- 核心业务逻辑 ---
var submitArticle = function () { return __awaiter(void 0, void 0, void 0, function () {
    var finalCategoryId, finalCategoryName, match, res, data, e_1, raw, info, payload, res, resData, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!articleForm.value.title.trim())
                    return [2 /*return*/, element_plus_1.ElMessage.warning('请输入标题')];
                if (!articleForm.value.categoryId)
                    return [2 /*return*/, element_plus_1.ElMessage.warning('请选择或输入分类')];
                if (!articleForm.value.content.trim())
                    return [2 /*return*/, element_plus_1.ElMessage.warning('请输入正文内容')];
                submitting.value = true;
                finalCategoryId = articleForm.value.categoryId;
                finalCategoryName = null;
                if (!(typeof finalCategoryId === 'string')) return [3 /*break*/, 4];
                match = categoryOptions.value.find(function (c) { return c.name === finalCategoryId; });
                if (!match) return [3 /*break*/, 1];
                finalCategoryId = match.id;
                return [3 /*break*/, 4];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, main_js_1.default.post('/user/news/category/add', { name: finalCategoryId })];
            case 2:
                res = _a.sent();
                data = res.data || res;
                if (data.code === 1 && data.id) {
                    finalCategoryId = data.id;
                    // 动态加入本地分类选项
                    categoryOptions.value.push({ id: data.id, name: articleForm.value.categoryId });
                }
                else {
                    // 兜底：如果后端返回已存在
                    if (data.id) {
                        finalCategoryId = data.id;
                    }
                    else {
                        // 后端没返回 id，则用 categoryName 兜底
                        finalCategoryName = articleForm.value.categoryId;
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                // 网络异常时，直接用 categoryName 兜底
                finalCategoryName = articleForm.value.categoryId;
                return [3 /*break*/, 4];
            case 4:
                // 2. 获取用户 ID
                if (!currentUserId.value) {
                    try {
                        raw = localStorage.getItem('login_user');
                        if (raw) {
                            info = JSON.parse(raw);
                            currentUserId.value = info.userId || info.id || info.uid;
                        }
                    }
                    catch (e) {
                        console.error('解析用户信息失败', e);
                    }
                }
                if (!currentUserId.value) {
                    element_plus_1.ElMessage.error('无法获取用户信息，请重新登录');
                    submitting.value = false;
                    return [2 /*return*/];
                }
                payload = {
                    authorId: currentUserId.value,
                    title: articleForm.value.title,
                    content: articleForm.value.content,
                    coverImages: JSON.stringify(articleForm.value.coverImages),
                    status: 1
                };
                if (finalCategoryId) {
                    payload.categoryId = finalCategoryId;
                }
                if (finalCategoryName) {
                    payload.categoryName = finalCategoryName;
                }
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, 8, 9]);
                return [4 /*yield*/, main_js_1.default.post('/user/news/post', payload)];
            case 6:
                res = _a.sent();
                resData = res.data || res;
                if (resData.id != null || resData.code === 1 || resData.code === 200) {
                    element_plus_1.ElMessage.success('发布成功！待审核中');
                    localStorage.removeItem('articleDraft');
                    router.push('/layout/home');
                }
                else {
                    element_plus_1.ElMessage.error(resData.message || '发布失败，请检查网络或重试');
                }
                return [3 /*break*/, 9];
            case 7:
                err_2 = _a.sent();
                element_plus_1.ElMessage.error(err_2.message || '网络异常，请稍后重试');
                return [3 /*break*/, 9];
            case 8:
                submitting.value = false;
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}); };
var saveArticle = function () {
    localStorage.setItem('articleDraft', JSON.stringify(articleForm.value));
    element_plus_1.ElMessage.success('已保存到本地草稿');
};
(0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, res, data, draft, parsed, raw, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = route.query.id;
                if (!id) return [3 /*break*/, 2];
                return [4 /*yield*/, main_js_1.default.get("/user/news/".concat(id))];
            case 1:
                res = _a.sent();
                data = res.data || res;
                articleForm.value.title = data.title || '';
                articleForm.value.content = data.content || '';
                articleForm.value.categoryId = data.categoryId || null;
                if (typeof data.coverImages === 'string') {
                    try {
                        articleForm.value.coverImages = JSON.parse(data.coverImages);
                    }
                    catch (_b) {
                        articleForm.value.coverImages = [];
                    }
                }
                else if (Array.isArray(data.coverImages)) {
                    articleForm.value.coverImages = data.coverImages;
                }
                else {
                    articleForm.value.coverImages = [];
                }
                _a.label = 2;
            case 2:
                draft = localStorage.getItem('articleDraft');
                if (draft) {
                    try {
                        parsed = JSON.parse(draft);
                        articleForm.value = __assign(__assign({}, articleForm.value), parsed);
                    }
                    catch (e) {
                        console.error('草稿解析失败', e);
                    }
                }
                // 2. 从 localStorage 获取用户信息
                try {
                    raw = localStorage.getItem('login_user');
                    if (raw) {
                        info = JSON.parse(raw);
                        currentUserId.value = info.userId || info.id || info.uid;
                    }
                }
                catch (e) {
                    console.error('读取本地用户信息失败', e);
                }
                return [2 /*return*/];
        }
    });
}); });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['title-input']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-box']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "publish-container" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ class: "native-input title-input" }, { placeholder: "请输入标题 (2-30字)", maxlength: "30" }));
(__VLS_ctx.articleForm.title);
// @ts-ignore
[articleForm,];
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "word-count" }));
(__VLS_ctx.articleForm.title.length);
// @ts-ignore
[articleForm,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "label" }));
var __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
ElSelect;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ modelValue: (__VLS_ctx.articleForm.categoryId), filterable: true, allowCreate: true, defaultFirstOption: true, placeholder: "请选择或输入分类" }, { class: "category-select" }), { size: "large" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ modelValue: (__VLS_ctx.articleForm.categoryId), filterable: true, allowCreate: true, defaultFirstOption: true, placeholder: "请选择或输入分类" }, { class: "category-select" }), { size: "large" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
// @ts-ignore
[articleForm,];
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.categoryOptions)); _i < _a.length; _i++) {
    var item = _a[_i][0];
    // @ts-ignore
    [categoryOptions,];
    var __VLS_5 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    ElOption;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        key: (item.id),
        label: (item.name),
        value: (item.id),
    }));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
            key: (item.id),
            label: (item.name),
            value: (item.id),
        }], __VLS_functionalComponentArgsRest(__VLS_6), false));
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-item editor-box" }));
var __VLS_10 = {}.QuillEditor;
/** @type {[typeof __VLS_components.QuillEditor, ]} */ ;
// @ts-ignore
QuillEditor;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ content: (__VLS_ctx.articleForm.content), contentType: "html", toolbar: (__VLS_ctx.toolbarOptions), theme: "snow", placeholder: "分享你的校园新鲜事..." }, { class: "custom-quill" })));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ content: (__VLS_ctx.articleForm.content), contentType: "html", toolbar: (__VLS_ctx.toolbarOptions), theme: "snow", placeholder: "分享你的校园新鲜事..." }, { class: "custom-quill" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
// @ts-ignore
[articleForm, toolbarOptions,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-item" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "label" }));
(__VLS_ctx.articleForm.coverImages.length);
// @ts-ignore
[articleForm,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "image-grid" }));
var _loop_1 = function (img, index) {
    // @ts-ignore
    [articleForm,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (index) }, { class: "grid-item" }));
    var __VLS_15 = {}.ElImage;
    /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
    // @ts-ignore
    ElImage;
    // @ts-ignore
    var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(__assign(__assign({ src: (img), fit: "cover" }, { class: "grid-img" }), { previewSrcList: (__VLS_ctx.articleForm.coverImages), initialIndex: (index), hideOnClickModal: true })));
    var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([__assign(__assign({ src: (img), fit: "cover" }, { class: "grid-img" }), { previewSrcList: (__VLS_ctx.articleForm.coverImages), initialIndex: (index), hideOnClickModal: true })], __VLS_functionalComponentArgsRest(__VLS_16), false));
    // @ts-ignore
    [articleForm,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.removeImage(index);
            // @ts-ignore
            [removeImage,];
        } }, { class: "delete-btn" }));
    var __VLS_20 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_21), false));
    var __VLS_24 = __VLS_23.slots.default;
    var __VLS_25 = {}.Close;
    /** @type {[typeof __VLS_components.Close, ]} */ ;
    // @ts-ignore
    icons_vue_1.Close;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_26), false));
};
var __VLS_23;
for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.articleForm.coverImages)); _b < _c.length; _b++) {
    var _d = _c[_b], img = _d[0], index = _d[1];
    _loop_1(img, index);
}
if (__VLS_ctx.articleForm.coverImages.length < 9) {
    // @ts-ignore
    [articleForm,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "grid-item upload-wrapper" }));
    var __VLS_30 = {}.ElUpload;
    /** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
    // @ts-ignore
    ElUpload;
    // @ts-ignore
    var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30(__assign({ class: "custom-uploader" }, { action: "#", showFileList: (false), httpRequest: (__VLS_ctx.customUpload), beforeUpload: (__VLS_ctx.beforeUpload), multiple: true })));
    var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([__assign({ class: "custom-uploader" }, { action: "#", showFileList: (false), httpRequest: (__VLS_ctx.customUpload), beforeUpload: (__VLS_ctx.beforeUpload), multiple: true })], __VLS_functionalComponentArgsRest(__VLS_31), false));
    var __VLS_34 = __VLS_33.slots.default;
    // @ts-ignore
    [customUpload, beforeUpload,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "upload-box" }));
    var __VLS_35 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    ElIcon;
    // @ts-ignore
    var __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35(__assign({ class: "upload-icon" })));
    var __VLS_37 = __VLS_36.apply(void 0, __spreadArray([__assign({ class: "upload-icon" })], __VLS_functionalComponentArgsRest(__VLS_36), false));
    var __VLS_39 = __VLS_38.slots.default;
    var __VLS_40 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    icons_vue_1.Plus;
    // @ts-ignore
    var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
    var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_41), false));
    var __VLS_38;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "upload-text" }));
    var __VLS_33;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "action-bar" }));
var __VLS_45 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45(__assign(__assign({ 'onClick': {} }, { class: "btn-save" }), { round: true })));
var __VLS_47 = __VLS_46.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { class: "btn-save" }), { round: true })], __VLS_functionalComponentArgsRest(__VLS_46), false));
var __VLS_49;
var __VLS_50;
var __VLS_51 = ({ click: {} },
    { onClick: (__VLS_ctx.saveArticle) });
var __VLS_52 = __VLS_48.slots.default;
// @ts-ignore
[saveArticle,];
var __VLS_48;
var __VLS_53 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53(__assign(__assign({ 'onClick': {} }, { class: "btn-publish" }), { type: "primary", round: true, loading: (__VLS_ctx.submitting) })));
var __VLS_55 = __VLS_54.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { class: "btn-publish" }), { type: "primary", round: true, loading: (__VLS_ctx.submitting) })], __VLS_functionalComponentArgsRest(__VLS_54), false));
var __VLS_57;
var __VLS_58;
var __VLS_59 = ({ click: {} },
    { onClick: (__VLS_ctx.submitArticle) });
var __VLS_60 = __VLS_56.slots.default;
// @ts-ignore
[submitting, submitArticle,];
var __VLS_56;
/** @type {__VLS_StyleScopedClasses['publish-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['native-input']} */ ;
/** @type {__VLS_StyleScopedClasses['title-input']} */ ;
/** @type {__VLS_StyleScopedClasses['word-count']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['category-select']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['editor-box']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-quill']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['image-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-item']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-img']} */ ;
/** @type {__VLS_StyleScopedClasses['delete-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-item']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-uploader']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-box']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-text']} */ ;
/** @type {__VLS_StyleScopedClasses['action-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-save']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-publish']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
