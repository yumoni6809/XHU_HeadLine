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
var icons_vue_1 = require("@element-plus/icons-vue");
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var pinia_1 = require("pinia");
var dock_1 = require("@/components/inspira/dock");
var animationTransition_1 = require("@/stores/animationTransition");
var loginPrompt_1 = require("@/stores/loginPrompt");
defineOptions({
    name: 'LayoutPage'
});
var router = (0, vue_router_1.useRouter)();
var route = (0, vue_router_1.useRoute)();
// 动画相关
var animationTransitionStore = (0, animationTransition_1.useAnimationTransitionStore)();
var _a = (0, pinia_1.storeToRefs)(animationTransitionStore), transitionDirection = _a.transitionDirection, enableAnimation = _a.enableAnimation, animationType = _a.animationType;
var setTransitionDirection = animationTransitionStore.setTransitionDirection;
(0, vue_1.watch)(function () { return route.meta.index; }, function (newIndex, oldIndex) {
    if (typeof newIndex === 'number' && typeof oldIndex === 'number') {
        if (newIndex > oldIndex) {
            setTransitionDirection('forward');
        }
        else {
            setTransitionDirection('backward');
        }
    }
});
var transitionName = (0, vue_1.computed)(function () {
    if (!enableAnimation.value)
        return '';
    if (route.meta.animation === false)
        return '';
    if (animationType.value === 'fade')
        return 'fade';
    return transitionDirection.value;
});
// 路由跳转
var jumpToNewRouter = function (routeInfo) {
    if (route.path !== '/layout' + routeInfo.url) {
        setTransitionDirection('forward');
        title.value = routeInfo.title;
        router.push('/layout' + routeInfo.url);
    }
};
// ====== 全局筛选条件和事件 ======
var filterCondition = (0, vue_1.ref)({
    sort: 'time', // 'time' 或 'hot'
    timeRange: 'all', // 'all', 'year', 'month', 'week'
});
// 筛选弹窗确认
var confirmFilterCondition = function () {
    filterPanelVisible.value = false;
    window.dispatchEvent(new CustomEvent('homeFilterChange', { detail: __assign({}, filterCondition.value) }));
};
// 筛选弹窗重置
var resetFilterCondition = function () {
    filterCondition.value = { sort: 'time', timeRange: 'all' };
};
var loginPromptStore = (0, loginPrompt_1.useLoginPromptStore)();
var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        loginPromptStore.showLogout();
        return [2 /*return*/];
    });
}); };
var searchContent = (0, vue_1.ref)('');
var title = (0, vue_1.ref)('西瓜头条');
var filterPanelVisible = (0, vue_1.ref)(false);
// Dock 跳转
var goHome = function () {
    jumpToNewRouter({
        url: '/home',
        title: '咨询头条'
    });
};
var goAddArticle = function () {
    jumpToNewRouter({
        url: '/addNewArticle',
        title: '发布新贴'
    });
};
var goUser = function () {
    jumpToNewRouter({
        url: '/user',
        title: '个人信息'
    });
};
var goSetting = function () {
    jumpToNewRouter({
        url: '/setting',
        title: '设置'
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dock-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "entirePage" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "upStreamContent" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "headerComponent" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-flex" }));
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-title" }));
__VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
(__VLS_ctx.title);
// @ts-ignore
[title,];
if (__VLS_ctx.$route.path.endsWith('/home')) {
    // @ts-ignore
    [$route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-search" }));
    var __VLS_0 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    ElInput;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ modelValue: (__VLS_ctx.searchContent), placeholder: "搜索资讯、话题、用户...", prefixIcon: (__VLS_ctx.Search) }, { class: "my-input" }), { clearable: true })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ modelValue: (__VLS_ctx.searchContent), placeholder: "搜索资讯、话题、用户...", prefixIcon: (__VLS_ctx.Search) }, { class: "my-input" }), { clearable: true })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    // @ts-ignore
    [searchContent, icons_vue_1.Search,];
}
if (__VLS_ctx.$route.path.endsWith('/home')) {
    // @ts-ignore
    [$route,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "header-filter" }));
    var __VLS_5 = {}.ElPopover;
    /** @type {[typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, ]} */ ;
    // @ts-ignore
    ElPopover;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(__assign({ visible: (__VLS_ctx.filterPanelVisible), placement: "bottom-end", width: "90vw", trigger: "click" }, { class: "filterPopover" })));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ visible: (__VLS_ctx.filterPanelVisible), placement: "bottom-end", width: "90vw", trigger: "click" }, { class: "filterPopover" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
    var __VLS_9 = __VLS_8.slots.default;
    // @ts-ignore
    [filterPanelVisible,];
    {
        var __VLS_10 = __VLS_8.slots.reference;
        var __VLS_11 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        ElButton;
        // @ts-ignore
        var __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
            circle: true,
        }));
        var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([{
                circle: true,
            }], __VLS_functionalComponentArgsRest(__VLS_12), false));
        var __VLS_15 = __VLS_14.slots.default;
        var __VLS_16 = {}.ElIcon;
        /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
        // @ts-ignore
        ElIcon;
        // @ts-ignore
        var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
        var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_17), false));
        var __VLS_20 = __VLS_19.slots.default;
        var __VLS_21 = {}.Filter;
        /** @type {[typeof __VLS_components.Filter, ]} */ ;
        // @ts-ignore
        icons_vue_1.Filter;
        // @ts-ignore
        var __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
        var __VLS_23 = __VLS_22.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_22), false));
        var __VLS_19;
        var __VLS_14;
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filterPanelWrap" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filterPanel" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filter-row" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "filter-label" }));
    var __VLS_26 = {}.ElRadioGroup;
    /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
    // @ts-ignore
    ElRadioGroup;
    // @ts-ignore
    var __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        modelValue: (__VLS_ctx.filterCondition.sort),
    }));
    var __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.filterCondition.sort),
        }], __VLS_functionalComponentArgsRest(__VLS_27), false));
    var __VLS_30 = __VLS_29.slots.default;
    // @ts-ignore
    [filterCondition,];
    var __VLS_31 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        label: "time",
    }));
    var __VLS_33 = __VLS_32.apply(void 0, __spreadArray([{
            label: "time",
        }], __VLS_functionalComponentArgsRest(__VLS_32), false));
    var __VLS_35 = __VLS_34.slots.default;
    var __VLS_34;
    var __VLS_36 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        label: "hot",
    }));
    var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
            label: "hot",
        }], __VLS_functionalComponentArgsRest(__VLS_37), false));
    var __VLS_40 = __VLS_39.slots.default;
    var __VLS_39;
    var __VLS_29;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filter-row" }));
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "filter-label" }));
    var __VLS_41 = {}.ElRadioGroup;
    /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
    // @ts-ignore
    ElRadioGroup;
    // @ts-ignore
    var __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        modelValue: (__VLS_ctx.filterCondition.timeRange),
    }));
    var __VLS_43 = __VLS_42.apply(void 0, __spreadArray([{
            modelValue: (__VLS_ctx.filterCondition.timeRange),
        }], __VLS_functionalComponentArgsRest(__VLS_42), false));
    var __VLS_45 = __VLS_44.slots.default;
    // @ts-ignore
    [filterCondition,];
    var __VLS_46 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        label: "all",
    }));
    var __VLS_48 = __VLS_47.apply(void 0, __spreadArray([{
            label: "all",
        }], __VLS_functionalComponentArgsRest(__VLS_47), false));
    var __VLS_50 = __VLS_49.slots.default;
    var __VLS_49;
    var __VLS_51 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        label: "year",
    }));
    var __VLS_53 = __VLS_52.apply(void 0, __spreadArray([{
            label: "year",
        }], __VLS_functionalComponentArgsRest(__VLS_52), false));
    var __VLS_55 = __VLS_54.slots.default;
    var __VLS_54;
    var __VLS_56 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        label: "month",
    }));
    var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
            label: "month",
        }], __VLS_functionalComponentArgsRest(__VLS_57), false));
    var __VLS_60 = __VLS_59.slots.default;
    var __VLS_59;
    var __VLS_61 = {}.ElRadioButton;
    /** @type {[typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ]} */ ;
    // @ts-ignore
    ElRadioButton;
    // @ts-ignore
    var __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        label: "week",
    }));
    var __VLS_63 = __VLS_62.apply(void 0, __spreadArray([{
            label: "week",
        }], __VLS_functionalComponentArgsRest(__VLS_62), false));
    var __VLS_65 = __VLS_64.slots.default;
    var __VLS_64;
    var __VLS_44;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filter-btn-row" }));
    var __VLS_66 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66(__assign({ 'onClick': {} }, { size: "small" })));
    var __VLS_68 = __VLS_67.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small" })], __VLS_functionalComponentArgsRest(__VLS_67), false));
    var __VLS_70 = void 0;
    var __VLS_71 = void 0;
    var __VLS_72 = ({ click: {} },
        { onClick: (__VLS_ctx.resetFilterCondition) });
    var __VLS_73 = __VLS_69.slots.default;
    // @ts-ignore
    [resetFilterCondition,];
    var __VLS_69;
    var __VLS_74 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    var __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74(__assign({ 'onClick': {} }, { size: "small", type: "primary" })));
    var __VLS_76 = __VLS_75.apply(void 0, __spreadArray([__assign({ 'onClick': {} }, { size: "small", type: "primary" })], __VLS_functionalComponentArgsRest(__VLS_75), false));
    var __VLS_78 = void 0;
    var __VLS_79 = void 0;
    var __VLS_80 = ({ click: {} },
        { onClick: (__VLS_ctx.confirmFilterCondition) });
    var __VLS_81 = __VLS_77.slots.default;
    // @ts-ignore
    [confirmFilterCondition,];
    var __VLS_77;
    var __VLS_8;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "routerViewContent" }));
