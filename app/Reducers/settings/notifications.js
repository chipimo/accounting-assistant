"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("./appConfig/path");
var jsonfile = require("jsonfile");
var fs = require("fs-extra");
var events_1 = require("./events/events");
var updateJsonFile = require("update-json-file");
var Configfile = jsonfile.readFileSync(path_1.config);
var defualtConfig = Configfile.notifications;
var Notifications = function (state, action) {
    switch (action.type) {
        case events_1.STATE:
            return defualtConfig;
        case events_1.UPDATE:
            if (action.payload.type === events_1.AUTO_CLOSE) {
                var settingsObj = Configfile;
                settingsObj.notifications.auto_close = action.payload.state;
                fs.writeFileSync(path_1.config, JSON.stringify(settingsObj));
                var SettingsConfigfile = jsonfile.readFileSync(path_1.config);
                var newConfig = Configfile.notifications;
                return newConfig;
            }
            else if (action.payload.type === events_1.THEME) {
                updateJsonFile(path_1.config, function (data) {
                    data.notifications.theme = action.payload.theme;
                    return data;
                });
                return defualtConfig;
            }
            break;
        default:
            return defualtConfig;
    }
};
exports.default = Notifications;
//# sourceMappingURL=notifications.js.map