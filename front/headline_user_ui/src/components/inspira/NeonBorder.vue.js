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
var utils_1 = require("@/lib/utils");
var props = withDefaults(defineProps(), {
    color1: "#0496ff",
    color2: "#ff0a54",
    duration: 6,
    animationType: "half",
});
var durationInSeconds = (0, vue_1.computed)(function () { return "".concat(props.duration, "s"); });
var animWidth = (0, vue_1.computed)(function () { return "".concat(getWidth(props.animationType), "%"); });
var colorType1 = (0, vue_1.computed)(function () { return props.color1; });
var colorType2 = (0, vue_1.computed)(function () { return props.color2; });
function getWidth(animationType) {
    switch (animationType) {
        case "none":
            return 12;
        case "half":
            return 50;
        case "full":
            return 100;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaults = {
    color1: "#0496ff",
    color2: "#ff0a54",
    duration: 6,
    animationType: "half",
};
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['neon-border-one']} */ ;
/** @type {__VLS_StyleScopedClasses['neon-border-two']} */ ;
(__VLS_ctx.colorType1);
(__VLS_ctx.animWidth);
(__VLS_ctx.colorType1);
(__VLS_ctx.colorType1);
(__VLS_ctx.colorType2);
(__VLS_ctx.animWidth);
(__VLS_ctx.colorType2);
(__VLS_ctx.colorType2);
(__VLS_ctx.durationInSeconds);
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn('relative inline-block h-10 w-full max-w-sm overflow-hidden rounded-lg p-px z-10', props.class)) }));
// @ts-ignore
[utils_1.cn,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn('neon-border-one rounded-lg', __VLS_ctx.animationType != 'none' ? 'animate-border' : '')) }));
// @ts-ignore
[utils_1.cn, animationType,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn('neon-border-two rounded-lg', __VLS_ctx.animationType != 'none' ? 'animate-border' : '')) }));
// @ts-ignore
[utils_1.cn, animationType,];
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_base = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
    props: {},
});
var __VLS_export = {};
exports.default = {};