var __VLS_82 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
var __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({}));
var __VLS_84 = __VLS_83.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_83), false));
{
    var __VLS_86 = __VLS_85.slots.default;
    var Component = __VLS_getSlotParameters(__VLS_86)[0].Component;
    var __VLS_87 = {}.Transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.Transition, ]} */ ;
    // @ts-ignore
    Transition;
    // @ts-ignore
    var __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        name: (__VLS_ctx.transitionName),
    }));
    var __VLS_89 = __VLS_88.apply(void 0, __spreadArray([{
            name: (__VLS_ctx.transitionName),
        }], __VLS_functionalComponentArgsRest(__VLS_88), false));
    var __VLS_91 = __VLS_90.slots.default;
    // @ts-ignore
    [transitionName,];
    var __VLS_92 = {}.KeepAlive;
    /** @type {[typeof __VLS_components.KeepAlive, typeof __VLS_components.keepAlive, typeof __VLS_components.KeepAlive, typeof __VLS_components.keepAlive, ]} */ ;
    // @ts-ignore
    KeepAlive;
    // @ts-ignore
    var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({}));
    var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_93), false));
    var __VLS_96 = __VLS_95.slots.default;
    var __VLS_97 = ((Component));
    // @ts-ignore
    var __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        key: (__VLS_ctx.route.path),
    }));
    var __VLS_99 = __VLS_98.apply(void 0, __spreadArray([{
            key: (__VLS_ctx.route.path),
        }], __VLS_functionalComponentArgsRest(__VLS_98), false));
    // @ts-ignore
    [route,];
    var __VLS_95;
    var __VLS_90;
    __VLS_85.slots['' /* empty slot name completion */];
}
var __VLS_85;
var __VLS_102 = {}.Dock;
/** @type {[typeof __VLS_components.Dock, typeof __VLS_components.Dock, ]} */ ;
// @ts-ignore
dock_1.Dock;
// @ts-ignore
var __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102(__assign({ class: "dock-float" })));
var __VLS_104 = __VLS_103.apply(void 0, __spreadArray([__assign({ class: "dock-float" })], __VLS_functionalComponentArgsRest(__VLS_103), false));
var __VLS_106 = __VLS_105.slots.default;
var __VLS_107 = {}.DockIcon;
/** @type {[typeof __VLS_components.DockIcon, typeof __VLS_components.DockIcon, ]} */ ;
// @ts-ignore
dock_1.DockIcon;
// @ts-ignore
var __VLS_108 = __VLS_asFunctionalComponent(__VLS_107, new __VLS_107(__assign({ 'onClick': {} })));
var __VLS_109 = __VLS_108.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_108), false));
var __VLS_111;
var __VLS_112;
var __VLS_113 = ({ click: {} },
    { onClick: (__VLS_ctx.goHome) });
