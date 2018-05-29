"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var googleAnalytics = require("nativescript-google-analytics");
var snackbarModule = require("nativescript-snackbar");
var frameModule = require("tns-core-modules/ui/frame");
var page;
var snackbar = new snackbarModule.SnackBar();
exports.pageLoaded = function (args) {
    page = args.object;
    page.bindingContext = new main_view_model_1.MainViewModel();
    googleAnalytics.logView("Main-Page");
    wireEvents();
};
exports.mainActionTap = function (args) {
    googleAnalytics.logEvent({
        category: "Basic Actions",
        action: "Click",
        label: "Main Button"
    });
    showMessage("Primary Tap");
};
exports.secondaryActionTap = function (args) {
    googleAnalytics.logEvent({
        category: "Basic Actions",
        action: "Click",
        label: "Secondary Button"
    });
    frameModule.topmost().navigate("secondary-page");
};
exports.onDispatchQueue = function (args) {
    googleAnalytics.dispatch();
};
function wireEvents() {
    page.getViewById("genstureSwipe").on("swipe", function (args) {
        googleAnalytics.logEvent({
            category: "Gestures",
            action: "Swipe",
            label: "Direction: " + args.direction,
            value: args.direction
        });
        showMessage("Swipe Direction: " + args.direction);
        console.log("Swipe Direction: " + args.direction);
    });
    page.getViewById("genstureLongTap").on("longPress", function (args) {
        googleAnalytics.logEvent({
            category: "Gestures",
            action: "Long Press",
            label: "Long press on screen"
        });
        showMessage("Long Press");
        console.log("Long Press");
    });
}
function showMessage(message) {
    snackbar.simple(message).then(function (args) {
        console.log(JSON.stringify(args));
    });
}
