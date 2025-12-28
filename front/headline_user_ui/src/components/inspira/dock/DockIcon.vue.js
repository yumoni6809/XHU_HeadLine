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
var injectionKeys_1 = require("./injectionKeys");
var utils_1 = require("@/lib/utils");
var mouseX = (0, vue_1.inject)(injectionKeys_1.MOUSE_X_INJECTION_KEY);
var mouseY = (0, vue_1.inject)(injectionKeys_1.MOUSE_Y_INJECTION_KEY);
var magnification = (0, vue_1.inject)(injectionKeys_1.MAGNIFICATION_INJECTION_KEY);
var distance = (0, vue_1.inject)(injectionKeys_1.DISTANCE_INJECTION_KEY);
var orientation = (0, vue_1.inject)(injectionKeys_1.ORIENTATION_INJECTION_KEY, 'horizontal');
var iconRef = (0, vue_1.ref)(null);
var iconSize = 40;
var scale = (0, vue_1.computed)(function () {
    if (!iconRef.value)
        return 1;
    var rect = iconRef.value.getBoundingClientRect();
    var iconCenterX = rect.left + rect.width / 2;
    var iconCenterY = rect.top + rect.height / 2;
    var dx = mouseX.value - iconCenterX;
    var dy = mouseY.value - iconCenterY;
    var d = orientation === 'horizontal' ? Math.abs(dx) : Math.abs(dy);
    if (d > distance.value)
        return 1;
    var ratio = 1 - d / distance.value;
    var extra = (magnification.value / 100) * ratio;
    return 1 + extra;
});
var style = (0, vue_1.computed)(function () { return ({
    width: "".concat(iconSize, "px"),
    height: "".concat(iconSize, "px"),
    transform: "scale(".concat(scale.value, ")"),
}); });
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ ref: "iconRef", type: "button" }, { class: (__VLS_ctx.cn('flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 transition-transform duration-150', 'hover:bg-black/10 dark:hover:bg-white/10')) }), { style: (__VLS_ctx.style) }));
/** @type {typeof __VLS_ctx.iconRef} */ ;
// @ts-ignore
[utils_1.cn, style, iconRef,];
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_base = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
var __VLS_export = {};
exports.default = {};
