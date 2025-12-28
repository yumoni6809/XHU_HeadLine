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
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
require("./asset/main.css");
require("./stores/animationTransition/transitions.css");
var index_js_1 = require("@/stores/index.js");
var app = (0, vue_1.createApp)(App_vue_1.default);
// 引入 Element Plus
var element_plus_1 = require("element-plus");
require("element-plus/dist/index.css");
// 引入富文本编辑器
var vue_quill_1 = require("@vueup/vue-quill");
require("@vueup/vue-quill/dist/vue-quill.snow.css");
// 自定义ElPlus的命名
var zh_cn_1 = require("element-plus/es/locale/lang/zh-cn");
// 配置ElPlus对应的语言
var myLocale = __assign(__assign({}, zh_cn_1.default), { el: __assign(__assign({}, zh_cn_1.default.el), { pagination: __assign(__assign({}, zh_cn_1.default.el.pagination), { goto: '跳转到', total: '共{total}条', pagesize: '条/页', pageClassifier: '页' }) }) });
app.use(element_plus_1.default, {
    locale: myLocale
});
app.use(router_1.default);
app.use(element_plus_1.default); // 全局注册
app.use(index_js_1.default);
app.component('QuillEditor', vue_quill_1.QuillEditor);
app.mount('#app');
