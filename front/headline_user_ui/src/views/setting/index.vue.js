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
var vue_router_1 = require("vue-router");
var pinia_1 = require("pinia");
var element_plus_1 = require("element-plus");
var main_js_1 = require("@/utils/axios/main.js");
var stores_1 = require("@/stores");
var loginPrompt_1 = require("@/stores/loginPrompt");
defineOptions({
    name: 'SettingPage'
});
var router = (0, vue_router_1.useRouter)();
var loginUserId = (0, vue_1.ref)(null);
var animationStore = (0, stores_1.useAnimationTransitionStore)();
var _a = (0, pinia_1.storeToRefs)(animationStore), enableAnimation = _a.enableAnimation, animationType = _a.animationType;
var setEnableAnimation = animationStore.setEnableAnimation, setAnimationType = animationStore.setAnimationType;
var loginPromptStore = (0, loginPrompt_1.useLoginPromptStore)();
var activeSections = (0, vue_1.ref)([]);
var loadingProfile = (0, vue_1.ref)(false);
var loadingPassword = (0, vue_1.ref)(false);
var bgImage = (0, vue_1.ref)('');
var uploadingBg = (0, vue_1.ref)(false);
var userInfo = (0, vue_1.ref)({
    id: '',
    username: '',
    nickname: '',
    phone: '',
    avatar: '',
});
var passwordForm = (0, vue_1.ref)({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});
var featureToggles = (0, vue_1.ref)({
    scrollIsland: true,
    newMessageNotify: true,
    nightMode: false,
    contentFilter: true,
});
(0, vue_1.watch)(function () { return featureToggles.value.scrollIsland; }, function (newValue) {
    localStorage.setItem('enable_scroll_island', newValue ? '1' : '0');
});
var loadUserInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, e_1;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 2, 3, 4]);
                if (!loginUserId.value)
                    return [2 /*return*/];
                loadingProfile.value = true;
                return [4 /*yield*/, main_js_1.default.get('/user/info', {
                        params: { id: loginUserId.value },
                    })];
            case 1:
                res = _h.sent();
                if (res.code === 0) {
                    element_plus_1.ElMessage.error(res.message || '获取用户信息失败');
                    return [2 /*return*/];
                }
                data = (_a = res.data) !== null && _a !== void 0 ? _a : res;
                userInfo.value = {
                    id: (_b = data.id) !== null && _b !== void 0 ? _b : '',
                    username: (_c = data.username) !== null && _c !== void 0 ? _c : '',
                    nickname: (_e = (_d = data.nickname) !== null && _d !== void 0 ? _d : data.nickName) !== null && _e !== void 0 ? _e : '',
                    phone: (_f = data.phone) !== null && _f !== void 0 ? _f : '',
                    avatar: (_g = data.avatar) !== null && _g !== void 0 ? _g : '',
                };
                return [3 /*break*/, 4];
            case 2:
                e_1 = _h.sent();
                console.error(e_1);
                element_plus_1.ElMessage.error('获取用户信息失败');
                return [3 /*break*/, 4];
            case 3:
                loadingProfile.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
