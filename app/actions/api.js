"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.default = {
    user: {
        login: function (credentials) {
            return axios_1.default
                .post('http://' + credentials.server + '/api/user', { credentials: credentials })
                .then(function (res) { return res.data.user; });
        },
    },
};
//# sourceMappingURL=api.js.map