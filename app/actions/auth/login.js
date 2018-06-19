"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../api");
exports.userLoggedIn = function (user) { return ({
    type: "NEW_REG",
    user: user,
}); };
exports.login = function (credentials) { return function (dispatch) {
    return api_1.default.user.login(credentials).then(function (user) { return dispatch(exports.userLoggedIn(user)); });
}; };
//# sourceMappingURL=login.js.map