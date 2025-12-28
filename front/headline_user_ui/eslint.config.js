"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("eslint/config");
var eslint_config_typescript_1 = require("@vue/eslint-config-typescript");
var eslint_plugin_vue_1 = require("eslint-plugin-vue");
var skip_formatting_1 = require("@vue/eslint-config-prettier/skip-formatting");
// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
exports.default = (0, eslint_config_typescript_1.defineConfigWithVueTs)({
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
}, (0, config_1.globalIgnores)(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']), eslint_plugin_vue_1.default.configs['flat/essential'], eslint_config_typescript_1.vueTsConfigs.recommended, skip_formatting_1.default);
