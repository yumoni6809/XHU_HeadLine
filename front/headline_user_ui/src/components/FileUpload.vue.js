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
var motion_v_1 = require("motion-v");
var vue_1 = require("vue");
var __VLS_props = defineProps();
var emit = defineEmits();
var fileInputRef = (0, vue_1.ref)(null);
var files = (0, vue_1.ref)([]);
var isActive = (0, vue_1.ref)(false);
function handleFileChange(newFiles) {
    files.value = __spreadArray(__spreadArray([], files.value, true), newFiles, true);
    emit("onChange", files.value);
}
function onFileChange(e) {
    var input = e.target;
    if (!input.files)
        return;
    handleFileChange(Array.from(input.files));
}
function handleClick() {
    var _a;
    (_a = fileInputRef.value) === null || _a === void 0 ? void 0 : _a.click();
}
function handleEnter() {
    isActive.value = true;
}
function handleLeave() {
    isActive.value = false;
}
function handleDrop(e) {
    var _a;
    isActive.value = false;
    var droppedFiles = ((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) ? Array.from(e.dataTransfer.files) : [];
    if (droppedFiles.length)
        handleFileChange(droppedFiles);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.ClientOnly;
/** @type {[typeof __VLS_components.ClientOnly, typeof __VLS_components.ClientOnly, ]} */ ;
// @ts-ignore
ClientOnly;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = {};
var __VLS_5 = __VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign(__assign(__assign(__assign(__assign({ onDragover: (__VLS_ctx.handleEnter) }, { onDragleave: (__VLS_ctx.handleLeave) }), { onDrop: (__VLS_ctx.handleDrop) }), { onMouseover: (__VLS_ctx.handleEnter) }), { onMouseleave: (__VLS_ctx.handleLeave) }), { class: (__VLS_ctx.cn('w-full', __VLS_ctx.$props.class)) }));
// @ts-ignore
[handleEnter, handleEnter, handleLeave, handleLeave, handleDrop, utils_1.cn, $props,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ onClick: (__VLS_ctx.handleClick) }, { class: "group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10" }));
// @ts-ignore
[handleClick,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign(__assign({ onChange: (__VLS_ctx.onFileChange) }, { ref: "fileInputRef", type: "file" }), { class: "hidden" }));
/** @type {typeof __VLS_ctx.fileInputRef} */ ;
// @ts-ignore
[onFileChange, fileInputRef,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" }));
var __VLS_6 = {};
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex flex-col items-center justify-center" }));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300" }));
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "relative mx-auto mt-10 w-full max-w-xl space-y-4" }));
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.files)); _i < _a.length; _i++) {
    var _b = _a[_i], file = _b[0], idx = _b[1];
    // @ts-ignore
    [files,];
    var __VLS_8 = {}.Motion;
    /** @type {[typeof __VLS_components.Motion, typeof __VLS_components.Motion, ]} */ ;
    // @ts-ignore
    motion_v_1.Motion;
    // @ts-ignore
    var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ key: ("file-".concat(idx)), initial: ({ opacity: 0, scaleX: 0 }), animate: ({ opacity: 1, scaleX: 1 }) }, { class: "relative z-40 mx-auto flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 shadow-sm md:h-24 dark:bg-neutral-900" })));
    var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ key: ("file-".concat(idx)), initial: ({ opacity: 0, scaleX: 0 }), animate: ({ opacity: 1, scaleX: 1 }) }, { class: "relative z-40 mx-auto flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 shadow-sm md:h-24 dark:bg-neutral-900" })], __VLS_functionalComponentArgsRest(__VLS_9), false));
    var __VLS_12 = __VLS_11.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex w-full items-center justify-between gap-4" }));
    var __VLS_13 = {}.Motion;
    /** @type {[typeof __VLS_components.Motion, typeof __VLS_components.Motion, ]} */ ;
    // @ts-ignore
    motion_v_1.Motion;
    // @ts-ignore
    var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13(__assign({ as: "p", initial: ({ opacity: 0 }), animate: ({ opacity: 1 }) }, { class: "max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300" })));
    var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([__assign({ as: "p", initial: ({ opacity: 0 }), animate: ({ opacity: 1 }) }, { class: "max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300" })], __VLS_functionalComponentArgsRest(__VLS_14), false));
    var __VLS_17 = __VLS_16.slots.default;
    (file.name);
    var __VLS_16;
    var __VLS_18 = {}.Motion;
    /** @type {[typeof __VLS_components.Motion, typeof __VLS_components.Motion, ]} */ ;
    // @ts-ignore
    motion_v_1.Motion;
    // @ts-ignore
    var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18(__assign({ as: "p", initial: ({ opacity: 0 }), animate: ({ opacity: 1 }) }, { class: "w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 shadow-input dark:bg-neutral-800 dark:text-white" })));
    var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([__assign({ as: "p", initial: ({ opacity: 0 }), animate: ({ opacity: 1 }) }, { class: "w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 shadow-input dark:bg-neutral-800 dark:text-white" })], __VLS_functionalComponentArgsRest(__VLS_19), false));
    var __VLS_22 = __VLS_21.slots.default;
    ((file.size / (1024 * 1024)).toFixed(2));
    var __VLS_21;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400" }));
    var __VLS_23 = {}.Motion;
    /** @type {[typeof __VLS_components.Motion, typeof __VLS_components.Motion, ]} */ ;
    // @ts-ignore
    motion_v_1.Motion;
    // @ts-ignore
    var __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23(__assign({ as: "p", initial: ({ opacity: 0 }), animate: ({ opacity: 1 }) }, { class: "rounded-md bg-gray-100 px-1.5 py-1 text-sm dark:bg-neutral-800" })));
    var __VLS_25 = __VLS_24.apply(void 0, __spreadArray([__assign({ as: "p", initial: ({ opacity: 0 }), animate: ({ opacity: 1 }) }, { class: "rounded-md bg-gray-100 px-1.5 py-1 text-sm dark:bg-neutral-800" })], __VLS_functionalComponentArgsRest(__VLS_24), false));
    var __VLS_27 = __VLS_26.slots.default;
    (file.type || "unknown type");
    var __VLS_26;
    var __VLS_28 = {}.Motion;
    /** @type {[typeof __VLS_components.Motion, typeof __VLS_components.Motion, ]} */ ;
    // @ts-ignore
    motion_v_1.Motion;
    // @ts-ignore
    var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        as: "p",
        initial: ({ opacity: 0 }),
        animate: ({ opacity: 1 }),
    }));
    var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{
            as: "p",
            initial: ({ opacity: 0 }),
            animate: ({ opacity: 1 }),
        }], __VLS_functionalComponentArgsRest(__VLS_29), false));
    var __VLS_32 = __VLS_31.slots.default;
    (new Date(file.lastModified).toLocaleDateString());
    var __VLS_31;
    var __VLS_11;
}
if (!__VLS_ctx.files.length) {
    // @ts-ignore
    [files,];
    var __VLS_33 = {}.Motion;
    /** @type {[typeof __VLS_components.Motion, typeof __VLS_components.Motion, ]} */ ;
    // @ts-ignore
    motion_v_1.Motion;
    // @ts-ignore
    var __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33(__assign(__assign({ as: "div" }, { class: "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl dark:bg-neutral-900" }), { initial: ({
            x: 0,
            y: 0,
            opacity: 1,
        }), transition: ({
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }), animate: (__VLS_ctx.isActive
            ? {
                x: 20,
                y: -20,
                opacity: 0.9,
            }
            : {}) })));
    var __VLS_35 = __VLS_34.apply(void 0, __spreadArray([__assign(__assign({ as: "div" }, { class: "relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl dark:bg-neutral-900" }), { initial: ({
                x: 0,
                y: 0,
                opacity: 1,
            }), transition: ({
                type: 'spring',
                stiffness: 300,
                damping: 20,
            }), animate: (__VLS_ctx.isActive
                ? {
                    x: 20,
                    y: -20,
                    opacity: 0.9,
                }
                : {}) })], __VLS_functionalComponentArgsRest(__VLS_34), false));
    var __VLS_37 = __VLS_36.slots.default;
    // @ts-ignore
    [isActive,];
    var __VLS_38 = {}.Icon;
    /** @type {[typeof __VLS_components.Icon, ]} */ ;
    // @ts-ignore
    Icon;
    // @ts-ignore
    var __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38(__assign(__assign({ name: "heroicons:arrow-up-tray-20-solid" }, { class: "text-neutral-600 dark:text-neutral-400" }), { size: "20" })));
    var __VLS_40 = __VLS_39.apply(void 0, __spreadArray([__assign(__assign({ name: "heroicons:arrow-up-tray-20-solid" }, { class: "text-neutral-600 dark:text-neutral-400" }), { size: "20" })], __VLS_functionalComponentArgsRest(__VLS_39), false));
    var __VLS_36;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent transition-opacity" }, { class: ({ 'opacity-100': __VLS_ctx.isActive, 'opacity-0': !__VLS_ctx.isActive }) }));
    // @ts-ignore
    [isActive, isActive,];
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['group/file']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-10']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['[mask-image:radial-gradient(ellipse_at_center,white,transparent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-40']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['md:h-24']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-700']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-300']} */ ;
/** @type {__VLS_StyleScopedClasses['w-fit']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-input']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-40']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0px_10px_50px_rgba(0,0,0,0.1)]']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover/file:shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-neutral-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-600']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-neutral-400']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-30']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-dashed']} */ ;
/** @type {__VLS_StyleScopedClasses['border-sky-400']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6;
var __VLS_base = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
var __VLS_export = {};
exports.default = {};
