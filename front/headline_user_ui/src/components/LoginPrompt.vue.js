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
var pinia_1 = require("pinia");
var vue_router_1 = require("vue-router");
var loginPrompt_1 = require("@/stores/loginPrompt");
var Meteors_vue_1 = require("@/components/Meteors.vue");
var element_plus_1 = require("element-plus");
var router = (0, vue_router_1.useRouter)();
var store = (0, loginPrompt_1.useLoginPromptStore)();
var _a = (0, pinia_1.storeToRefs)(store), visible = _a.visible, redirectPath = _a.redirectPath, mode = _a.mode;
// === 登录逻辑 ===
var handleLogin = function () {
    store.hide();
    router.push({
        path: '/login',
        query: { redirect: redirectPath.value || router.currentRoute.value.fullPath }
    });
};
var handleRegister = function () {
    store.hide();
    router.push('/register');
};
// === 退出逻辑 ===
var handleLogoutConfirm = function () {
    // 清除 Token 和用户信息
    localStorage.removeItem('token');
    localStorage.removeItem('login_user');
    element_plus_1.ElMessage.success('已退出登录');
    store.hide();
    // 跳转到登录页
    router.push('/login');
};
// === 通用 ===
var handleCancel = function () {
    store.hide();
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
var __VLS_0 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        name: "fade",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
if (__VLS_ctx.visible) {
    // @ts-ignore
    [visible,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "prompt-overlay" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "prompt-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "meteors-container" }));
    /** @type {[typeof Meteors, ]} */ ;
    // @ts-ignore
    var __VLS_5 = __VLS_asFunctionalComponent(Meteors_vue_1.default, new Meteors_vue_1.default({
        count: (20),
    }));
    var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{
            count: (20),
        }], __VLS_functionalComponentArgsRest(__VLS_5), false));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "prompt-content" }));
    if (__VLS_ctx.mode === 'login') {
        // @ts-ignore
        [mode,];
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "prompt-title" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "prompt-desc" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "prompt-actions" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleLogin) }, { class: "btn-primary" }));
        // @ts-ignore
        [handleLogin,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleRegister) }, { class: "btn-secondary" }));
        // @ts-ignore
        [handleRegister,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleCancel) }, { class: "btn-text" }));
        // @ts-ignore
        [handleCancel,];
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "prompt-title text-red-400" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "prompt-desc" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "prompt-actions" }));
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleLogoutConfirm) }, { class: "btn-primary logout-btn" }));
        // @ts-ignore
        [handleLogoutConfirm,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleCancel) }, { class: "btn-secondary" }));
        // @ts-ignore
        [handleCancel,];
    }
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['prompt-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-card']} */ ;
/** @type {__VLS_StyleScopedClasses['meteors-container']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-content']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-title']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-text']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['prompt-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['logout-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
