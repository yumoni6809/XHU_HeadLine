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
var utils_1 = require("@/lib/utils");
var core_1 = require("@vueuse/core");
var vue_1 = require("vue");
defineOptions({
    inheritAttrs: false,
});
var props = defineProps();
var emits = defineEmits();
var modelValue = (0, core_1.useVModel)(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
var inputContainerRef = (0, vue_1.ref)(null);
var mouse = (0, vue_1.ref)({ x: 0, y: 0 });
var radius = 100;
var visible = (0, vue_1.ref)(false);
var containerBg = (0, vue_1.computed)(function () {
    return "\n        radial-gradient(\n          ".concat(visible.value ? radius + "px" : "0px", " circle at ").concat(mouse.value.x, "px ").concat(mouse.value.y, "px,\n          var(--blue-500),\n          transparent 80%\n        )\n      ");
});
function handleMouseMove(_a) {
    var clientX = _a.clientX, clientY = _a.clientY;
    if (!inputContainerRef.value)
        return;
    var _b = inputContainerRef.value.getBoundingClientRect(), left = _b.left, top = _b.top;
    mouse.value = { x: clientX - left, y: clientY - top };
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign(__assign(__assign(__assign({ onMouseenter: (function () { return (__VLS_ctx.visible = true); }) }, { onMouseleave: (function () { return (__VLS_ctx.visible = false); }) }), { onMousemove: (__VLS_ctx.handleMouseMove) }), { ref: "inputContainerRef" }), { class: (__VLS_ctx.cn('group/input rounded-lg p-[2px] transition duration-300', props.containerClass)) }), { style: ({
        background: __VLS_ctx.containerBg,
    }) }));
/** @type {typeof __VLS_ctx.inputContainerRef} */ ;
// @ts-ignore
[visible, visible, handleMouseMove, utils_1.cn, containerBg, inputContainerRef,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign({ class: (__VLS_ctx.cn("flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent\n          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600\n          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600\n           disabled:cursor-not-allowed disabled:opacity-50\n           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]\n           group-hover/input:shadow-none transition duration-400", props.class)) }));
(__VLS_ctx.modelValue);
// @ts-ignore
[utils_1.cn, modelValue,];
[__VLS_dollars.$attrs,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
exports.default = {};
