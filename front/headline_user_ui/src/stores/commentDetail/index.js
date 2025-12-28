"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCommentDetailStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
var main_js_1 = require("@/utils/axios/main.js");
var element_plus_1 = require("element-plus");
exports.useCommentDetailStore = (0, pinia_1.defineStore)('CommentDetailInfo', function () {
    // 定义分页相关数据
    var page = (0, vue_1.ref)(1);
    var pageSize = (0, vue_1.ref)(5);
    var totalCount = (0, vue_1.ref)(100);
    var commentCountList = (0, vue_1.ref)([]);
    // 重置commentCountList
    var resetCommentCountList = function () {
        commentCountList.value = [];
    };
    // 通过后端数据设置commentCountList
    var setCommentCountListFromEndData = function (endData) {
        totalCount.value = endData.totalCount;
        commentCountList.value = endData.list;
    };
    // 通过后端获取到EndData并且设置到store当中
    var getEndDataByFrontDataAndSet = function (articleId) { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, main_js_1.default.get("/user/news/".concat(articleId, "/comments"), {
                            params: {
                                page: page.value,
                                size: pageSize.value
                            }
                        })];
                case 1:
                    res = _c.sent();
                    if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) === 1) {
                        setCommentCountListFromEndData(res.data);
                    }
                    else {
                        element_plus_1.ElMessage.error('发生错误：', (_b = res.data) === null || _b === void 0 ? void 0 : _b.message);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _c.sent();
                    element_plus_1.ElMessage.error('发生未知错误！', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // 设置分页相关数据
    var setPage = function (newPage) {
        page.value = newPage;
    };
    var setPageSize = function (newPageSize) {
        pageSize.value = newPageSize;
    };
    var setTotalCount = function (newTotalCount) {
        totalCount.value = newTotalCount;
    };
    return {
        page: page,
        pageSize: pageSize,
        totalCount: totalCount,
        commentCountList: commentCountList,
        setPage: setPage,
        setPageSize: setPageSize,
        setTotalCount: setTotalCount,
        getEndDataByFrontDataAndSet: getEndDataByFrontDataAndSet,
        resetCommentCountList: resetCommentCountList,
        setCommentCountListFromEndData: setCommentCountListFromEndData
    };
});
