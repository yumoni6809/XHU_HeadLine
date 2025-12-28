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
var props = withDefaults(defineProps(), {
    loading: false,
    defaultDuration: 1500,
    preventClose: false,
});
var emit = defineEmits();
var currentState = (0, vue_1.ref)(0);
var stepStartTime = (0, vue_1.ref)(Date.now());
var isLastStepComplete = (0, vue_1.ref)(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var currentTimer = null;
function executeStepAction(step) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof step.action === "function")) return [3 /*break*/, 2];
                    return [4 /*yield*/, step.action()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function proceedToNextStep() {
    return __awaiter(this, void 0, void 0, function () {
        var currentStep;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentStep = props.steps[currentState.value];
                    if (!currentStep)
                        return [2 /*return*/];
                    // Execute the current step's action
                    return [4 /*yield*/, executeStepAction(currentStep)];
                case 1:
                    // Execute the current step's action
                    _a.sent();
                    if (currentState.value < props.steps.length - 1) {
                        currentState.value++;
                        stepStartTime.value = Date.now();
                        emit("state-change", currentState.value);
                        processCurrentStep();
                    }
                    else {
                        isLastStepComplete.value = true;
                        emit("complete");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function processCurrentStep() {
    return __awaiter(this, void 0, void 0, function () {
        var currentStep, duration;
        return __generator(this, function (_a) {
            if (currentTimer) {
                clearTimeout(currentTimer);
            }
            currentStep = props.steps[currentState.value];
            if (!currentStep)
                return [2 /*return*/];
            duration = currentStep.duration || props.defaultDuration;
            if (!currentStep.async) {
                currentTimer = setTimeout(function () {
                    proceedToNextStep();
                }, duration);
            }
            return [2 /*return*/];
        });
    });
}
function close() {
    emit("close");
}
// Watch for changes in the async property
(0, vue_1.watch)(function () { var _a; return (_a = props.steps[currentState.value]) === null || _a === void 0 ? void 0 : _a.async; }, function (isAsync, oldIsAsync) { return __awaiter(void 0, void 0, void 0, function () {
    var currentStep, duration;
    return __generator(this, function (_a) {
        // Only proceed if changing from async to non-async
        if (isAsync === false && oldIsAsync === true) {
            currentStep = props.steps[currentState.value];
            if (!currentStep)
                return [2 /*return*/];
            duration = currentStep.duration || props.defaultDuration;
            currentTimer = setTimeout(function () {
                proceedToNextStep();
            }, duration);
        }
        return [2 /*return*/];
    });
}); });
(0, vue_1.watch)(function () { return props.loading; }, function (newLoading) {
    if (newLoading) {
        currentState.value = 0;
        stepStartTime.value = Date.now();
        isLastStepComplete.value = false;
        processCurrentStep();
    }
    else if (currentTimer) {
        clearTimeout(currentTimer);
    }
});
(0, vue_1.onUnmounted)(function () {
    if (currentTimer) {
        clearTimeout(currentTimer);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaults = {
    loading: false,
    defaultDuration: 1500,
    preventClose: false,
};
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
var __VLS_0 = {}.Transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    enterActiveClass: "transition-opacity duration-300",
    enterFromClass: "opacity-0",
    enterToClass: "opacity-100",
    leaveActiveClass: "transition-opacity duration-300",
    leaveFromClass: "opacity-100",
    leaveToClass: "opacity-0",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        enterActiveClass: "transition-opacity duration-300",
        enterFromClass: "opacity-0",
        enterToClass: "opacity-100",
        leaveActiveClass: "transition-opacity duration-300",
        leaveFromClass: "opacity-100",
        leaveToClass: "opacity-0",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4 = __VLS_3.slots.default;
if (__VLS_ctx.loading && __VLS_ctx.steps.length > 0) {
    // @ts-ignore
    [loading, steps,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "fixed inset-0 z-[100] flex size-full items-center justify-center backdrop-blur-2xl" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.close) }, { class: "absolute right-4 top-4 z-[101] inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" }), { size: "sm" }));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (!__VLS_ctx.preventClose) }), null, null);
    // @ts-ignore
    [close, preventClose,];
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", 'stroke-width': "1.5", stroke: "currentColor" }, { class: "size-6" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        d: "M6 18 18 6M6 6l12 12",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "relative h-96" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "relative mx-auto mt-40 flex max-w-xl flex-col justify-start" }));
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.steps)); _i < _a.length; _i++) {
        var _b = _a[_i], step = _b[0], index = _b[1];
        // @ts-ignore
        [steps,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (index),
        });
        if (step) {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "mb-4 flex items-center gap-2 text-left transition-all duration-300 ease-in-out" }, { style: ({
                    opacity: index === __VLS_ctx.currentState
                        ? 1
                        : Math.max(1 - Math.abs(index - __VLS_ctx.currentState) * 0.2, 0),
                    transform: "translateY(".concat(index === __VLS_ctx.currentState ? -(__VLS_ctx.currentState * 40) : -(__VLS_ctx.currentState * 40), "px)"),
                }) }));
            // @ts-ignore
            [currentState, currentState, currentState, currentState, currentState,];
            if (index < __VLS_ctx.currentState ||
                (index === __VLS_ctx.steps.length - 1 && index === __VLS_ctx.currentState && __VLS_ctx.isLastStepComplete)) {
                // @ts-ignore
                [steps, currentState, currentState, isLastStepComplete,];
                __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, { class: "size-6 text-primary" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.path)({
                    'fill-rule': "evenodd",
                    d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
                    'clip-rule': "evenodd",
                });
            }
            else if (index === __VLS_ctx.currentState && (!__VLS_ctx.isLastStepComplete || index !== __VLS_ctx.steps.length - 1)) {
                // @ts-ignore
                [steps, currentState, isLastStepComplete,];
                __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" }, { class: "size-6 animate-spin text-primary" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.path)({
                    'fill-rule': "evenodd",
                    d: "M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z",
                    'clip-rule': "evenodd",
                });
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", 'stroke-width': "1.5", stroke: "currentColor" }, { class: "size-6 text-black opacity-50 dark:text-white" }));
                __VLS_asFunctionalElement(__VLS_intrinsics.path)({
                    'stroke-linecap': "round",
                    'stroke-linejoin': "round",
                    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                });
            }
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex flex-col" }));
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: ([
                    'text-lg text-black dark:text-white',
                    index > __VLS_ctx.currentState && 'opacity-50',
                ]) }));
            // @ts-ignore
            [currentState,];
            (step.text);
            var __VLS_5 = {}.Transition;
            /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
            // @ts-ignore
            Transition;
            // @ts-ignore
            var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
                enterActiveClass: "transition-all duration-300",
                enterFromClass: "opacity-0 -translate-y-1",
                enterToClass: "opacity-100 translate-y-0",
            }));
            var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
                    enterActiveClass: "transition-all duration-300",
                    enterFromClass: "opacity-0 -translate-y-1",
                    enterToClass: "opacity-100 translate-y-0",
                }], __VLS_functionalComponentArgsRest(__VLS_6), false));
            var __VLS_9 = __VLS_8.slots.default;
            if (step.afterText &&
                (index < __VLS_ctx.currentState ||
                    (index === __VLS_ctx.steps.length - 1 &&
                        index === __VLS_ctx.currentState &&
                        __VLS_ctx.isLastStepComplete))) {
                // @ts-ignore
                [steps, currentState, currentState, isLastStepComplete,];
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "mt-1 text-sm text-gray-500 dark:text-gray-400" }));
                (step.afterText);
            }
            var __VLS_8;
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "absolute inset-x-0 bottom-0 z-[-1] h-full bg-white bg-gradient-to-t [mask-image:radial-gradient(900px_at_center,white_30%,transparent)] dark:bg-black" }));
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[100]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['size-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-4']} */ ;
/** @type {__VLS_StyleScopedClasses['top-4']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[101]']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['ring-offset-background']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-ring']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:ring-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['size-6']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-96']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-40']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['size-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['size-6']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['size-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-black']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[-1]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
/** @type {__VLS_StyleScopedClasses['[mask-image:radial-gradient(900px_at_center,white_30%,transparent)]']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:bg-black']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
exports.default = {};