(0, vue_1.onMounted)(function () {
    try {
        var raw = localStorage.getItem('login_user');
        if (raw) {
            var info = JSON.parse(raw);
            loginUserId.value = info.userId || null;
        }
    }
    catch (e) {
        console.error('解析本地登录用户信息失败', e);
    }
    if (loginUserId.value) {
        loadUserInfo();
    }
    var saved = localStorage.getItem('enable_scroll_island');
    if (saved !== null) {
        featureToggles.value.scrollIsland = saved === '1';
    }
    var storedBg = localStorage.getItem('backgroundImage');
    if (storedBg) {
        bgImage.value = storedBg;
    }
});
var uploadAvatar = function (option) { return __awaiter(void 0, void 0, void 0, function () {
    var formData, res, data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                formData = new FormData();
                formData.append('image', option.file);
                return [4 /*yield*/, main_js_1.default.post('/user/upload', formData)];
            case 1:
                res = _a.sent();
                data = res.data || res;
                if (data.code === 1 || data.code === 200) {
                    userInfo.value.avatar = data.imageUrl || data.data;
                    element_plus_1.ElMessage.success('头像上传成功');
                    option.onSuccess(data, option.file);
                }
                else {
                    element_plus_1.ElMessage.error(data.message || '头像上传失败');
                    option.onError(new Error(data.message));
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                element_plus_1.ElMessage.error('头像上传失败');
                option.onError(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var uploadBackground = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var file, formData, res, data, url, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = options.file;
                uploadingBg.value = true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                formData = new FormData();
                formData.append('image', file);
                return [4 /*yield*/, main_js_1.default.post('/user/upload', formData)];
            case 2:
                res = _a.sent();
                data = res.data || res;
                if (data.code === 1 || data.code === 200) {
                    url = data.imageUrl || data.data;
                    if (url) {
                        bgImage.value = url;
                        localStorage.setItem('backgroundImage', url);
                        element_plus_1.ElMessage.success('背景设置成功');
                    }
                }
                else {
                    element_plus_1.ElMessage.error(data.message || '上传失败');
                }
                return [3 /*break*/, 5];
            case 3:
                e_3 = _a.sent();
                console.error(e_3);
                element_plus_1.ElMessage.error('上传出错');
                return [3 /*break*/, 5];
            case 4:
                uploadingBg.value = false;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var clearBackground = function () {
    bgImage.value = '';
    localStorage.removeItem('backgroundImage');
    element_plus_1.ElMessage.success('已恢复默认背景');
};
var saveProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
    var payload, res, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                if (!loginUserId.value)
                    return [2 /*return*/];
                loadingProfile.value = true;
                payload = {
                    id: userInfo.value.id || loginUserId.value,
                    username: userInfo.value.username,
                    nickname: userInfo.value.nickname,
                    phone: userInfo.value.phone,
                    avatar: userInfo.value.avatar,
                };
                return [4 /*yield*/, main_js_1.default.put('/user/info', payload)];
            case 1:
                res = _a.sent();
                if (res.code === 1) {
                    element_plus_1.ElMessage.success('保存成功');
                    loadUserInfo();
                }
                else {
                    element_plus_1.ElMessage.error(res.message || '保存失败');
                }
                return [3 /*break*/, 4];
            case 2:
                e_4 = _a.sent();
                element_plus_1.ElMessage.error('保存失败：' + e_4);
                return [3 /*break*/, 4];
            case 3:
                loadingProfile.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var changePassword = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword) {
                    element_plus_1.ElMessage.warning('请填写完整');
                    return [2 /*return*/];
                }
                if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
                    element_plus_1.ElMessage.warning('两次新密码不一致');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                loadingPassword.value = true;
                return [4 /*yield*/, main_js_1.default.put('/user/password', {
                        oldPassword: passwordForm.value.oldPassword,
                        newPassword: passwordForm.value.newPassword,
                    })];
            case 2:
                res = _a.sent();
                if (res.code === 1 || res.code === 0) {
                    element_plus_1.ElMessage.success('密码修改成功，请重新登录');
                    passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
                }
                else {
                    element_plus_1.ElMessage.error(res.message || '修改失败');
                }
                return [3 /*break*/, 5];
            case 3:
                e_5 = _a.sent();
                element_plus_1.ElMessage.error('修改失败：' + e_5);
                return [3 /*break*/, 5];
            case 4:
                loadingPassword.value = false;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        loginPromptStore.showLogout();
        return [2 /*return*/];
    });
}); };
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "setting-page" }, { style: (__VLS_ctx.bgImage ? { backgroundImage: "url(".concat(__VLS_ctx.bgImage, ")") } : {}) }));
// @ts-ignore
[bgImage, bgImage,];
var __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ class: "user-card" }, { loading: (__VLS_ctx.loadingProfile), shadow: "never" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "user-card" }, { loading: (__VLS_ctx.loadingProfile), shadow: "never" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
// @ts-ignore
[loadingProfile,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-header" }));
var __VLS_5 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
ElUpload;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ class: "avatar-uploader" }, { showFileList: (false), httpRequest: (__VLS_ctx.uploadAvatar) })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ class: "avatar-uploader" }, { showFileList: (false), httpRequest: (__VLS_ctx.uploadAvatar) })], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_9 = __VLS_8.slots.default;
// @ts-ignore
[uploadAvatar,];
if (__VLS_ctx.userInfo.avatar) {
    // @ts-ignore
    [userInfo,];
    __VLS_asFunctionalElement(__VLS_intrinsics.img)(__assign({ src: (__VLS_ctx.userInfo.avatar), alt: "avatar" }, { class: "avatar" }));
    // @ts-ignore
    [userInfo,];
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "avatar-placeholder" }));
}
var __VLS_8;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-meta" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-name-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "user-name" }));
(__VLS_ctx.userInfo.nickname || __VLS_ctx.userInfo.username || '未命名用户');
// @ts-ignore
[userInfo, userInfo,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-id" }));
(__VLS_ctx.userInfo.id || '-');
// @ts-ignore
[userInfo,];
var __VLS_3;
var __VLS_10 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ class: "section-card" }, { shadow: "never" })));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ class: "section-card" }, { shadow: "never" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
var __VLS_14 = __VLS_13.slots.default;
var __VLS_15 = {}.ElCollapse;
/** @type {[typeof __VLS_components.ElCollapse, typeof __VLS_components.elCollapse, typeof __VLS_components.ElCollapse, typeof __VLS_components.elCollapse, ]} */ ;
// @ts-ignore
ElCollapse;
// @ts-ignore
var __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    modelValue: (__VLS_ctx.activeSections),
}));
var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.activeSections),
    }], __VLS_functionalComponentArgsRest(__VLS_16), false));
