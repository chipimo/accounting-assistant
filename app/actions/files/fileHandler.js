"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoggedIn = function (user, type) { return ({
    type: type,
    user: user
}); };
exports.fileHander = function (action, fileEvent) { return function (dispatch) {
    return dispatch(exports.userLoggedIn(action, fileEvent));
}; };
//# sourceMappingURL=fileHandler.js.map