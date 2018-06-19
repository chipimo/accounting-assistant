import {
  CASHFLOW,
  OUTFLOW,
  INFLOW,
  UPDATEINFLOW,
  UPDATEOUTFLOW,
  INFLOWDATA,
  OUTFLOWDATA
} from "../../actions/types";
import {
  getYear,
  getISOLocalDate,
  getMonthString,
  getMonth,
  getDateString
} from "../../date/dates";
import { getStatementPath } from "../dataFiles/statements/stocks/path";
const fs = require("fs-extra");
import { getDatafilePath } from "../dataFiles/path";
var jsonfile = require("jsonfile");

let odj;
let month = "0" + getMonth(new Date());
let defaultMonth = getMonthString(month.slice(-2));
let defaultPath = getDatafilePath + "/" + "stock" + "/" + defaultMonth + "/";

let logfile = "acca-error";
let _defultlogfile = defaultPath + logfile + ".json";

let __file = getISOLocalDate(new Date());

let _defultfile = defaultPath + __file + ".json";

function checkfile(file) {
  try {
    fs.ensureFileSync(file);
    fs.writeJsonSync(
      file,
      {
        name: "stock list",
        products: []
      },
      err => {
        if (err) return console.error(err);
      }
    );
  } catch (err) {
    console.error(err);
  }
}

try {
  odj = jsonfile.readFileSync(_defultfile);
} catch (error) {
  checkfile(_defultfile);
  odj = jsonfile.readFileSync(_defultfile);
}

const StockReducer = (state = {}, action) => {
  switch (action.payload) {
    case "NEWSINGELITEM":
      odj.products.push(action.payload.item);
    default:
      return odj;
  }
};

export default StockReducer;
