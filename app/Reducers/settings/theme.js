"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appConfig_1 = require("./appConfig/appConfig");
var Theme = function (state, action) {
    if (state === void 0) {
        state = {};
    }
    if (appConfig_1.default.theme.current) {
        return appConfig_1.default.theme.current;
    }
    else {
        return appConfig_1.default.theme.defult;
    }
};
exports.default = Theme;
//# sourceMappingURL=theme.js.map