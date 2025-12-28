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
var main_js_1 = require("@/utils/axios/main.js");
var vue_router_1 = require("vue-router");
var vue_1 = require("vue");
var element_plus_1 = require("element-plus");
var AuroraBackground_vue_1 = require("@/components/AuroraBackground.vue");
var VanishingInput_vue_1 = require("@/components/inspira/VanishingInput.vue");
var RainbowButton_vue_1 = require("@/components/inspira/RainbowButton.vue");
var router = (0, vue_router_1.useRouter)();
var route = (0, vue_router_1.useRoute)();
var goRegister = function () {
    router.push('/register');
};
// 登录表单（根据你实际表单字段调整）
var form = (0, vue_1.reactive)({
    userName: '',
    password: '',
});
// 是否正在提交
var loading = (0, vue_1.ref)(false);
// 基本校验规则
var rules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
// VanishingInput 占位内容
var namePlaceholders = ['请输入用户名', '示例：alice'];
var passwordPlaceholders = ['请输入密码', '长度建议 8+ 位', '区分大小写'];
// VanishingInput 提交时同步到 form
function onVanishingSubmitName(val) {
    form.userName = val;
}
function onVanishingSubmitPassword(val) {
    form.password = val;
}
// 点击登录按钮
var handleLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, roleNumber, loginUser, redirect, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!form.userName || !form.password) {
                    element_plus_1.ElMessage.warning('请输入用户名和密码');
                    return [2 /*return*/];
                }
                loading.value = true;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, main_js_1.default.post('/user/login', {
                        userName: form.userName,
                        password: form.password,
                    })
                    // axios 拦截器已解包，所以 res 就是 { code, data }
                ];
            case 2:
                res = _a.sent();
                // axios 拦截器已解包，所以 res 就是 { code, data }
                if (res.code !== 1) {
                    element_plus_1.ElMessage.error(res.message || '登录失败');
                    return [2 /*return*/];
                }
                data = res.data;
                if (!(data === null || data === void 0 ? void 0 : data.token)) {
                    element_plus_1.ElMessage.error('登录异常：未获取到 Token');
                    return [2 /*return*/];
                }
                roleNumber = typeof data.role === 'string'
                    ? Number(data.role)
                    : data.role;
                // 1. 持久化 token
                localStorage.setItem('token', data.token);
                loginUser = {
                    userId: data.userId,
                    userName: data.userName,
                    role: roleNumber,
                    // 后端目前没有头像字段，将来一旦提供 avatarUrl，这里会自动带上
                    avatarUrl: data.avatarUrl || '',
                };
                localStorage.setItem('login_user', JSON.stringify(loginUser));
                element_plus_1.ElMessage.success('登录成功');
                redirect = route.query.redirect;
                if (redirect) {
                    router.push(redirect);
                }
                else {
                    router.push('/layout/home');
                }
                return [3 /*break*/, 5];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                element_plus_1.ElMessage.error('登录失败，请稍后重试');
                return [3 /*break*/, 5];
            case 4:
                loading.value = false;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