var __VLS_19 = __VLS_18.slots.default;
// @ts-ignore
[activeSections,];
var __VLS_20 = {}.ElCollapseItem;
/** @type {[typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, ]} */ ;
// @ts-ignore
ElCollapseItem;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    name: "account",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        name: "account",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
var __VLS_24 = __VLS_23.slots.default;
{
    var __VLS_25 = __VLS_23.slots.title;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "collapse-title" }));
}
var __VLS_26 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    model: (__VLS_ctx.userInfo),
    labelWidth: "90px",
}));
var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
        model: (__VLS_ctx.userInfo),
        labelWidth: "90px",
    }], __VLS_functionalComponentArgsRest(__VLS_27), false));
var __VLS_30 = __VLS_29.slots.default;
// @ts-ignore
[userInfo,];
var __VLS_31 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    label: "用户 ID",
}));
var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([{
        label: "用户 ID",
    }], __VLS_functionalComponentArgsRest(__VLS_32), false));
var __VLS_35 = __VLS_34.slots.default;
var __VLS_36 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    modelValue: (__VLS_ctx.userInfo.id),
    disabled: true,
}));
var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.userInfo.id),
        disabled: true,
    }], __VLS_functionalComponentArgsRest(__VLS_37), false));
// @ts-ignore
[userInfo,];
var __VLS_34;
var __VLS_41 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
    label: "用户名",
}));
var __VLS_43 = __VLS_42.apply(void 0, __spreadArray([{
        label: "用户名",
    }], __VLS_functionalComponentArgsRest(__VLS_42), false));
var __VLS_45 = __VLS_44.slots.default;
var __VLS_46 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    modelValue: (__VLS_ctx.userInfo.username),
}));
var __VLS_48 = __VLS_47.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.userInfo.username),
    }], __VLS_functionalComponentArgsRest(__VLS_47), false));
// @ts-ignore
[userInfo,];
var __VLS_44;
var __VLS_51 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    label: "昵称",
}));
var __VLS_53 = __VLS_52.apply(void 0, __spreadArray([{
        label: "昵称",
    }], __VLS_functionalComponentArgsRest(__VLS_52), false));
var __VLS_55 = __VLS_54.slots.default;
var __VLS_56 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    modelValue: (__VLS_ctx.userInfo.nickname),
}));
var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.userInfo.nickname),
    }], __VLS_functionalComponentArgsRest(__VLS_57), false));
