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
var __VLS_props = defineProps();
var ROWS = 11;
var COLUMNS = 41;
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn('flex shrink-0 scale-105 flex-wrap items-center justify-center gap-px bg-gray-100 dark:bg-neutral-900', __VLS_ctx.$props.class)) }));
// @ts-ignore
[utils_1.cn, $props,];
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.ROWS)); _i < _a.length; _i++) {
    var row = _a[_i][0];
    // @ts-ignore
    [ROWS,];
    for (var _b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.COLUMNS)); _b < _c.length; _b++) {
        var col = _c[_b][0];
        // @ts-ignore
        [COLUMNS,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div)(__assign({ class: (__VLS_ctx.cn('w-10 h-10 flex flex-shrink-0 rounded-[2px]', ((row - 1) * __VLS_ctx.COLUMNS + (col - 1)) % 2 === 0
                ? 'bg-gray-50 dark:bg-neutral-950'
                : 'bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]')) }));
        // @ts-ignore
        [utils_1.cn, COLUMNS,];
    }
}
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
});
exports.default = {};
