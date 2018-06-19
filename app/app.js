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
var react_redux_1 = require("react-redux");
var semantic_ui_react_1 = require("semantic-ui-react");
var updateJsonFile = require('update-json-file');
var electron = require('electron');
var remote = electron.remote;
var path = 'acca_modules/Reducers/settings/appConfig/config.json';
var webFrame = require('electron').webFrame;
var semantic_ui_react_2 = require("semantic-ui-react");
var login_1 = require("./actions/auth/login");
var validator = require('email-validator');
var react_router_dom_1 = require("react-router-dom");
var react_md_1 = require("react-md");
// import WinDialog from '../dialogs/dialog';
var login_2 = require("./main/ui/forms/login/login");
var path_1 = require("./assets/path");
var windowUi_1 = require("./main/ui/windowUi");
var bg = path_1.getAssetsPath + 'img' + '/' + '2.jpg';
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger(props) {
        var _this = _super.call(this, props) || this;
        _this.setSignIn = function (e) {
            _this.setState({
                loggedIn: e,
            });
        };
        _this.state = {
            loggedIn: true,
        };
        return _this;
    }
    Logger.prototype.componentWillMount = function () { };
    Logger.prototype.render = function () {
        var loggedIn = this.state.loggedIn;
        return (React.createElement("div", null,
            loggedIn && React.createElement("div", null,
                React.createElement(windowUi_1.default, null)),
            !loggedIn && React.createElement(login_2.default, { SignInSuccess: this.setSignIn })));
    };
    return Logger;
}(React.Component));
var styles = {
    Singup: {
        width: '50%',
        padding: 20,
        background: '#fff',
        margin: 'auto',
    },
};
var Accapp = /** @class */ (function (_super) {
    __extends(Accapp, _super);
    function Accapp(props) {
        var _this = _super.call(this, props) || this;
        _this.HandleOnTextChange = function (e) {
            if (e.target.name === 'email') {
                if (!validator.validate(e.target.value)) {
                    if (e.target.value) {
                        _this.setState({
                            errors: __assign({}, _this.state.errors, (_a = {}, _a[e.target.name] = '- ( Invelid email )', _a)),
                            data: __assign({}, _this.state.data, (_b = {}, _b[e.target.name] = e.target.value, _b)),
                            isEmail: true,
                        });
                    }
                    else {
                        _this.setState({
                            errors: __assign({}, _this.state.errors, (_c = {}, _c[e.target.name] = '- ( Email is required )', _c)),
                            data: __assign({}, _this.state.data, (_d = {}, _d[e.target.name] = e.target.value, _d)),
                            isEmail: true,
                        });
                    }
                }
                else {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_e = {}, _e[e.target.name] = '', _e)),
                        data: __assign({}, _this.state.data, (_f = {}, _f[e.target.name] = e.target.value, _f)),
                        isEmail: false,
                    });
                }
            }
            else if (e.target.name === 'businessName') {
                if (e.target.value === '') {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_g = {}, _g[e.target.name] = '- ( Business name is required )', _g)),
                        data: __assign({}, _this.state.data, (_h = {}, _h[e.target.name] = e.target.value, _h)),
                    });
                }
                else {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_j = {}, _j[e.target.name] = '', _j)),
                        data: __assign({}, _this.state.data, (_k = {}, _k[e.target.name] = e.target.value, _k)),
                    });
                }
            }
            else if (e.target.name === 'contact') {
                if (e.target.value === '') {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_l = {}, _l[e.target.name] = '- ( Contact number is required )', _l)),
                        data: __assign({}, _this.state.data, (_m = {}, _m[e.target.name] = e.target.value, _m)),
                    });
                }
                else {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_o = {}, _o[e.target.name] = '', _o)),
                        data: __assign({}, _this.state.data, (_p = {}, _p[e.target.name] = e.target.value, _p)),
                    });
                }
            }
            else if (e.target.name === 'password') {
                if (e.target.value === '') {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_q = {}, _q[e.target.name] = '- ( Password is required )', _q)),
                        data: __assign({}, _this.state.data, (_r = {}, _r[e.target.name] = e.target.value, _r)),
                    });
                }
                else {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, (_s = {}, _s[e.target.name] = '', _s)),
                        data: __assign({}, _this.state.data, (_t = {}, _t[e.target.name] = e.target.value, _t)),
                    });
                }
            }
            else if (e.target.name === 'confirmPass') {
                _this.setState({
                    errors: __assign({}, _this.state.errors, { confirmPass: '' }),
                    data: __assign({}, _this.state.data, (_u = {}, _u[e.target.name] = e.target.value, _u)),
                });
            }
            else {
                _this.setState({
                    formState: '',
                    data: __assign({}, _this.state.data, (_v = {}, _v[e.target.name] = e.target.value, _v)),
                });
            }
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        };
        _this.checkFormState = function () {
            var cleared = false;
            Object.keys(_this.state.data).map(function (data) {
                if (!_this.state.data.businessName) {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, { businessName: '- ( Business name is required )' }),
                    });
                    return;
                }
                else if (!_this.state.data.email) {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, { email: '- ( Email is required )' }),
                        isEmail: true,
                    });
                    return;
                }
                else if (!_this.state.data.contact) {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, { contact: '- ( contact is required )' }),
                    });
                    return;
                }
                else if (!_this.state.data.password) {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, { password: '- ( Password is required )' }),
                    });
                    return;
                }
                else if (!_this.state.data.confirmPass) {
                    _this.setState({
                        errors: __assign({}, _this.state.errors, { confirmPass: '- ( You must confirm your password )' }),
                    });
                    return;
                }
                else {
                    var password = _this.state.data.password;
                    if (!validator.validate(_this.state.data.email)) {
                        _this.setState({
                            errors: __assign({}, _this.state.errors, { email: '- ( Invelid email )' }),
                            isEmail: true,
                        });
                        return;
                    }
                    else if (password.length < 6) {
                        _this.setState({
                            errors: __assign({}, _this.state.errors, { password: '- ( Password too short must be 6 or more charecters )' }),
                        });
                        return;
                    }
                    else if (_this.state.data.confirmPass !== _this.state.data.password) {
                        _this.setState({
                            errors: __assign({}, _this.state.errors, { confirmPass: "- ( This password didn't march )" }),
                        });
                        return;
                    }
                    else {
                        cleared = true;
                    }
                }
            });
            if (cleared)
                _this.submit(_this.state.data);
        };
        _this.data = function (value) {
            switch (value) {
                case 'details':
                    return _this.props.details;
                case 'country':
                    return _this.props.countries;
                default:
                    return null;
            }
        };
        _this.LoginData = function (data) { };
        _this.fileChangedHandler = function (event) {
            var file = event.target.files[0].path.replace(/\\/g, "/");
            _this.setState({
                data: __assign({}, _this.state.data, { selectedFile: file }),
            });
        };
        _this.submit = function (data) {
            _this.setState({ formLoader: true });
            setTimeout(function () {
                _this.props
                    .login(data)
                    .then(function (e) {
                    _this.setState({
                        formLoader: false,
                        isSet: false,
                    });
                    // WinDialog({
                    //   type: 'info',
                    //   title: 'Regstration successfull',
                    //   Action: true,
                    //   message:
                    //     'Thank you for choseing Accounting Assistant, please valify your cloud and Mobile pleate forms by valifying your email. \n press ok to Sign in',
                    // });
                })
                    .catch(function (err) {
                    try {
                        if (err.response.data.errors) {
                            _this.setState({
                                globleError: err.response.data.errors.global,
                                formLoader: false,
                                msgError: true,
                                msgIcon: 'warning sign',
                                msgHeader: err.response.data.errors.msgHeader,
                            });
                        }
                    }
                    catch (error) {
                        _this.setState({
                            msgError: true,
                            msgIcon: 'warning sign',
                            msgHeader: 'Connection Error',
                            globleError: 'You are not connected to the internet. Connect to the internet and try again',
                            formLoader: false,
                        });
                    }
                });
            }, 500);
        };
        _this.state = {
            Component: null,
            store: {},
            activeThemeLight: null,
            activeThemeDark: null,
            msgError: false,
            msgIcon: 'gift',
            msgHeader: 'Welcome to Accounting Assistant!',
            globleError: 'Fill out the form below to sign-up for a new account',
            errors: {
                businessName: '',
                email: '',
                contact: '',
                website: '',
                password: '',
                confirmPass: '',
            },
            formLoader: false,
            isEmail: false,
            submit: false,
            data: {
                businessName: '',
                email: '',
                contact: '',
                website: '',
                password: '',
                confirmPass: '',
                selectedFile: null,
            },
            isSet: false,
        };
        return _this;
    }
    Accapp.prototype.componentWillMount = function () {
        if (!this.props.details.name ||
            !this.props.details.api_key ||
            !this.props.details.id ||
            !this.props.details.password) {
            this.setState({
                isSet: false,
            });
        }
        else {
            this.setState({
                isSet: true,
            });
        }
    };
    Accapp.prototype.render = function () {
        var _a = this.state, appTheme = _a.appTheme, Component = _a.Component, isEmail = _a.isEmail, submit = _a.submit, isSet = _a.isSet;
        var _b = this.state, data = _b.data, errors = _b.errors, formLoader = _b.formLoader, globleError = _b.globleError, msgHeader = _b.msgHeader, msgIcon = _b.msgIcon, msgError = _b.msgError;
        if (this.state.isSet) {
            return (React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement(Logger, { submitLoginData: this.LoginData, data: this.props.details, isRemmebered: this.props.user.KeepSignedIn }))));
        }
        else {
            return (React.createElement("div", { style: {
                    background: 'linear-gradient(to bottom right, #37B9E9, #1BBCB1)',
                    backgroundImage: 'url(' + bg + ')',
                    backgroundSize: 'caver',
                    backgroundRepeat: 'no-repeat',
                    paddingTop: 20,
                    height: '100vh',
                } },
                React.createElement(react_md_1.Paper, { style: styles.Singup, zDepth: 2 },
                    React.createElement("div", { style: { fontSize: 20, marginBottom: 8 } }, "Sign up"),
                    React.createElement("div", null,
                        React.createElement(semantic_ui_react_2.Message, { attached: true, icon: true, error: msgError },
                            React.createElement(semantic_ui_react_2.Icon, { name: msgIcon, loading: false }),
                            React.createElement(semantic_ui_react_2.Message.Content, null,
                                React.createElement(semantic_ui_react_2.Message.Header, null, msgHeader),
                                globleError)),
                        React.createElement(semantic_ui_react_2.Form, { loading: formLoader, onSubmit: this.checkFormState, className: "attached fluid segment", style: { color: '#B73A38' } },
                            React.createElement(semantic_ui_react_2.Form.Group, { widths: "equal" },
                                React.createElement(semantic_ui_react_2.Form.Input, { error: !!errors.businessName, name: "businessName", value: data.businessName, onChange: this.HandleOnTextChange, fluid: true, label: "Business Name " + errors.businessName, placeholder: "Business Name", type: "text" }),
                                React.createElement(semantic_ui_react_2.Form.Input, { error: isEmail, name: "email", value: data.email, onChange: this.HandleOnTextChange, fluid: true, label: "Email " + errors.email, placeholder: "business@example.com", type: "text" })),
                            React.createElement(semantic_ui_react_2.Form.Group, { widths: "equal" },
                                React.createElement(semantic_ui_react_2.Form.Input, { name: "website", value: data.website, onChange: this.HandleOnTextChange, fluid: true, label: "Website", placeholder: "Business Website", type: "text" }),
                                React.createElement(semantic_ui_react_2.Form.Input, { error: !!errors.contact, name: "contact", value: data.contact, onChange: this.HandleOnTextChange, fluid: true, label: "Business contact " + errors.contact, placeholder: "contact number", type: "number" })),
                            React.createElement(semantic_ui_react_2.Form.Input, { error: !!errors.password, name: "password", value: data.password, onChange: this.HandleOnTextChange, label: "Password " + errors.password, placeholder: "Make it secure", type: "password" }),
                            React.createElement(semantic_ui_react_2.Form.Input, { label: "Confirm Password " + errors.confirmPass, type: "password", name: "confirmPass", value: data.confirmPass, onChange: this.HandleOnTextChange, error: !!errors.confirmPass }),
                            React.createElement(semantic_ui_react_1.Label, null, "business Logo"),
                            React.createElement("input", { type: "file", onChange: this.fileChangedHandler }),
                            React.createElement(semantic_ui_react_2.Form.Checkbox, { inline: true, label: "I agree to the terms and conditions" }),
                            React.createElement(semantic_ui_react_1.Button, { color: "blue", disabled: submit }, "Submit")),
                        React.createElement(semantic_ui_react_2.Message, { attached: "bottom", warning: true },
                            React.createElement(semantic_ui_react_2.Icon, { name: "help" }),
                            "Already signed up?\u00A0",
                            React.createElement("a", { href: "#" }, "Login here"),
                            "\u00A0instead.")))));
        }
    };
    return Accapp;
}(React.Component));
function mapStateToProps(state) {
    return {
        details: state.company,
        user: state.user,
    };
}
exports.default = react_redux_1.connect(mapStateToProps, { login: login_1.login })(Accapp);
//# sourceMappingURL=app.js.map