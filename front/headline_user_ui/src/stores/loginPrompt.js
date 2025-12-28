"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoginPromptStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useLoginPromptStore = (0, pinia_1.defineStore)('loginPrompt', function () {
    var visible = (0, vue_1.ref)(false);
    var redirectPath = (0, vue_1.ref)('');
    // mode: 'login' | 'logout'
    var mode = (0, vue_1.ref)('login');
    // 显示登录提示
    var show = function (path) {
        mode.value = 'login';
        redirectPath.value = path || '';
        visible.value = true;
    };
    // 显示退出确认
    var showLogout = function () {
        mode.value = 'logout';
        visible.value = true;
    };
    var hide = function () {
        visible.value = false;
        redirectPath.value = '';
    };
    return { visible: visible, redirectPath: redirectPath, mode: mode, show: show, showLogout: showLogout, hide: hide };
});
