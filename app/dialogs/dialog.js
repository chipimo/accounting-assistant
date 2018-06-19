"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron = require('electron');
var dialog = electron.remote.dialog;
var win = electron_1.remote.getCurrentWindow();
var WinDialog = function (params) {
    if (params.Action) {
        dialog.showMessageBox(win, {
            type: params.type,
            title: params.title,
            message: params.message,
            buttons: ['Cancel', 'OK'],
        }, function (response) {
            if (params.Action) {
                if (response === 1) {
                    win.reload();
                }
            }
        });
    }
    else {
        dialog.showMessageBox(win, {
            type: params.type,
            title: params.title,
            message: params.message,
            buttons: ['OK'],
        }, function (response) { });
    }
};
exports.default = WinDialog;
//# sourceMappingURL=dialog.js.map