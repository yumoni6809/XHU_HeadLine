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
var vue_1 = require("vue");
var props = withDefaults(defineProps(), {
    width: 40,
    height: 40,
    squares: function () { return [24, 24]; },
});
var horizontal = (0, vue_1.computed)(function () { return props.squares[0]; });
var vertical = (0, vue_1.computed)(function () { return props.squares[1]; });
var totalSquares = (0, vue_1.computed)(function () { return horizontal.value * vertical.value; });
var hoveredSquare = (0, vue_1.ref)(null);
var gridWidth = (0, vue_1.computed)(function () { return props.width * horizontal.value; });
var gridHeight = (0, vue_1.computed)(function () { return props.height * vertical.value; });
function getX(index) {
    return (index % horizontal.value) * props.width;
}
function getY(index) {
    return Math.floor(index / horizontal.value) * props.height;
}
var svgClass = (0, vue_1.computed)(function () {
    return (0, utils_1.cn)('absolute inset-0 h-full w-full border border-gray-400/30', props.className);
});
function getRectClass(index) {
    return (0, utils_1.cn)('stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000', hoveredSquare.value === index ? 'fill-gray-300/30' : 'fill-transparent', props.squaresClassName);
}
function handleMouseEnter(index) {
    hoveredSquare.value = index;
}
function handleMouseLeave() {
    hoveredSquare.value = null;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaults = {
    width: 40,
    height: 40,
    squares: function () { return [24, 24]; },
};
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ width: (__VLS_ctx.gridWidth), height: (__VLS_ctx.gridHeight) }, { class: (__VLS_ctx.svgClass) }));
// @ts-ignore
[gridWidth, gridHeight, svgClass,];
var _loop_1 = function (_1, index) {
    // @ts-ignore
    [totalSquares,];
    __VLS_asFunctionalElement(__VLS_intrinsics.rect)(__assign(__assign(__assign({ onMouseenter: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.handleMouseEnter(index);
            // @ts-ignore
            [handleMouseEnter,];
        } }, { onMouseleave: (__VLS_ctx.handleMouseLeave) }), { key: (index), x: (__VLS_ctx.getX(index)), y: (__VLS_ctx.getY(index)), width: (__VLS_ctx.width), height: (__VLS_ctx.height) }), { class: (__VLS_ctx.getRectClass(index)) }));
    // @ts-ignore
    [handleMouseLeave, getX, getY, width, height, getRectClass,];
};
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.totalSquares)); _i < _a.length; _i++) {
    var _b = _a[_i], _1 = _b[0], index = _b[1];
    _loop_1(_1, index);
}
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
    props: {},
});
exports.default = {};
