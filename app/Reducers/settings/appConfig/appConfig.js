"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require("jsonfile");
var path = "./app/Reducers/settings/appConfig/config.json";
var config = jsonfile.readFileSync(path);
exports.default = config;
//# sourceMappingURL=appConfig.js.map