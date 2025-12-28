"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLogin = ensureLogin;
var router_1 = require("@/router");
/** 返回 true 表示已登录，可继续；false 表示已跳转去登录 */
function ensureLogin() {
    var token = localStorage.getItem('token');
    var user = localStorage.getItem('login_user');
    if (token && user)
        return true;
    var current = router_1.default.currentRoute.value.fullPath || '/layout/home';
    router_1.default.push({ path: '/login', query: { redirect: current } });
    return false;
}
切换动画;
