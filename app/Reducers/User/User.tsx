import { USER_LOGGED_IN, USER_LOG_IN, NEW_USER } from '../../actions/types';
import { getDatafilePath } from '../dataFiles/path';
import { getCompanyDatafilePath } from '../CompanyDetials/file/path';
// import WinDialog from '../../dialogs/dialog';
var jsonfile = require('jsonfile');
var passwordHash = require('password-hash');

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

var hashedPassword;

const path = getDatafilePath + 'users' + '/' + 'users.json';
const companyDetials =
  getCompanyDatafilePath + 'detials' + '/' + 'companyFiles.json';

var users;
var newObj;
var NewUsers;
var NewUsersList;

var Already = false;

const obj = {
  user: [],
  RequierPassword: true,
  usersList: false,
};

var userList = [];

function loadfile() {
  try {
    users = jsonfile.readFileSync(path);
    users.user.forEach(user => {
      userList.push(user);
    });
  } catch (error) {
    jsonfile.writeFileSync(path, obj);
    users = jsonfile.readFileSync(path);
  }
}

loadfile();

const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOG_IN:
      var userLog;
      if (userList[0]) {
        userList.forEach(user => {
          if (user.user === action.payload.name) {
            if (passwordHash.verify(action.payload.password, user.pass)) {
              users.KeepSignedIn = action.payload.KeepSignedIn;
              jsonfile.writeFileSync(path, users);

              userLog = {
                user: [
                  {
                    user: userList,
                    state: true,
                    Username: user.name,
                    Priv: user.priverges,
                    loggedIn: true,
                    KeepSignedIn: action.payload.KeepSignedIn,
                  },
                ],
                usersList: true,
              };
              return userLog;
            } else {
              userLog = {
                user: [
                  {
                    state: false,
                    Username: 'user',
                    password: false,
                    loggedIn: false,
                  },
                ],
                usersList: true,
              };
              return userLog;
            }
          } else {
            userLog = {
              user: [
                {
                  state: false,
                  Username: false,
                  password: 'password',
                  loggedIn: false,
                },
              ],
              usersList: true,
            };
          }
        });
        return userLog;
      } else {
        var compDetials = jsonfile.readFileSync(companyDetials);
        if (
          passwordHash.verify(action.payload.password, compDetials.password)
        ) {
          if (compDetials.email === action.payload.email) {
            userLog = {
              user: [
                {
                  user: userList,
                  state: true,
                  Username: '',
                  loggedIn: true,
                },
              ],
              usersList: false,
            };
            return userLog;
          } else {
            userLog = {
              user: [
                {
                  state: false,
                  email: false,
                  password: 'password',
                  loggedIn: false,
                },
              ],
              usersList: false,
            };
            return userLog;
          }
        } else {
          userLog = {
            user: [
              {
                state: false,
                email: 'email',
                password: false,
                loggedIn: false,
              },
            ],
            usersList: false,
          };
          return userLog;
        }
      }

    case NEW_USER:
      if (action.type === NEW_USER) {
        NewUsers = jsonfile.readFileSync(path);
        NewUsers.user.forEach(user => {
          if (user.user === action.payload.newUser.user) {
            Already = true;
          } else {
            Already = false;
          }
        });

        if (!Already) {
          var uerData;

          hashedPassword = passwordHash.generate(action.payload.newUser.pass);

          action.payload.newUser.pass = hashedPassword;

          if (action.payload.newUser.Privileges === 'Adim') {
            action.payload.newUser.Privileges = true;
          } else {
            action.payload.newUser.Privileges = false;
          }

          NewUsers.user.push(action.payload.newUser);

          NewUsers.usersList = true;
          newObj = NewUsers;

          jsonfile.writeFileSync(path, newObj);

          NewUsersList = jsonfile.readFileSync(path);

          return NewUsersList;
        } else {
          // WinDialog({
          //   type: 'error',
          //   title: 'User Registration Error',
          //   message: 'The ' + action.payload.newUser.user + ' already exists',
          //   Action: false,
          // });

          NewUsersList = jsonfile.readFileSync(path);

          return NewUsersList;
        }
      }

    default:
      return users;
  }
};

export default UserReducer;
