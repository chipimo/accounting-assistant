"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchResult_1 = require("../../searchResult");
exports.searchResults = function (results) { return ({
    type: 'SEARCH_RESULTS',
    results: results,
}); };
exports.search = function (credentials) { return function (dispatch) {
    return searchResult_1.default.result.search(credentials).then(function (result) { return dispatch(exports.searchResults(result)); });
}; };
//# sourceMappingURL=results.js.map