"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("material-ui/TextField");
var Checkbox_1 = require("material-ui/Checkbox");
var AccountCircle_1 = require("material-ui-icons/AccountCircle");
var Button_1 = require("material-ui/Button");
var react_md_1 = require("react-md");
var react_redux_1 = require("react-redux");
var types_1 = require("../../../../actions/types");
// import WinDialog from '../../../../../dialogs/dialog';
var semantic_ui_react_1 = require("semantic-ui-react");
var IconButton_1 = require("material-ui/IconButton");
var Input_1 = require("material-ui/Input");
var Visibility_1 = require("material-ui-icons/Visibility");
var VisibilityOff_1 = require("material-ui-icons/VisibilityOff");
var Form_1 = require("material-ui/Form");
var usersList = false;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.HandleSubmit = function (data) {
            if (!_this.state.data.userName) {
                _this.setState({
                    EmailErrB: true,
                    PassErrB: false,
                    EmailErr: "Email can't be blank",
                    PassErr: '',
                });
            }
            else if (!_this.state.data.Password) {
                _this.setState({
                    EmailErr: '',
                    PassErrB: true,
                    EmailErrB: false,
                    PassErr: "Password can't be blank",
                });
            }
            else {
                if (usersList) {
                    _this.props.UpdateData({
                        type: types_1.USER_LOG_IN,
                        payload: {
                            name: _this.state.data.userName,
                            password: _this.state.data.Password,
                            KeepSignedIn: _this.state.signedIn,
                        },
                    });
                    _this.GetResponce('user');
                }
                else {
                    _this.props.UpdateData({
                        type: types_1.USER_LOG_IN,
                        payload: {
                            email: _this.state.data.userName,
                            password: _this.state.data.Password,
                        },
                    });
                    _this.GetResponce('entry');
                }
                _this.handleShow();
            }
        };
        _this.GetResponce = function (e) {
            setTimeout(function () {
                _this.props.user.user.forEach(function (user) {
                    if (user.state) {
                        _this.props.SignInSuccess(true);
                    }
                    else {
                        if (e === 'entry') {
                            if (!user.email) {
                                _this.setState({
                                    EmailErr: 'This email is not found',
                                    PassErr: '',
                                    EmailErrB: true,
                                    PassErrB: false,
                                });
                            }
                            else {
                                _this.setState({
                                    EmailErr: '',
                                    PassErr: 'The password is not correct',
                                    EmailErrB: false,
                                    PassErrB: true,
                                });
                            }
                        }
                        else {
                            if (!user.Username) {
                                _this.setState({
                                    EmailErrB: true,
                                    PassErrB: false,
                                    EmailErr: 'User name is not found',
                                    PassErr: '',
                                });
                            }
                            else {
                                _this.setState({
                                    EmailErrB: false,
                                    PassErrB: true,
                                    EmailErr: '',
                                    PassErr: 'The password is not correct',
                                });
                            }
                        }
                    }
                });
                _this.handleHide();
            }, 1000);
        };
        _this.handleChange = function (name) { return function (event) {
            _this.setState((_a = {}, _a[name] = event.target.checked, _a));
            var _a;
        }; };
        _this.HandleOnChange = function (e) {
            _this.setState({
                data: __assign({}, _this.state.data, (_a = {}, _a[e.target.name] = e.target.value, _a)),
                EmailErr: '',
                PassErr: '',
                EmailErrB: false,
                PassErrB: false,
            });
            var _a;
        };
        _this.handleMouseDownPassword = function (event) {
            event.preventDefault();
        };
        _this.handleClickShowPassword = function () {
            _this.setState({ showPassword: !_this.state.showPassword });
        };
        _this.handleShow = function () { return _this.setState({ active: true }); };
        _this.handleHide = function () { return _this.setState({ active: false }); };
        _this.state = {
            data: {
                userName: '',
                Password: '',
            },
            checked: false,
            EmailErr: '',
            PassErr: '',
            EmailErrB: false,
            PassErrB: false,
            active: false,
            CheckboxState: false,
            password: '',
            showPassword: false,
            signedIn: false,
        };
        return _this;
    }
    Login.prototype.componentWillMount = function () {
        if (this.props.user.usersList)
            usersList = true;
        if (!this.props.user.user[0]) {
            this.setState({
                CheckboxState: true,
            });
            usersList = false;
            // WinDialog({
            //   type: 'info',
            //   title: 'Sign in',
            //   message:
            //     'Since their are no users added yet, you can use your company email and password to sign in.',
            //   Action: false,
            // });
        }
    };
    Login.prototype.updateCheck = function () {
        this.setState(function (oldState) {
            return {
                checked: !oldState.checked,
            };
        });
    };
    Login.prototype.render = function () {
        var _a = this.state, data = _a.data, EmailErr = _a.EmailErr, PassErr = _a.PassErr;
        var _b = this.state, active = _b.active, CheckboxState = _b.CheckboxState, signedIn = _b.signedIn, PassErrB = _b.PassErrB, EmailErrB = _b.EmailErrB;
        return (React.createElement("div", null,
            React.createElement("div", { style: { paddingTop: 20, background: '#F3F3F3', height: '100vh' } },
                React.createElement("div", { style: { width: 500, margin: 'auto', textAlign: 'center' } },
                    React.createElement("h3", { className: "animated fadeIn mb-4" }, this.props.details.name)),
                React.createElement(react_md_1.Paper, { zDepth: 2, style: {
                        width: 500,
                        margin: 'auto',
                        background: '#fff',
                    } },
                    React.createElement(semantic_ui_react_1.Dimmer.Dimmable, { dimmed: active },
                        React.createElement(semantic_ui_react_1.Dimmer, { active: active, inverted: true },
                            React.createElement(semantic_ui_react_1.Loader, null, "Processing")),
                        React.createElement("div", { style: {
                                margin: 'auto',
                                width: 100,
                                height: 100,
                                paddingTop: 20,
                            } },
                            React.createElement(AccountCircle_1.default, { style: { width: 100, height: 100, color: '#ccc' } })),
                        React.createElement("div", { style: { textAlign: 'center', marginTop: 20 } }, "Sign in with your account"),
                        React.createElement("div", { style: { padding: 20, width: 300, margin: 'auto' } },
                            React.createElement(Form_1.FormControl, { error: true, "aria-describedby": "name-error-text" },
                                React.createElement(TextField_1.default, { error: EmailErrB, id: "with-placeholder", name: "userName", style: { width: 260 }, value: data.userName, onChange: this.HandleOnChange, label: "User name", type: "text", placeholder: "Placeholder", margin: "normal" }),
                                React.createElement(Form_1.FormHelperText, { id: "name-error-text" }, EmailErr)),
                            React.createElement("br", null),
                            React.createElement(Form_1.FormControl, { error: true, "aria-describedby": "name-error-text" },
                                React.createElement(TextField_1.default, { error: PassErrB, id: "adornment-password", style: { width: 260 }, type: this.state.showPassword ? 'text' : 'password', name: "Password", label: "Password", value: data.Password, onChange: this.HandleOnChange, InputProps: {
                                        endAdornment: (React.createElement(Input_1.InputAdornment, { position: "end" },
                                            React.createElement(IconButton_1.default, { "aria-label": "Toggle password visibility", onClick: this.handleClickShowPassword, onMouseDown: this.handleMouseDownPassword }, this.state.showPassword ? (React.createElement(VisibilityOff_1.default, null)) : (React.createElement(Visibility_1.default, null))))),
                                    } }),
                                React.createElement(Form_1.FormHelperText, { id: "name-error-text" }, PassErr)),
                            React.createElement("br", null),
                            React.createElement("div", { style: { marginTop: 30, paddingLeft: 5 } },
                                React.createElement(Button_1.default, { variant: "raised", style: { width: 250 }, color: "primary", onClick: this.HandleSubmit }, "Sign in")),
                            React.createElement("div", { style: {
                                    marginTop: 15,
                                    marginBottom: 20,
                                } },
                                React.createElement(Form_1.FormControlLabel, { control: React.createElement(Checkbox_1.default, { checked: this.state.signedIn, onChange: this.handleChange('signedIn'), value: "signedIn", disabled: CheckboxState }), label: "Keep me signed in" })),
                            React.createElement(semantic_ui_react_1.Divider, null),
                            React.createElement("div", { style: {
                                    marginTop: 15,
                                    marginBottom: 20,
                                    marginLeft: 40,
                                } })))))));
    };
    return Login;
}(React.Component));
function mapStateToProps(state) {
    return {
        details: state.company,
        user: state.user,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        UpdateData: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=login.js.map