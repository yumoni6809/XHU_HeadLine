"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnimationTransitionStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useAnimationTransitionStore = (0, pinia_1.defineStore)('AnimationTransitionInfo', function () {
    var transitionDirection = (0, vue_1.ref)('forward');
    var enableAnimation = (0, vue_1.ref)(true);
    var animationType = (0, vue_1.ref)('fade');
    var setTransitionDirection = function (direction) {
        transitionDirection.value = direction;
    };
    var setEnableAnimation = function (enable) {
        enableAnimation.value = enable;
    };
    var setAnimationType = function (type) {
        animationType.value = type;
    };
    return {
        transitionDirection: transitionDirection,
        enableAnimation: enableAnimation,
        animationType: animationType,
        setTransitionDirection: setTransitionDirection,
        setEnableAnimation: setEnableAnimation,
        setAnimationType: setAnimationType
    };
});
