"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dates_1 = require("../../date/dates");
var fs = require("fs-extra");
var path_1 = require("../dataFiles/path");
var jsonfile = require("jsonfile");
var odj;
var month = "0" + dates_1.getMonth(new Date());
var defaultMonth = dates_1.getMonthString(month.slice(-2));
var defaultPath = path_1.getDatafilePath + "/" + "stock" + "/" + defaultMonth + "/";
var logfile = "acca-error";
var _defultlogfile = defaultPath + logfile + ".json";
var __file = dates_1.getISOLocalDate(new Date());
var _defultfile = defaultPath + __file + ".json";
function checkfile(file) {
    try {
        fs.ensureFileSync(file);
        fs.writeJsonSync(file, {
            name: "stock list",
            products: []
        }, function (err) {
            if (err)
                return console.error(err);
        });
    }
    catch (err) {
        console.error(err);
    }
}
try {
    odj = jsonfile.readFileSync(_defultfile);
}
catch (error) {
    checkfile(_defultfile);
    odj = jsonfile.readFileSync(_defultfile);
}
var StockReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.payload) {
        case "NEWSINGELITEM":
            odj.products.push(action.payload.item);
        default:
            return odj;
    }
};
exports.default = StockReducer;
//# sourceMappingURL=stock.js.map