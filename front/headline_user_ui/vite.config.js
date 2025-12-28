"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_url_1 = require("node:url");
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
var vite_plugin_vue_devtools_1 = require("vite-plugin-vue-devtools");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)(), (0, vite_plugin_vue_devtools_1.default)()],
    resolve: {
        alias: {
            '@': (0, node_url_1.fileURLToPath)(new node_url_1.URL('./src', import.meta.url)),
            src: (0, node_url_1.fileURLToPath)(new node_url_1.URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:7111/',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); },
            },
        },
    },
});