// @ts-ignore
[userInfo,];
var __VLS_54;
var __VLS_61 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    label: "手机号",
}));
var __VLS_63 = __VLS_62.apply(void 0, __spreadArray([{
        label: "手机号",
    }], __VLS_functionalComponentArgsRest(__VLS_62), false));
var __VLS_65 = __VLS_64.slots.default;
var __VLS_66 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    modelValue: (__VLS_ctx.userInfo.phone),
}));
var __VLS_68 = __VLS_67.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.userInfo.phone),
    }], __VLS_functionalComponentArgsRest(__VLS_67), false));
// @ts-ignore
[userInfo,];
var __VLS_64;
var __VLS_29;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "section-actions" }));
var __VLS_71 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71(__assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loadingProfile) })));
var __VLS_73 = __VLS_72.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loadingProfile) })], __VLS_functionalComponentArgsRest(__VLS_72), false));
var __VLS_75;
var __VLS_76;
var __VLS_77 = ({ click: {} },
    { onClick: (__VLS_ctx.saveProfile) });
var __VLS_78 = __VLS_74.slots.default;
// @ts-ignore
[loadingProfile, saveProfile,];
var __VLS_74;
var __VLS_23;
var __VLS_79 = {}.ElCollapseItem;
/** @type {[typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, ]} */ ;
// @ts-ignore
ElCollapseItem;
// @ts-ignore
var __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    name: "password",
}));
var __VLS_81 = __VLS_80.apply(void 0, __spreadArray([{
        name: "password",
    }], __VLS_functionalComponentArgsRest(__VLS_80), false));
var __VLS_83 = __VLS_82.slots.default;
{
    var __VLS_84 = __VLS_82.slots.title;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "collapse-title" }));
}
var __VLS_85 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
var __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    model: (__VLS_ctx.passwordForm),
    labelWidth: "90px",
}));
var __VLS_87 = __VLS_86.apply(void 0, __spreadArray([{
        model: (__VLS_ctx.passwordForm),
        labelWidth: "90px",
    }], __VLS_functionalComponentArgsRest(__VLS_86), false));
var __VLS_89 = __VLS_88.slots.default;
// @ts-ignore
[passwordForm,];
var __VLS_90 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    label: "当前密码",
}));
var __VLS_92 = __VLS_91.apply(void 0, __spreadArray([{
        label: "当前密码",
    }], __VLS_functionalComponentArgsRest(__VLS_91), false));
var __VLS_94 = __VLS_93.slots.default;
var __VLS_95 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    modelValue: (__VLS_ctx.passwordForm.oldPassword),
    showPassword: true,
}));
var __VLS_97 = __VLS_96.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.passwordForm.oldPassword),
        showPassword: true,
    }], __VLS_functionalComponentArgsRest(__VLS_96), false));
// @ts-ignore
[passwordForm,];
var __VLS_93;
var __VLS_100 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    label: "新密码",
}));
var __VLS_102 = __VLS_101.apply(void 0, __spreadArray([{
        label: "新密码",
    }], __VLS_functionalComponentArgsRest(__VLS_101), false));
var __VLS_104 = __VLS_103.slots.default;
var __VLS_105 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
    modelValue: (__VLS_ctx.passwordForm.newPassword),
    showPassword: true,
}));
var __VLS_107 = __VLS_106.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.passwordForm.newPassword),
        showPassword: true,
    }], __VLS_functionalComponentArgsRest(__VLS_106), false));
// @ts-ignore
[passwordForm,];
var __VLS_103;
var __VLS_110 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    label: "确认新密码",
}));
var __VLS_112 = __VLS_111.apply(void 0, __spreadArray([{
        label: "确认新密码",
    }], __VLS_functionalComponentArgsRest(__VLS_111), false));
var __VLS_114 = __VLS_113.slots.default;
var __VLS_115 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
var __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    modelValue: (__VLS_ctx.passwordForm.confirmPassword),
    showPassword: true,
}));
var __VLS_117 = __VLS_116.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.passwordForm.confirmPassword),
        showPassword: true,
    }], __VLS_functionalComponentArgsRest(__VLS_116), false));
