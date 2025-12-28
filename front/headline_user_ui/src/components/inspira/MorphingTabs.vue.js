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
var props = withDefaults(defineProps(), {
    margin: 20,
    blurStdDeviation: 6,
});
var emit = defineEmits();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_defaults = {
    margin: 20,
    blurStdDeviation: 6,
};
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
if (props.tabs.length) {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn('relative', props.class)) }, { style: {} }));
    // @ts-ignore
    [utils_1.cn,];
    var _loop_1 = function (tab) {
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!(props.tabs.length))
                    return;
                __VLS_ctx.emit('update:activeTab', tab);
                // @ts-ignore
                [emit,];
            } }, { key: (tab) }), { class: (__VLS_ctx.cn('px-4 py-2 bg-primary text-background transition-all duration-500')) }), { style: ({
                margin: "0 ".concat(__VLS_ctx.activeTab === tab ? props.margin : 0, "px"),
            }) }));
        // @ts-ignore
        [utils_1.cn, activeTab,];
        (tab);
    };
    for (var _i = 0, _a = __VLS_getVForSourceType((props.tabs)); _i < _a.length; _i++) {
        var tab = _a[_i][0];
        _loop_1(tab);
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "absolute w-full" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.filter, __VLS_intrinsics.filter)({
        id: "exclusionTabsGoo",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%",
        'color-interpolation-filters': "sRGB",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.feGaussianBlur, __VLS_intrinsics.feGaussianBlur)({
        in: "SourceGraphic",
        stdDeviation: (__VLS_ctx.blurStdDeviation),
        result: "blur",
    });
    // @ts-ignore
    [blurStdDeviation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.feColorMatrix, __VLS_intrinsics.feColorMatrix)({
        in: "blur",
        type: "matrix",
        values: "\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0031\u0020\u0030\u0020\u0030\u0020\u0030\u0020\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0030\u0020\u0031\u0020\u0030\u0020\u0030\u0020\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0030\u0020\u0030\u0020\u0031\u0020\u0030\u0020\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0030\u0020\u0030\u0020\u0030\u0020\u0033\u0036\u0020\u002d\u0031\u0032",
        result: "goo",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.feComposite, __VLS_intrinsics.feComposite)({
        in: "SourceGraphic",
        in2: "goo",
        operator: "atop",
    });
}
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
exports.default = {};
