let jsonfile = require('jsonfile');
import { getDatafilePath } from '../dataFiles/path';
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');

let odj;
const tills = { Tills: [] };
let file = getDatafilePath + 'Tills' + '/' + 'Till.json';

function checkfile(file) {
  try {
    fs.ensureFileSync(file); 
    fs.writeJsonSync(file, tills, err => {
      if (err) return console.error(err);
    });
  } catch (err) {
    console.error(err);
  }
}

try {
  odj = jsonfile.readFileSync(file);
} catch (error) {
  checkfile(file);
  odj = jsonfile.readFileSync(file);
}

const TillReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NEW_TILL':
      let oldfile = jsonfile.readFileSync(file);
      let count = 1;
      oldfile.Tills.forEach(element => {
        count++;
      });
      let temp = {
        [count]: {
          Till_number: 'till ' + count,
          Till_id: uuidv4(),
          user: [],
          state: 'new',
        },
      };
      oldfile.Tills.push(temp);
      fs.writeJsonSync(file, oldfile, err => {
        if (err) console.log('error' + err);
      });
      let newfile = jsonfile.readFileSync(file);
      return newfile;
    case 'NEW_TILL_USER':
      if (action.type) {
        let oldfile = jsonfile.readFileSync(file);
        let count = 0;
        oldfile.Tills.forEach(element => {
          if (element === action.payload.till) {
            element.user.push(action.payload.detials);
          }
        });
        fs.writeJsonSync(file, oldfile, err => {
          if (err) console.log('error' + err);
        });
      }
      let newfile2 = jsonfile.readFileSync(file);
      return newfile2;
    default:
      return odj;
  }
};

export default TillReducer;
