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
var injectionKeys_1 = require("./injectionKeys");
var props = withDefaults(defineProps(), {
    magnification: 60,
    distance: 140,
    direction: 'middle',
    orientation: 'horizontal',
});
var dockRef = (0, vue_1.ref)(null);
var mouseX = (0, vue_1.ref)(Infinity);
var mouseY = (0, vue_1.ref)(Infinity);
var magnification = (0, vue_1.computed)(function () { return props.magnification; });
var distance = (0, vue_1.computed)(function () { return props.distance; });
var dockClass = (0, vue_1.computed)(function () { return ({
    'items-start': props.direction === 'top',
    'items-center': props.direction === 'middle',
    'items-end': props.direction === 'bottom',
}); });
function onMouseMove(e) {
    requestAnimationFrame(function () {
        mouseX.value = e.pageX;
        mouseY.value = e.pageY;
    });
}
function onMouseLeave() {
    requestAnimationFrame(function () {
        mouseX.value = Infinity;
        mouseY.value = Infinity;
    });
}
(0, vue_1.provide)(injectionKeys_1.MOUSE_X_INJECTION_KEY, mouseX);
(0, vue_1.provide)(injectionKeys_1.MOUSE_Y_INJECTION_KEY, mouseY);
(0, vue_1.provide)(injectionKeys_1.ORIENTATION_INJECTION_KEY, props.orientation);
(0, vue_1.provide)(injectionKeys_1.MAGNIFICATION_INJECTION_KEY, magnification);
(0, vue_1.provide)(injectionKeys_1.DISTANCE_INJECTION_KEY, distance);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaults = {
    magnification: 60,
    distance: 140,
    direction: 'middle',
    orientation: 'horizontal',
};
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign(__assign({ onMousemove: (__VLS_ctx.onMouseMove) }, { onMouseleave: (__VLS_ctx.onMouseLeave) }), { ref: "dockRef" }), { class: (__VLS_ctx.cn(
    // 更透明的毛玻璃悬浮条
    'mx-auto flex h-[64px] w-max gap-4 rounded-3xl border border-white/20', 'bg-white/18 dark:bg-black/18', // 比之前更透明一点
    'backdrop-blur-xl backdrop-saturate-150', 'shadow-[0_16px_35px_rgba(15,23,42,0.35)]', 'px-4 py-2', 'transition-all duration-300 ease-out', __VLS_ctx.orientation === 'vertical' && 'flex-col w-[64px] h-max', props.class, __VLS_ctx.dockClass)) }));
/** @type {typeof __VLS_ctx.dockRef} */ ;
// @ts-ignore
[onMouseMove, onMouseLeave, utils_1.cn, orientation, dockClass, dockRef,];
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_base = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
    props: {},
});
var __VLS_export = {};
exports.default = {};
