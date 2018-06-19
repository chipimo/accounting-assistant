"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require('jsonfile');
var path_1 = require("../dataFiles/path");
var fs = require('fs-extra');
var uuidv4 = require('uuid/v4');
var odj;
var tills = { Tills: [] };
var file = path_1.getDatafilePath + 'Tills' + '/' + 'Till.json';
function checkfile(file) {
    try {
        fs.ensureFileSync(file);
        fs.writeJsonSync(file, tills, function (err) {
            if (err)
                return console.error(err);
        });
    }
    catch (err) {
        console.error(err);
    }
}
try {
    odj = jsonfile.readFileSync(file);
}
catch (error) {
    checkfile(file);
    odj = jsonfile.readFileSync(file);
}
var TillReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case 'NEW_TILL':
            var oldfile = jsonfile.readFileSync(file);
            var count_1 = 1;
            oldfile.Tills.forEach(function (element) {
                count_1++;
            });
            var temp = (_a = {},
                _a[count_1] = {
                    Till_number: 'till ' + count_1,
                    Till_id: uuidv4(),
                    user: [],
                    state: 'new',
                },
                _a);
            oldfile.Tills.push(temp);
            fs.writeJsonSync(file, oldfile, function (err) {
                if (err)
                    console.log('error' + err);
            });
            var newfile = jsonfile.readFileSync(file);
            return newfile;
        case 'NEW_TILL_USER':
            if (action.type) {
                var oldfile_1 = jsonfile.readFileSync(file);
                var count_2 = 0;
                oldfile_1.Tills.forEach(function (element) {
                    if (element === action.payload.till) {
                        element.user.push(action.payload.detials);
                    }
                });
                fs.writeJsonSync(file, oldfile_1, function (err) {
                    if (err)
                        console.log('error' + err);
                });
            }
            var newfile2 = jsonfile.readFileSync(file);
            return newfile2;
        default:
            return odj;
    }
    var _a;
};
exports.default = TillReducer;
//# sourceMappingURL=Till.js.map