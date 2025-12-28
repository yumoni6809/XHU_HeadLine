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
var utils_1 = require("@/lib/utils");
var vue_1 = require("@number-flow/vue");
var core_1 = require("@vueuse/core");
var motion_v_1 = require("motion-v");
var vue_2 = require("vue");
var props = withDefaults(defineProps(), {
    class: "",
    title: "Progress",
    height: 44,
});
var open = (0, vue_2.ref)(false);
var slots = (0, vue_2.useSlots)();
var scrollPercentage = (0, vue_2.ref)(0);
var isDark = (0, vue_2.computed)(function () { return (0, core_1.useColorMode)().value == "dark"; });
var isSlotAvailable = (0, vue_2.computed)(function () { return !!slots.default; });
var borderRadius = (0, vue_2.computed)(function () { return "".concat(props.height / 2, "px"); });
(0, vue_2.onMounted)(function () {
    if (window === undefined)
        return;
    window.addEventListener("scroll", updatePageScroll);
    updatePageScroll();
});
function updatePageScroll() {
    scrollPercentage.value = window.scrollY / (document.body.scrollHeight - window.innerHeight);
}
(0, vue_2.onUnmounted)(function () {
    window.removeEventListener("scroll", updatePageScroll);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaults = {
    class: "",
    title: "Progress",
    height: 44,
};
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
(__VLS_ctx.borderRadius);
var __VLS_0 = {}.MotionConfig;
/** @type {[typeof __VLS_components.MotionConfig, typeof __VLS_components.MotionConfig, ]} */ ;
// @ts-ignore
motion_v_1.MotionConfig;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    transition: ({
        duration: 0.7,
        type: 'spring',
        bounce: 0.5,
    }),
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        transition: ({
            duration: 0.7,
            type: 'spring',
            bounce: 0.5,
        }),
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (function () { return (__VLS_ctx.open = !__VLS_ctx.open); }) }, { class: (__VLS_ctx.cn('fixed left-1/2 top-12 z-[999] -translate-x-1/2 bg-primary/90 backdrop-blur-lg border-radius', __VLS_ctx.$props.class)) }));
// @ts-ignore
[open, open, utils_1.cn, $props,];
var __VLS_6 = ((__VLS_ctx.motion.div), (__VLS_ctx.motion.div));
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ id: "motion-id", layout: true, initial: ({
        height: props.height,
        width: 0,
    }), animate: ({
        height: __VLS_ctx.open && __VLS_ctx.isSlotAvailable ? 'auto' : props.height,
        width: __VLS_ctx.open && __VLS_ctx.isSlotAvailable ? 320 : 260,
    }) }, { class: "bg-natural-900 relative cursor-pointer overflow-hidden text-secondary" })));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ id: "motion-id", layout: true, initial: ({
            height: props.height,
            width: 0,
        }), animate: ({
            height: __VLS_ctx.open && __VLS_ctx.isSlotAvailable ? 'auto' : props.height,
            width: __VLS_ctx.open && __VLS_ctx.isSlotAvailable ? 320 : 260,
        }) }, { class: "bg-natural-900 relative cursor-pointer overflow-hidden text-secondary" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
var __VLS_10 = __VLS_9.slots.default;
// @ts-ignore
[open, open, motion_v_1.motion, motion_v_1.motion, isSlotAvailable, isSlotAvailable,];
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)(__assign({ class: "gray- flex h-11 cursor-pointer items-center gap-2 px-4" }));
var __VLS_11 = {}.AnimatedCircularProgressBar;
/** @type {[typeof __VLS_components.AnimatedCircularProgressBar, ]} */ ;
// @ts-ignore
AnimatedCircularProgressBar;
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(__assign(__assign({ value: (__VLS_ctx.scrollPercentage * 100), min: (0), max: (100), circleStrokeWidth: (10) }, { class: "w-6" }), { showPercentage: (false), duration: (0.3), gaugeSecondaryColor: (__VLS_ctx.isDark ? '#6b728055' : '#6b728099'), gaugePrimaryColor: (__VLS_ctx.isDark ? 'black' : 'white') })));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([__assign(__assign({ value: (__VLS_ctx.scrollPercentage * 100), min: (0), max: (100), circleStrokeWidth: (10) }, { class: "w-6" }), { showPercentage: (false), duration: (0.3), gaugeSecondaryColor: (__VLS_ctx.isDark ? '#6b728055' : '#6b728099'), gaugePrimaryColor: (__VLS_ctx.isDark ? 'black' : 'white') })], __VLS_functionalComponentArgsRest(__VLS_12), false));
// @ts-ignore
[scrollPercentage, isDark, isDark,];
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "grow text-center font-bold" }));
(__VLS_ctx.title);
// @ts-ignore
[title,];
var __VLS_16 = {}.NumberFlow;
/** @type {[typeof __VLS_components.NumberFlow, ]} */ ;
// @ts-ignore
vue_1.default;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    value: (__VLS_ctx.scrollPercentage),
    format: ({ style: 'percent' }),
    locales: "en-US",
}));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
        value: (__VLS_ctx.scrollPercentage),
        format: ({ style: 'percent' }),
        locales: "en-US",
    }], __VLS_functionalComponentArgsRest(__VLS_17), false));
// @ts-ignore
[scrollPercentage,];
if (__VLS_ctx.isSlotAvailable) {
    // @ts-ignore
    [isSlotAvailable,];
    var __VLS_21 = ((__VLS_ctx.motion.div), (__VLS_ctx.motion.div));
    // @ts-ignore
    var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(__assign({ class: "mb-2 flex h-full max-h-60 flex-col gap-1 overflow-y-auto px-4 text-sm" })));
    var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([__assign({ class: "mb-2 flex h-full max-h-60 flex-col gap-1 overflow-y-auto px-4 text-sm" })], __VLS_functionalComponentArgsRest(__VLS_22), false));
    var __VLS_25 = __VLS_24.slots.default;
    // @ts-ignore
    [motion_v_1.motion, motion_v_1.motion,];
    var __VLS_26 = {};
    var __VLS_24;
}
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['bg-natural-900']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['gray-']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-60']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
// @ts-ignore
var __VLS_27 = __VLS_26;
var __VLS_base = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
    props: {},
});
var __VLS_export = {};
exports.default = {};
