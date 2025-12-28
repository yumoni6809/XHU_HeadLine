"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLogin = ensureLogin;
var vue_router_1 = require("vue-router");
var index_vue_1 = require("@/views/Login/index.vue");
var index_vue_2 = require("@/views/layout/index.vue");
var index_vue_3 = require("@/views/home/index.vue");
var index_vue_4 = require("@/views/article/index.vue");
var index_vue_5 = require("@/views/user/index.vue");
var index_vue_6 = require("@/views/setting/index.vue");
var index_vue_7 = require("@/views/detail/index.vue");
var loginPrompt_1 = require("@/stores/loginPrompt");
var routes = [
    {
        path: '/',
        redirect: '/layout/home',
    },
    {
        path: '/login',
        name: 'loginPage',
        component: index_vue_1.default,
        // 强制使用 fade 动画，深度 30
        meta: { depth: 30, transition: 'fade' }
    },
    {
        path: '/register',
        name: 'registerPage',
        component: function () { return Promise.resolve().then(function () { return require('@/views/Login/Register.vue'); }); },
        // 强制使用 fade 动画，深度 40
        meta: { depth: 40, transition: 'fade' }
    },
    {
        path: '/article',
        name: 'articlePage',
        component: index_vue_7.default,
        meta: { depth: 20 }
    },
    {
        path: '/layout',
        component: index_vue_2.default,
        meta: { depth: 10 },
        children: [
            {
                path: '',
                redirect: '/layout/home'
            },
            {
                path: 'home',
                name: 'homePage',
                component: index_vue_3.default,
                meta: { animation: true, index: 1, depth: 10 }
            },
            {
                path: 'addNewArticle',
                name: 'addNewArticlePage',
                component: index_vue_4.default,
                meta: { requiresAuth: true, animation: true, index: 2, depth: 10 }
            },
            {
                path: 'user',
                name: 'userPage',
                component: index_vue_5.default,
                meta: { requiresAuth: true, animation: true, index: 3, depth: 10 }
            },
            {
                path: 'setting',
                name: 'settingPage',
                component: index_vue_6.default,
                meta: { requiresAuth: true, animation: true, index: 4, depth: 10 }
            }
        ]
    }
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(import.meta.env.BASE_URL),
    routes: routes,
});
router.beforeEach(function (to, from, next) {
    // 白名单路由：不需要登录即可访问
    var whiteList = ['/', '/login', '/register', '/layout', '/layout/home', '/article'];
    var token = localStorage.getItem('token');
    // 已登录且想去登录/注册，直接回首页
    if (token && ['/login', '/register', '/'].includes(to.path)) {
        next('/layout/home');
        return;
    }
    // 需要登录的路由，才做校验
    if (to.meta.requiresAuth) {
        if (token) {
            next();
        }
        else {
            // === 修改部分开始 ===
            // 不直接跳转，而是弹出全局登录框，并取消本次导航
            var loginPromptStore = (0, loginPrompt_1.useLoginPromptStore)();
            loginPromptStore.show(to.fullPath);
            next(false);
            // === 修改部分结束 ===
        }
        return;
    }
    next();
});
/** 返回 true 表示已登录，可继续；false 表示已跳转去登录 */
function ensureLogin() {
    var token = localStorage.getItem('token');
    var user = localStorage.getItem('login_user');
    if (token && user)
        return true;
    var current = router.currentRoute.value.fullPath || '/layout/home';
    router.push({ path: '/login', query: { redirect: current } });
    return false;
}
exports.default = router;
