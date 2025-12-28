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
var vue_1 = require("vue");
var core_1 = require("@vueuse/core");
var vanishingText = defineModel({
    default: '',
});
var emit = defineEmits(['submit', 'change']);
var canvasRef = (0, core_1.templateRef)('canvasRef');
var inputRef = (0, core_1.templateRef)('inputRef');
// normal refs
var currentPlaceholder = (0, vue_1.ref)(0);
var animating = (0, vue_1.ref)(false);
var intervalRef = (0, vue_1.ref)(null);
var newDataRef = (0, vue_1.ref)([]);
var animationFrame = (0, vue_1.ref)(null);
var props = withDefaults(defineProps(), {
    placeholders: function () { return ['Placeholder 1', 'Placeholder 2', 'Placeholder 3']; },
});
// Focus on input when mounted
(0, vue_1.onMounted)(function () {
    if (!inputRef.value)
        return;
    inputRef.value.focus();
});
function changePlaceholder() {
    intervalRef.value = window.setInterval(function () {
        currentPlaceholder.value = (currentPlaceholder.value + 1) % props.placeholders.length;
    }, 3000);
}
function handleVisibilityChange() {
    if (document.visibilityState !== 'visible' && intervalRef.value) {
        clearInterval(intervalRef.value);
        intervalRef.value = null;
    }
    else if (document.visibilityState === 'visible') {
        changePlaceholder();
    }
}
function draw() {
    if (!inputRef.value || !canvasRef.value)
        return;
    var canvas = canvasRef.value;
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    var computedStyles = getComputedStyle(inputRef.value);
    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    var fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
    ctx.font = "".concat(fontSize * 2, "px ").concat(computedStyles.fontFamily);
    ctx.fillStyle = '#FFF';
    ctx.fillText(vanishingText.value, 16, 40);
    var imageData = ctx.getImageData(0, 0, 800, 800);
    var pixelData = imageData.data;
    var newData = [];
    for (var t = 0; t < 800; t++) {
        var i = 4 * t * 800;
        for (var n = 0; n < 800; n++) {
            var e = i + 4 * n;
            if (pixelData[e] !== 0 && pixelData[e + 1] !== 0 && pixelData[e + 2] !== 0) {
                newData.push({
                    x: n,
                    y: t,
                    color: "rgba(".concat(pixelData[e], ", ").concat(pixelData[e + 1], ", ").concat(pixelData[e + 2], ", ").concat(pixelData[e + 3], ")"),
                });
            }
        }
    }
    newDataRef.value = newData.map(function (_a) {
        var x = _a.x, y = _a.y, color = _a.color;
        return ({ x: x, y: y, r: 1, color: color });
    });
}
function animate(start) {
    if (start === void 0) { start = 0; }
    animationFrame.value = requestAnimationFrame(function () {
        var _a;
        var newArr = [];
        for (var _i = 0, _b = newDataRef.value; _i < _b.length; _i++) {
            var current = _b[_i];
            if (current.x < start) {
                newArr.push(current);
            }
            else {
                if (current.r <= 0) {
                    current.r = 0;
                    continue;
                }
                current.x += Math.random() > 0.5 ? 1 : -1;
                current.y += Math.random() > 0.5 ? 1 : -1;
                current.r -= 0.05 * Math.random();
                newArr.push(current);
            }
        }
        newDataRef.value = newArr;
        var ctx = (_a = canvasRef.value) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        if (ctx) {
            ctx.clearRect(start, 0, 800, 800);
            newDataRef.value.forEach(function (_a) {
                var x = _a.x, y = _a.y, r = _a.r, color = _a.color;
                if (x > start) {
                    ctx.beginPath();
                    ctx.rect(x, y, r, r);
                    ctx.fillStyle = color;
                    ctx.strokeStyle = color;
                    ctx.stroke();
                }
            });
        }
        if (newDataRef.value.length > 0) {
            animate(start - 8);
        }
        else {
            vanishingText.value = '';
            animating.value = false;
            setTimeout(function () {
                // regain focus after animation
                inputRef.value.focus();
            }, 100);
        }
    });
}
function handleKeyDown(e) {
    if (vanishingText.value === '')
        return;
    if (e.key === 'Enter' && !animating.value) {
        vanishAndSubmit();
    }
}
function vanishAndSubmit() {
    animating.value = true;
    draw();
    if (vanishingText.value) {
        var maxX = Math.max.apply(Math, newDataRef.value.map(function (_a) {
            var x = _a.x;
            return x;
        }));
        animate(maxX);
        emit('submit', vanishingText.value);
    }
}
function handleSubmit() {
    vanishAndSubmit();
}
// Watch for value changes
(0, vue_1.watch)(vanishingText, function (newVal) {
    if (!animating.value) {
        emit('change', { target: { value: newVal } });
    }
});
(0, vue_1.onMounted)(function () {
    changePlaceholder();
    document.addEventListener('visibilitychange', handleVisibilityChange);
});
(0, vue_1.onBeforeUnmount)(function () {
    if (intervalRef.value) {
        clearInterval(intervalRef.value);
    }
    if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value);
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaultModels = {
    'modelValue': '',
};
var __VLS_modelEmit = defineEmits();
var __VLS_defaults = {
    placeholders: function () { return ['Placeholder 1', 'Placeholder 2', 'Placeholder 3']; },
};
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)(__assign({ onSubmit: (__VLS_ctx.handleSubmit) }, { class: ([
        'relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 dark:bg-zinc-800',
        __VLS_ctx.vanishingText && 'bg-gray-50',
    ]) }));
