"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../actions/types");
var SearchResultsReducer = function (state, action) {
    switch (action.type) {
        case types_1.SEARCH_RESULTS:
            return action.results.details;
        default:
            return (state = []);
    }
};
exports.default = SearchResultsReducer;
//# sourceMappingURL=searcheng.js.map