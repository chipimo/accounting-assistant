"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../actions/types");
var path_1 = require("../dataFiles/path");
var path_2 = require("../CompanyDetials/file/path");
// import WinDialog from '../../dialogs/dialog';
var jsonfile = require('jsonfile');
var passwordHash = require('password-hash');
var MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
var hashedPassword;
var path = path_1.getDatafilePath + 'users' + '/' + 'users.json';
var companyDetials = path_2.getCompanyDatafilePath + 'detials' + '/' + 'companyFiles.json';
var users;
var newObj;
var NewUsers;
var NewUsersList;
var Already = false;
var obj = {
    user: [],
    RequierPassword: true,
    usersList: false,
};
var userList = [];
function loadfile() {
    try {
        users = jsonfile.readFileSync(path);
        users.user.forEach(function (user) {
            userList.push(user);
        });
    }
    catch (error) {
        jsonfile.writeFileSync(path, obj);
        users = jsonfile.readFileSync(path);
    }
}
loadfile();
var UserReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case types_1.USER_LOG_IN:
            var userLog;
            if (userList[0]) {
                userList.forEach(function (user) {
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
                        }
                        else {
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
                    }
                    else {
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
            }
            else {
                var compDetials = jsonfile.readFileSync(companyDetials);
                if (passwordHash.verify(action.payload.password, compDetials.password)) {
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
                    }
                    else {
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
                }
                else {
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
        case types_1.NEW_USER:
            if (action.type === types_1.NEW_USER) {
                NewUsers = jsonfile.readFileSync(path);
                NewUsers.user.forEach(function (user) {
                    if (user.user === action.payload.newUser.user) {
                        Already = true;
                    }
                    else {
                        Already = false;
                    }
                });
                if (!Already) {
                    var uerData;
                    hashedPassword = passwordHash.generate(action.payload.newUser.pass);
                    action.payload.newUser.pass = hashedPassword;
                    if (action.payload.newUser.Privileges === 'Adim') {
                        action.payload.newUser.Privileges = true;
                    }
                    else {
                        action.payload.newUser.Privileges = false;
                    }
                    NewUsers.user.push(action.payload.newUser);
                    NewUsers.usersList = true;
                    newObj = NewUsers;
                    jsonfile.writeFileSync(path, newObj);
                    NewUsersList = jsonfile.readFileSync(path);
                    return NewUsersList;
                }
                else {
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
exports.default = UserReducer;
//# sourceMappingURL=User.js.map