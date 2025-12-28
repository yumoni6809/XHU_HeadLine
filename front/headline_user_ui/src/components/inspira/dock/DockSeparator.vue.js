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
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var injectionKeys_1 = require("./injectionKeys");
var utils_1 = require("@/lib/utils");
var orientation = (0, vue_1.inject)(injectionKeys_1.ORIENTATION_INJECTION_KEY, 'horizontal');
var separatorClass = (0, vue_1.computed)(function () {
    return orientation === 'horizontal'
        ? 'w-px h-8'
        : 'h-px w-8';
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex items-center justify-center" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn(__VLS_ctx.separatorClass, 'bg-black/10 dark:bg-white/20 rounded-full')) }));
// @ts-ignore
[utils_1.cn, separatorClass,];
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