// 暂不登录，继续使用：返回上一页；如果没有上一页，则去首页
var handleSkipLogin = function () {
    var redirect = route.query.redirect;
    if (redirect) {
        try {
            // 解析目标路由，查看是否需要登录
            var targetRoute = router.resolve(redirect);
            // 如果目标页面不需要登录（例如文章详情页），则允许跳回去
            if (targetRoute && !targetRoute.meta.requiresAuth) {
                router.push(redirect);
                return;
            }
        }
        catch (e) {
            console.warn('解析重定向路由失败', e);
        }
    }
    // 其他情况（目标需要登录，或无来源），统一回首页
    router.push('/layout/home');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['form-item-vanish']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['login-footer']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['login-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['login-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
/** @type {__VLS_StyleScopedClasses['go-register']} */ ;
/** @type {[typeof AuroraBackground, typeof AuroraBackground, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(AuroraBackground_vue_1.default, new AuroraBackground_vue_1.default(__assign({ class: "bg-wrapper" })));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([__assign({ class: "bg-wrapper" })], __VLS_functionalComponentArgsRest(__VLS_0), false));
var __VLS_3 = {};
var __VLS_4 = __VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "login-overlay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "login-panel" }));
var __VLS_5 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ class: "login-card" }, { shadow: "always" })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ class: "login-card" }, { shadow: "always" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
var __VLS_9 = __VLS_8.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)(__assign({ class: "title" }));
var __VLS_10 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    ref: "formRef",
    labelPosition: "left",
    labelWidth: "0",
}));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{
        model: (__VLS_ctx.form),
        rules: (__VLS_ctx.rules),
        ref: "formRef",
        labelPosition: "left",
        labelWidth: "0",
    }], __VLS_functionalComponentArgsRest(__VLS_11), false));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_14 = {};
var __VLS_16 = __VLS_13.slots.default;
// @ts-ignore
[form, rules, formRef,];
var __VLS_17 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17(__assign({ prop: "userName" }, { class: "form-item-vanish" })));
var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([__assign({ prop: "userName" }, { class: "form-item-vanish" })], __VLS_functionalComponentArgsRest(__VLS_18), false));
var __VLS_21 = __VLS_20.slots.default;
/** @type {[typeof VanishingInput, ]} */ ;
// @ts-ignore
var __VLS_22 = __VLS_asFunctionalComponent(VanishingInput_vue_1.default, new VanishingInput_vue_1.default(__assign({ 'onSubmit': {} }, { modelValue: (__VLS_ctx.form.userName), placeholders: (__VLS_ctx.namePlaceholders) })));
var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign({ 'onSubmit': {} }, { modelValue: (__VLS_ctx.form.userName), placeholders: (__VLS_ctx.namePlaceholders) })], __VLS_functionalComponentArgsRest(__VLS_22), false));
var __VLS_25;
var __VLS_26;
var __VLS_27 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onVanishingSubmitName) });
// @ts-ignore
[form, namePlaceholders, onVanishingSubmitName,];
var __VLS_24;
var __VLS_20;
var __VLS_29 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29(__assign({ prop: "password" }, { class: "form-item-vanish" })));
var __VLS_31 = __VLS_30.apply(void 0, __spreadArray([__assign({ prop: "password" }, { class: "form-item-vanish" })], __VLS_functionalComponentArgsRest(__VLS_30), false));
var __VLS_33 = __VLS_32.slots.default;
/** @type {[typeof VanishingInput, ]} */ ;
// @ts-ignore
var __VLS_34 = __VLS_asFunctionalComponent(VanishingInput_vue_1.default, new VanishingInput_vue_1.default(__assign({ 'onSubmit': {} }, { modelValue: (__VLS_ctx.form.password), placeholders: (__VLS_ctx.passwordPlaceholders) })));
var __VLS_35 = __VLS_34.apply(void 0, __spreadArray([__assign({ 'onSubmit': {} }, { modelValue: (__VLS_ctx.form.password), placeholders: (__VLS_ctx.passwordPlaceholders) })], __VLS_functionalComponentArgsRest(__VLS_34), false));
var __VLS_37;
var __VLS_38;
var __VLS_39 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onVanishingSubmitPassword) });
// @ts-ignore
[form, passwordPlaceholders, onVanishingSubmitPassword,];
var __VLS_36;
var __VLS_32;
var __VLS_41 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({}));
var __VLS_43 = __VLS_42.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_42), false));
var __VLS_45 = __VLS_44.slots.default;
var __VLS_46 = {}.ElCheckbox;
/** @type {[typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, typeof __VLS_components.ElCheckbox, typeof __VLS_components.elCheckbox, ]} */ ;
// @ts-ignore
ElCheckbox;
// @ts-ignore
var __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
    modelValue: (__VLS_ctx.form.remember),
}));
var __VLS_48 = __VLS_47.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.form.remember),
    }], __VLS_functionalComponentArgsRest(__VLS_47), false));
var __VLS_50 = __VLS_49.slots.default;
// @ts-ignore
[form,];
var __VLS_49;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.goRegister) }, { class: "go-register" }));
// @ts-ignore
[goRegister,];
var __VLS_44;
var __VLS_51 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
var __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({}));
var __VLS_53 = __VLS_52.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_52), false));
var __VLS_55 = __VLS_54.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "btn-wrap" }));
/** @type {[typeof RainbowButton, typeof RainbowButton, ]} */ ;
// @ts-ignore
var __VLS_56 = __VLS_asFunctionalComponent(RainbowButton_vue_1.default, new RainbowButton_vue_1.default(__assign({ 'onClick': {} })));
var __VLS_57 = __VLS_56.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_56), false));
var __VLS_59;
var __VLS_60;
var __VLS_61 = ({ click: {} },
    { onClick: (__VLS_ctx.handleLogin) });
var __VLS_62 = __VLS_58.slots.default;
// @ts-ignore
[handleLogin,];
var __VLS_58;
var __VLS_54;
var __VLS_13;
var __VLS_8;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.handleSkipLogin) }, { type: "button" }), { class: "w-full py-2 text-sm text-gray-600 hover:text-blue-500" }));
// @ts-ignore
[handleSkipLogin,];
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['bg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['login-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['login-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-vanish']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-vanish']} */ ;
/** @type {__VLS_StyleScopedClasses['go-register']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-blue-500']} */ ;
// @ts-ignore
var __VLS_15 = __VLS_14;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
