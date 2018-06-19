import config from "./appConfig/appConfig";

var Theme = (state, action) =>{
  if (state === void 0) {
    state = {};
  }
  if (config.theme.current) {
    return config.theme.current;
  } else {
    return config.theme.defult;
  }
};

export default Theme;