// @ts-ignore
[handleSubmit, vanishingText,];
__VLS_asFunctionalElement(__VLS_intrinsics.canvas)(__assign({ ref: "canvasRef" }, { class: ([
        'pointer-events-none absolute left-2 top-[20%] origin-top-left scale-50 pr-20 text-base invert sm:left-8 dark:invert-0',
        __VLS_ctx.animating ? 'opacity-100' : 'opacity-0',
    ]) }));
/** @type {typeof __VLS_ctx.canvasRef} */ ;
// @ts-ignore
[animating, canvasRef,];
__VLS_asFunctionalElement(__VLS_intrinsics.input)(__assign(__assign(__assign({ onKeydown: (__VLS_ctx.handleKeyDown) }, { ref: "inputRef", value: (__VLS_ctx.vanishingText), disabled: (__VLS_ctx.animating), type: "text" }), { class: "relative z-50 size-full rounded-full border-none bg-transparent pl-4 pr-20 text-sm text-black focus:outline-none focus:ring-0 sm:pl-10 sm:text-base dark:text-white" }), { class: ({ 'text-transparent dark:text-transparent': __VLS_ctx.animating }) }));
/** @type {typeof __VLS_ctx.inputRef} */ ;
// @ts-ignore
[vanishingText, animating, animating, handleKeyDown, inputRef,];
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ disabled: (!__VLS_ctx.vanishingText), type: "submit" }, { class: "absolute right-2 top-1/2 z-50 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black transition duration-200 disabled:bg-gray-100 dark:bg-zinc-900 dark:disabled:bg-zinc-700" }));
// @ts-ignore
[vanishingText,];
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", 'stroke-width': "2", 'stroke-linecap': "round", 'stroke-linejoin': "round" }, { class: "size-4 text-gray-300" }));
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    stroke: "none",
    d: "M0 0h24v24H0z",
    fill: "none",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)(__assign({ d: "M5 12l14 0" }, { style: ({
        strokeDasharray: '50%',
        strokeDashoffset: __VLS_ctx.vanishingText ? '0' : '50%',
        transition: 'stroke-dashoffset 0.3s linear',
    }) }));
// @ts-ignore
[vanishingText,];
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M13 18l6 -6",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M13 6l6 6",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "pointer-events-none absolute inset-0 flex items-center rounded-full" }));
var __VLS_0 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    mode: "out-in",
    enterActiveClass: "transition duration-300 ease-out",
    leaveActiveClass: "transition duration-300 ease-in",
    enterFromClass: "opacity-0 translate-y-4",
    enterToClass: "opacity-100 translate-y-0",
    leaveFromClass: "opacity-100 translate-y-0",
    leaveToClass: "opacity-0 -translate-y-4",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        mode: "out-in",
        enterActiveClass: "transition duration-300 ease-out",
        leaveActiveClass: "transition duration-300 ease-in",
        enterFromClass: "opacity-0 translate-y-4",
        enterToClass: "opacity-100 translate-y-0",
        leaveFromClass: "opacity-100 translate-y-0",
        leaveToClass: "opacity-0 -translate-y-4",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (!__VLS_ctx.vanishingText) }), null, null);
var __VLS_4 = __VLS_3.slots.default;
// @ts-ignore
[vanishingText,];
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ key: (__VLS_ctx.currentPlaceholder) }, { class: "w-[calc(100%-2rem)] truncate pl-4 text-left text-sm font-normal text-neutral-500 sm:pl-10 sm:text-base dark:text-zinc-500" }));
// @ts-ignore
[currentPlaceholder,];
(__VLS_ctx.placeholders[__VLS_ctx.currentPlaceholder]);
// @ts-ignore
[currentPlaceholder, placeholders,];
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-zinc-800']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-[20%]']} */ ;
/** @type {__VLS_StyleScopedClasses['origin-top-left']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-50']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['invert']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:left-8']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:invert-0']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['size-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-0']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-2']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['size-8']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-zinc-900']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:disabled:bg-zinc-700']} */ ;
/** @type {__VLS_StyleScopedClasses['size-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[calc(100%-2rem)]']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-neutral-500']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-zinc-500']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    emits: __assign(__assign({}, {}), {}),
    __typeProps: {},
    props: {},
});
exports.default = {};