var __VLS_114 = __VLS_110.slots.default;
// @ts-ignore
[goHome,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "dock-item" }, { class: ({ active: __VLS_ctx.route.path.endsWith('/home') }) }));
// @ts-ignore
[route,];
var __VLS_115 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    size: (26),
}));
var __VLS_117 = __VLS_116.apply(void 0, __spreadArray([{
        size: (26),
    }], __VLS_functionalComponentArgsRest(__VLS_116), false));
var __VLS_119 = __VLS_118.slots.default;
var __VLS_120 = {}.HomeFilled;
/** @type {[typeof __VLS_components.HomeFilled, ]} */ ;
// @ts-ignore
icons_vue_1.HomeFilled;
// @ts-ignore
var __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({}));
var __VLS_122 = __VLS_121.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_121), false));
var __VLS_118;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
var __VLS_110;
var __VLS_125 = {}.DockSeparator;
/** @type {[typeof __VLS_components.DockSeparator, ]} */ ;
// @ts-ignore
dock_1.DockSeparator;
// @ts-ignore
var __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({}));
var __VLS_127 = __VLS_126.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_126), false));
var __VLS_130 = {}.DockIcon;
/** @type {[typeof __VLS_components.DockIcon, typeof __VLS_components.DockIcon, ]} */ ;
// @ts-ignore
dock_1.DockIcon;
// @ts-ignore
var __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130(__assign({ 'onClick': {} })));
var __VLS_132 = __VLS_131.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_131), false));
var __VLS_134;
var __VLS_135;
var __VLS_136 = ({ click: {} },
    { onClick: (__VLS_ctx.goAddArticle) });
