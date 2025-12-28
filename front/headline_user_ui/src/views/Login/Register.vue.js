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
var main_js_1 = require("@/utils/axios/main.js");
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var AuroraBackground_vue_1 = require("@/components/AuroraBackground.vue");
var VanishingInput_vue_1 = require("@/components/inspira/VanishingInput.vue");
var IInput_vue_1 = require("@/components/IInput.vue");
var RainbowButton_vue_1 = require("@/components/inspira/RainbowButton.vue");
var element_plus_1 = require("element-plus");
var router = (0, vue_router_1.useRouter)();
var name = (0, vue_1.ref)('');
var namePlaceholders = ['如何称呼你？', '例如：小明 / 小李 / 一只前端菜鸟'];
var password = (0, vue_1.ref)('');
var confirmPassword = (0, vue_1.ref)('');
var phone = (0, vue_1.ref)('');
var showDetailForm = (0, vue_1.computed)(function () { return !!name.value.trim(); });
var onNameSubmit = function (val) {
    name.value = val.trim();
    if (!name.value) {
        element_plus_1.ElMessage.warning('请先告诉我如何称呼你～');
    }
};
var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!name.value.trim()) {
                    element_plus_1.ElMessage.warning('请先填写昵称');
                    return [2 /*return*/];
                }
                if (!password.value) {
                    element_plus_1.ElMessage.warning('请输入密码');
                    return [2 /*return*/];
                }
                if (password.value.length < 6) {
                    element_plus_1.ElMessage.warning('密码长度至少 6 位');
                    return [2 /*return*/];
                }
                if (password.value !== confirmPassword.value) {
                    element_plus_1.ElMessage.error('两次输入的密码不一致');
                    return [2 /*return*/];
                }
                if (!phone.value) {
                    element_plus_1.ElMessage.warning('请输入手机号');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, main_js_1.default.post('/user/register', {
                        userName: name.value,
                        password: password.value,
                        phone: phone.value,
                    })];
            case 2:
                res = _a.sent();
                if (res.code === 1) {
                    element_plus_1.ElMessage.success('注册成功！');
                    router.push('/login');
                }
                else {
                    element_plus_1.ElMessage.error(res.message || '注册失败');
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                element_plus_1.ElMessage.error('请求失败');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var goLogin = function () {
    router.push('/login');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['link']} */ ;
/** @type {__VLS_StyleScopedClasses['register-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['register-card']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {[typeof AuroraBackground, typeof AuroraBackground, ]} */ ;
// @ts-ignore
var __VLS_0 = __VLS_asFunctionalComponent(AuroraBackground_vue_1.default, new AuroraBackground_vue_1.default(__assign({ class: "bg-wrapper" })));
var __VLS_1 = __VLS_0.apply(void 0, __spreadArray([__assign({ class: "bg-wrapper" })], __VLS_functionalComponentArgsRest(__VLS_0), false));
var __VLS_3 = {};
var __VLS_4 = __VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "register-overlay" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "register-card" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "name-block" }));
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)(__assign({ class: "title" }));
/** @type {[typeof VanishingInput, ]} */ ;
// @ts-ignore
var __VLS_5 = __VLS_asFunctionalComponent(VanishingInput_vue_1.default, new VanishingInput_vue_1.default(__assign({ 'onSubmit': {} }, { modelValue: (__VLS_ctx.name), placeholders: (__VLS_ctx.namePlaceholders) })));
var __VLS_6 = __VLS_5.apply(void 0, __spreadArray([__assign({ 'onSubmit': {} }, { modelValue: (__VLS_ctx.name), placeholders: (__VLS_ctx.namePlaceholders) })], __VLS_functionalComponentArgsRest(__VLS_5), false));
var __VLS_8;
var __VLS_9;
var __VLS_10 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onNameSubmit) });
// @ts-ignore
[name, namePlaceholders, onNameSubmit,];
var __VLS_7;
if (__VLS_ctx.name) {
    // @ts-ignore
    [name,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "greet" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "greet-name" }));
    (__VLS_ctx.name);
    // @ts-ignore
    [name,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "detail-form" }));
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.showDetailForm) }), null, null);
// @ts-ignore
[showDetailForm,];
/** @type {[typeof IInput, ]} */ ;
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent(IInput_vue_1.default, new IInput_vue_1.default({
    modelValue: (__VLS_ctx.password),
    type: "password",
    placeholder: "请输入密码",
    containerClass: "field-wrapper",
}));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.password),
        type: "password",
        placeholder: "请输入密码",
        containerClass: "field-wrapper",
    }], __VLS_functionalComponentArgsRest(__VLS_12), false));
// @ts-ignore
[password,];
/** @type {[typeof IInput, ]} */ ;
// @ts-ignore
var __VLS_16 = __VLS_asFunctionalComponent(IInput_vue_1.default, new IInput_vue_1.default({
    modelValue: (__VLS_ctx.confirmPassword),
    type: "password",
    placeholder: "请再次输入密码",
    containerClass: "field-wrapper",
}));
var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.confirmPassword),
        type: "password",
        placeholder: "请再次输入密码",
        containerClass: "field-wrapper",
    }], __VLS_functionalComponentArgsRest(__VLS_16), false));
// @ts-ignore
[confirmPassword,];
/** @type {[typeof IInput, ]} */ ;
// @ts-ignore
var __VLS_20 = __VLS_asFunctionalComponent(IInput_vue_1.default, new IInput_vue_1.default({
    modelValue: (__VLS_ctx.phone),
    type: "tel",
    placeholder: "请输入手机号",
    containerClass: "field-wrapper",
}));
var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([{
        modelValue: (__VLS_ctx.phone),
        type: "tel",
        placeholder: "请输入手机号",
        containerClass: "field-wrapper",
    }], __VLS_functionalComponentArgsRest(__VLS_20), false));
// @ts-ignore
[phone,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "actions" }));
/** @type {[typeof RainbowButton, typeof RainbowButton, ]} */ ;
// @ts-ignore
var __VLS_24 = __VLS_asFunctionalComponent(RainbowButton_vue_1.default, new RainbowButton_vue_1.default(__assign({ 'onClick': {} })));
var __VLS_25 = __VLS_24.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_24), false));
var __VLS_27;
var __VLS_28;
var __VLS_29 = ({ click: {} },
    { onClick: (__VLS_ctx.onSubmit) });
var __VLS_30 = __VLS_26.slots.default;
// @ts-ignore
[onSubmit,];
var __VLS_26;
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "hint" }));
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ onClick: (__VLS_ctx.goLogin) }, { class: "link" }));
// @ts-ignore
[goLogin,];
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['bg-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['register-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['register-card']} */ ;
/** @type {__VLS_StyleScopedClasses['name-block']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['greet']} */ ;
/** @type {__VLS_StyleScopedClasses['greet-name']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-form']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['hint']} */ ;
/** @type {__VLS_StyleScopedClasses['link']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