// @ts-ignore
[passwordForm,];
var __VLS_113;
var __VLS_88;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "section-actions" }));
var __VLS_120 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120(__assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loadingPassword) })));
var __VLS_122 = __VLS_121.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loadingPassword) })], __VLS_functionalComponentArgsRest(__VLS_121), false));
var __VLS_124;
var __VLS_125;
var __VLS_126 = ({ click: {} },
    { onClick: (__VLS_ctx.changePassword) });
var __VLS_127 = __VLS_123.slots.default;
// @ts-ignore
[loadingPassword, changePassword,];
var __VLS_123;
var __VLS_82;
var __VLS_18;
var __VLS_13;
var __VLS_128 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128(__assign({ class: "section-card" }, { header: "个性化设置", shadow: "never" })));
var __VLS_130 = __VLS_129.apply(void 0, __spreadArray([__assign({ class: "section-card" }, { header: "个性化设置", shadow: "never" })], __VLS_functionalComponentArgsRest(__VLS_129), false));
var __VLS_132 = __VLS_131.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
var __VLS_133 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
ElSwitch;
// @ts-ignore
var __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.enableAnimation) })));
var __VLS_135 = __VLS_134.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.enableAnimation) })], __VLS_functionalComponentArgsRest(__VLS_134), false));
var __VLS_137;
var __VLS_138;
var __VLS_139 = ({ change: {} },
    { onChange: (__VLS_ctx.setEnableAnimation) });
// @ts-ignore
[enableAnimation, setEnableAnimation,];
var __VLS_136;
if (__VLS_ctx.enableAnimation) {
    // @ts-ignore
    [enableAnimation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
    var __VLS_141 = {}.ElRadioGroup;
    /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
    // @ts-ignore
    ElRadioGroup;
    // @ts-ignore
    var __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.animationType), size: "small" })));
    var __VLS_143 = __VLS_142.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.animationType), size: "small" })], __VLS_functionalComponentArgsRest(__VLS_142), false));
    var __VLS_145 = void 0;
    var __VLS_146 = void 0;
    var __VLS_147 = ({ change: {} },
        { onChange: (__VLS_ctx.setAnimationType) });
    var __VLS_148 = __VLS_144.slots.default;
    // @ts-ignore
    [animationType, setAnimationType,];
    var __VLS_149 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
        label: "slide",
    }));
    var __VLS_151 = __VLS_150.apply(void 0, __spreadArray([{
            label: "slide",
        }], __VLS_functionalComponentArgsRest(__VLS_150), false));
    var __VLS_153 = __VLS_152.slots.default;
    var __VLS_152;
    var __VLS_154 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
        label: "fade",
    }));
    var __VLS_156 = __VLS_155.apply(void 0, __spreadArray([{
            label: "fade",
        }], __VLS_functionalComponentArgsRest(__VLS_155), false));
    var __VLS_158 = __VLS_157.slots.default;
    var __VLS_157;
    var __VLS_144;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row bg-setting-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "bg-actions" }));
var __VLS_159 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
ElUpload;
// @ts-ignore
var __VLS_160 = __VLS_asFunctionalComponent(__VLS_159, new __VLS_159(__assign({ class: "bg-uploader" }, { showFileList: (false), httpRequest: (__VLS_ctx.uploadBackground), accept: "image/*" })));
var __VLS_161 = __VLS_160.apply(void 0, __spreadArray([__assign({ class: "bg-uploader" }, { showFileList: (false), httpRequest: (__VLS_ctx.uploadBackground), accept: "image/*" })], __VLS_functionalComponentArgsRest(__VLS_160), false));
var __VLS_163 = __VLS_162.slots.default;
// @ts-ignore
[uploadBackground,];
var __VLS_164 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({
    size: "small",
    loading: (__VLS_ctx.uploadingBg),
}));
var __VLS_166 = __VLS_165.apply(void 0, __spreadArray([{
        size: "small",
        loading: (__VLS_ctx.uploadingBg),
    }], __VLS_functionalComponentArgsRest(__VLS_165), false));