var __VLS_137 = __VLS_133.slots.default;
// @ts-ignore
[goAddArticle,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "dock-item" }, { class: ({ active: __VLS_ctx.route.path.endsWith('/addNewArticle') }) }));
// @ts-ignore
[route,];
var __VLS_138 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
    size: (26),
}));
var __VLS_140 = __VLS_139.apply(void 0, __spreadArray([{
        size: (26),
    }], __VLS_functionalComponentArgsRest(__VLS_139), false));
var __VLS_142 = __VLS_141.slots.default;
var __VLS_143 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
icons_vue_1.Plus;
// @ts-ignore
var __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({}));
var __VLS_145 = __VLS_144.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_144), false));
var __VLS_141;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
var __VLS_133;
var __VLS_148 = {}.DockIcon;
/** @type {[typeof __VLS_components.DockIcon, typeof __VLS_components.DockIcon, ]} */ ;
// @ts-ignore
dock_1.DockIcon;
// @ts-ignore
var __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148(__assign({ 'onClick': {} })));
var __VLS_150 = __VLS_149.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_149), false));
var __VLS_152;
var __VLS_153;
var __VLS_154 = ({ click: {} },
    { onClick: (__VLS_ctx.goUser) });
var __VLS_155 = __VLS_151.slots.default;
// @ts-ignore
[goUser,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "dock-item" }, { class: ({ active: __VLS_ctx.route.path.endsWith('/user') }) }));
// @ts-ignore
[route,];
var __VLS_156 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_157 = __VLS_asFunctionalComponent(__VLS_156, new __VLS_156({
    size: (26),
}));
var __VLS_158 = __VLS_157.apply(void 0, __spreadArray([{
        size: (26),
    }], __VLS_functionalComponentArgsRest(__VLS_157), false));
var __VLS_160 = __VLS_159.slots.default;
var __VLS_161 = {}.User;
/** @type {[typeof __VLS_components.User, ]} */ ;
// @ts-ignore
icons_vue_1.User;
// @ts-ignore
var __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({}));
var __VLS_163 = __VLS_162.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_162), false));
var __VLS_159;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
var __VLS_151;
var __VLS_166 = {}.DockIcon;
/** @type {[typeof __VLS_components.DockIcon, typeof __VLS_components.DockIcon, ]} */ ;
// @ts-ignore
dock_1.DockIcon;
// @ts-ignore
var __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166(__assign({ 'onClick': {} })));
var __VLS_168 = __VLS_167.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_167), false));
var __VLS_170;
var __VLS_171;
var __VLS_172 = ({ click: {} },
    { onClick: (__VLS_ctx.goSetting) });
var __VLS_173 = __VLS_169.slots.default;
// @ts-ignore
[goSetting,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "dock-item" }, { class: ({ active: __VLS_ctx.route.path.endsWith('/setting') }) }));
// @ts-ignore
[route,];
var __VLS_174 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
ElIcon;
// @ts-ignore
var __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
    size: (26),
}));
var __VLS_176 = __VLS_175.apply(void 0, __spreadArray([{
        size: (26),
    }], __VLS_functionalComponentArgsRest(__VLS_175), false));
var __VLS_178 = __VLS_177.slots.default;
var __VLS_179 = {}.Setting;
/** @type {[typeof __VLS_components.Setting, ]} */ ;
// @ts-ignore
icons_vue_1.Setting;
// @ts-ignore
var __VLS_180 = __VLS_asFunctionalComponent(__VLS_179, new __VLS_179({}));
var __VLS_181 = __VLS_180.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_180), false));
var __VLS_177;
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
var __VLS_169;
var __VLS_105;
/** @type {__VLS_StyleScopedClasses['entirePage']} */ ;
/** @type {__VLS_StyleScopedClasses['upStreamContent']} */ ;
/** @type {__VLS_StyleScopedClasses['headerComponent']} */ ;
/** @type {__VLS_StyleScopedClasses['header-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['header-title']} */ ;
/** @type {__VLS_StyleScopedClasses['header-search']} */ ;
/** @type {__VLS_StyleScopedClasses['my-input']} */ ;
/** @type {__VLS_StyleScopedClasses['header-filter']} */ ;
/** @type {__VLS_StyleScopedClasses['filterPopover']} */ ;
/** @type {__VLS_StyleScopedClasses['filterPanelWrap']} */ ;
/** @type {__VLS_StyleScopedClasses['filterPanel']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-label']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-btn-row']} */ ;
/** @type {__VLS_StyleScopedClasses['routerViewContent']} */ ;
/** @type {__VLS_StyleScopedClasses['dock-float']} */ ;
/** @type {__VLS_StyleScopedClasses['dock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['dock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['dock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['dock-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
