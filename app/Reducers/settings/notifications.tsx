import { config } from "./appConfig/path";
const jsonfile = require("jsonfile");
const fs = require("fs-extra");
import {
  STATE,
  UPDATE,
  SET,
  AUTO_CLOSE,
  SHOW_ON_START,
  THEME
} from "./events/events";
const updateJsonFile = require("update-json-file");

var Configfile = jsonfile.readFileSync(config);
var defualtConfig = Configfile.notifications;

var Notifications = (state, action) => {
  switch (action.type) {
    case STATE:
      return defualtConfig;
    case UPDATE:
      if (action.payload.type === AUTO_CLOSE) {
        var settingsObj = Configfile;

        settingsObj.notifications.auto_close = action.payload.state;

        fs.writeFileSync(config, JSON.stringify(settingsObj));

        var SettingsConfigfile = jsonfile.readFileSync(config);
        var newConfig = Configfile.notifications;

        return newConfig;
      } else if (action.payload.type === THEME) {
        updateJsonFile(config, data => {
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

export default Notifications;
