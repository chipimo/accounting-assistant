var jsonfile = require("jsonfile");
var path = "./app/Reducers/settings/appConfig/config.json";
var config = jsonfile.readFileSync(path);

export default config;