var __VLS_168 = __VLS_167.slots.default;
// @ts-ignore
[uploadingBg,];
var __VLS_167;
var __VLS_162;
if (__VLS_ctx.bgImage) {
    // @ts-ignore
    [bgImage,];
    var __VLS_169 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169(__assign({ 'onClick': {} }, { size: "small", type: "danger", link: true })));
    var __VLS_171 = __VLS_170.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "danger", link: true })], __VLS_functionalComponentArgsRest(__VLS_170), false));
    var __VLS_173 = void 0;
    var __VLS_174 = void 0;
    var __VLS_175 = ({ click: {} },
        { onClick: (__VLS_ctx.clearBackground) });
    var __VLS_176 = __VLS_172.slots.default;
    // @ts-ignore
    [clearBackground,];
    var __VLS_172;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
var __VLS_177 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
ElSwitch;
// @ts-ignore
var __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
    modelValue: (__VLS_ctx.featureToggles.scrollIsland),
}));
var __VLS_179 = __VLS_178.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.featureToggles.scrollIsland),
    }], __VLS_functionalComponentArgsRest(__VLS_178), false));
// @ts-ignore
[featureToggles,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
var __VLS_182 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
ElSwitch;
// @ts-ignore
var __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
    modelValue: (__VLS_ctx.featureToggles.newMessageNotify),
}));
var __VLS_184 = __VLS_183.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.featureToggles.newMessageNotify),
    }], __VLS_functionalComponentArgsRest(__VLS_183), false));
// @ts-ignore
[featureToggles,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
var __VLS_187 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
ElSwitch;
// @ts-ignore
var __VLS_188 = __VLS_asFunctionalComponent(__VLS_187, new __VLS_187({
    modelValue: (__VLS_ctx.featureToggles.nightMode),
}));
var __VLS_189 = __VLS_188.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.featureToggles.nightMode),
    }], __VLS_functionalComponentArgsRest(__VLS_188), false));
// @ts-ignore
[featureToggles,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "feature-sub" }));
var __VLS_192 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
ElSwitch;
// @ts-ignore
var __VLS_193 = __VLS_asFunctionalComponent(__VLS_192, new __VLS_192({
    modelValue: (__VLS_ctx.featureToggles.contentFilter),
}));
var __VLS_194 = __VLS_193.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.featureToggles.contentFilter),
    }], __VLS_functionalComponentArgsRest(__VLS_193), false));
// @ts-ignore
[featureToggles,];
var __VLS_131;
var __VLS_197 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197(__assign({ class: "section-card danger-card" }, { shadow: "never" })));
var __VLS_199 = __VLS_198.apply(void 0, __spreadArray([__assign({ class: "section-card danger-card" }, { shadow: "never" })], __VLS_functionalComponentArgsRest(__VLS_198), false));
var __VLS_201 = __VLS_200.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logout-row" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logout-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logout-sub" }));
var __VLS_202 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
var __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202(__assign({ 'onClick': {} }, { type: "danger" })));
var __VLS_204 = __VLS_203.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { type: "danger" })], __VLS_functionalComponentArgsRest(__VLS_203), false));
var __VLS_206;
var __VLS_207;
var __VLS_208 = ({ click: {} },
    { onClick: (__VLS_ctx.logout) });
var __VLS_209 = __VLS_205.slots.default;
// @ts-ignore
[logout,];
var __VLS_205;
var __VLS_200;
/** @type {__VLS_StyleScopedClasses['setting-page']} */ ;
/** @type {__VLS_StyleScopedClasses['user-card']} */ ;
/** @type {__VLS_StyleScopedClasses['user-header']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['user-meta']} */ ;
/** @type {__VLS_StyleScopedClasses['user-name-row']} */ ;
/** @type {__VLS_StyleScopedClasses['user-name']} */ ;
/** @type {__VLS_StyleScopedClasses['user-id']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['collapse-title']} */ ;
/** @type {__VLS_StyleScopedClasses['section-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-setting-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-uploader']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-row']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-title']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['section-card']} */ ;
/** @type {__VLS_StyleScopedClasses['danger-card']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-row']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-title']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-sub']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
