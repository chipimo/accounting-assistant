"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonfile = require('jsonfile');
var fs = require('fs-extra');
var path_1 = require("./file/path");
// import WinDialog from '../../dialogs/dialog';
var Filename = 'companyFiles';
var Folderpath = path_1.getCompanyDatafilePath + 'detials';
var Filepath = Folderpath + '/' + Filename + '.json';
var obj = {};
var uuidv5 = require('uuid/v5');
var MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
var defaultData = {
    name: null,
    id: uuidv5('Please_change_this', MY_NAMESPACE),
    api_key: null,
    password: null,
    website: null,
    email: null,
    contact_number: null,
    country: null,
};
function EnsureFile(file) {
    try {
        obj = jsonfile.readFileSync(file);
    }
    catch (error) {
        jsonfile.writeFile(file, defaultData, function (err) {
            if (err) {
                // WinDialog({
                //   type: 'error',
                //   title: 'Create File',
                //   message: 'We fialed to Write to a file ' + err,
                // });
            }
        });
    }
}
EnsureFile(Filepath);
var DetialsReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case 'NEW_REG':
            var objfile = jsonfile.readFileSync(Filepath);
            objfile.name = action.user.company;
            objfile.id = action.user.id;
            objfile.api_key = action.user.api_key;
            objfile.password = action.user.password;
            objfile.email = action.user.email;
            objfile.contact_number = action.user.contact_number;
            objfile.website = action.user.website;
            jsonfile.writeFile(Filepath, objfile, function (err) { });
            return obj;
        default:
            return obj;
    }
};
exports.default = DetialsReducer;
//# sourceMappingURL=detials.js.map