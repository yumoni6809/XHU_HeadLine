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
var vue_router_1 = require("vue-router");
var pinia_1 = require("pinia");
var stores_1 = require("./stores");
var LoginPrompt_vue_1 = require("@/components/LoginPrompt.vue");
var route = (0, vue_router_1.useRoute)();
var animationTransitionStore = (0, stores_1.useAnimationTransitionStore)();
var _a = (0, pinia_1.storeToRefs)(animationTransitionStore), transitionDirection = _a.transitionDirection, enableAnimation = _a.enableAnimation, animationType = _a.animationType;
var setTransitionDirection = animationTransitionStore.setTransitionDirection;
(0, vue_1.watch)(function () { return route.meta.depth; }, function (newDepth, oldDepth) {
    if (newDepth === undefined || oldDepth === undefined || newDepth === oldDepth)
        return;
    if (newDepth > oldDepth) {
        setTransitionDirection('forward');
    }
    else {
        setTransitionDirection('backward');
    }
});
//  计算最终动画名称 (核心修复点)
var transitionName = (0, vue_1.computed)(function () {
    // 优先级 1: 全局开关关闭 -> 无动画
    if (!enableAnimation.value)
        return '';
    // 优先级 2: 全局设置为淡入淡出 -> 强制使用 fade
    if (animationType.value === 'fade')
        return 'fade';
    // 优先级 3: 默认为滑动 -> 使用 store 中的方向
    return transitionDirection.value;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['forward-enter-active']} */ ;
/** @type {__VLS_StyleScopedClasses['forward-leave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['backward-enter-active']} */ ;
/** @type {__VLS_StyleScopedClasses['backward-leave-active']} */ ;
/** @type {__VLS_StyleScopedClasses['forward-enter-from']} */ ;
/** @type {__VLS_StyleScopedClasses['forward-enter-to']} */ ;
/** @type {__VLS_StyleScopedClasses['forward-leave-from']} */ ;
/** @type {__VLS_StyleScopedClasses['forward-leave-to']} */ ;
/** @type {__VLS_StyleScopedClasses['backward-enter-from']} */ ;
/** @type {__VLS_StyleScopedClasses['backward-enter-to']} */ ;
/** @type {__VLS_StyleScopedClasses['backward-leave-from']} */ ;
/** @type {__VLS_StyleScopedClasses['backward-leave-to']} */ ;
/** @type {[typeof LoginPrompt, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(LoginPrompt_vue_1.default, new LoginPrompt_vue_1.default({}));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_0), false));
var __VLS_4 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
var __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_5), false));
{
    var __VLS_8 = __VLS_7.slots.default;
    var _b = __VLS_getSlotParameters(__VLS_8)[0], Component = _b.Component, route_1 = _b.route;
    var __VLS_9 = {}.Transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
    // @ts-ignore
    Transition;
    // @ts-ignore
    var __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        name: (__VLS_ctx.transitionName),
        mode: "out-in",
    }));
    var __VLS_11 = __VLS_10.apply(void 0, __spreadArray([{
            name: (__VLS_ctx.transitionName),
            mode: "out-in",
        }], __VLS_functionalComponentArgsRest(__VLS_10), false));
    var __VLS_13 = __VLS_12.slots.default;
    // @ts-ignore
    [transitionName,];
    var __VLS_14 = ((Component));
    // @ts-ignore
    var __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        key: (route_1.path),
    }));
    var __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
            key: (route_1.path),
        }], __VLS_functionalComponentArgsRest(__VLS_15), false));
    var __VLS_12;
    __VLS_7.slots['' /* empty slot name completion */];
}
var __VLS_7;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
