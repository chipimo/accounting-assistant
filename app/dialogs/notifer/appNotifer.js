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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Paper_1 = require("material-ui/Paper");
var close_1 = require("material-ui/svg-icons/navigation/close");
var IconButton_1 = require("material-ui/IconButton");
var react_redux_1 = require("react-redux");
var settings_1 = require("material-ui/svg-icons/action/settings");
var warning_1 = require("material-ui/svg-icons/alert/warning");
var error_outline_1 = require("material-ui/svg-icons/alert/error-outline");
var list_1 = require("material-ui/svg-icons/action/list");
var done_all_1 = require("material-ui/svg-icons/action/done-all");
var react_swipeable_views_1 = require("react-swipeable-views");
var DropDownMenu_1 = require("material-ui/DropDownMenu");
var List_1 = require("material-ui/List");
var info_outline_1 = require("material-ui/svg-icons/action/info-outline");
var Divider_1 = require("material-ui/Divider");
var Subheader_1 = require("material-ui/Subheader");
var Avatar_1 = require("material-ui/Avatar");
var colors_1 = require("material-ui/styles/colors");
var Checkbox_1 = require("material-ui/Checkbox");
var Toggle_1 = require("material-ui/Toggle");
var darkBaseTheme_1 = require("material-ui/styles/baseThemes/darkBaseTheme");
var lightBaseTheme_1 = require("material-ui/styles/baseThemes/lightBaseTheme");
var MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
var getMuiTheme_1 = require("material-ui/styles/getMuiTheme");
var renderer_1 = require("../../renderer");
var colors_2 = require("material-ui/styles/colors");
var more_vert_1 = require("material-ui/svg-icons/navigation/more-vert");
var MenuItem_1 = require("material-ui/MenuItem");
var path_1 = require("../../Reducers/dataFiles/path");
var dates_1 = require("../../components/date/dates");
var react_router_dom_1 = require("react-router-dom");
var FlatButton_1 = require("material-ui/FlatButton");
var path_2 = require("../../assets/path");
var audioFile = path_2.getAssetsPath + 'notifications' + '/' + 'to-the-point.mp3';
var audioPlayer;
var object_keys = 0;
var results = [];
var defaltMonth = '0' + dates_1.getMonth(new Date());
var month = dates_1.getMonthString(defaltMonth.slice(-2));
var count = 0;
var itemIndex = 0;
var __getFolders = function (dir) {
    var filesystem = require('fs');
    var removeItem = 'path.js';
    filesystem.readdirSync(dir).forEach(function (element) {
        results.push(element);
        count++;
        if (month === element) {
            itemIndex = count;
        }
    });
    results = results.filter(function (item) { return item !== removeItem; });
    return results;
};
var fullPath = path_1.getDatafilePath + '/' + 'statements' + '/' + 'stocks' + '/';
__getFolders(fullPath);
var isShowing = false;
var list = [];
var errorIcon = (React.createElement(error_outline_1.default, { color: "red", style: {
        position: 'fixed',
        marginLeft: 20,
        fontSize: 50,
    } }));
var SuccessIcon = (React.createElement(done_all_1.default, { color: "green", style: {
        position: 'fixed',
        marginLeft: 20,
        fontSize: 50,
    } }));
var InfoIcon = (React.createElement(info_outline_1.default, { color: "#fff", style: {
        position: 'fixed',
        marginLeft: 20,
        fontSize: 50,
    } }));
var ActionTryAgain = (React.createElement(FlatButton_1.default, { keyboardFocused: true, label: "Try again", primary: true, style: {
        backgroundColor: ' rgba(102, 240, 68, 0.377)',
        color: '#fff',
        marginRight: 20,
    } }));
var ActionsYesNo;
var AppNotifer = /** @class */ (function (_super) {
    __extends(AppNotifer, _super);
    function AppNotifer(props) {
        var _this = _super.call(this, props) || this;
        _this.audio = function () {
            audioPlayer = new Audio(audioFile);
            audioPlayer.play();
        };
        _this.auto = function (timeout) {
            setTimeout(function () {
                _this.__autoClose();
                isShowing = false;
                list = [];
            }, timeout);
        };
        _this.__autoClose = function () {
            if (_this.state.autoCloseTemp) {
                if (_this.state.listView) {
                    _this.setState({
                        errorList2: 'translate3d(0, -150vh, 0)',
                    });
                    setTimeout(function () {
                        _this.setState({
                            transform2: 'translate3d(0, -30vh, 0)',
                        });
                    }, 700);
                    setTimeout(function () {
                        _this.setState({
                            open: false,
                            closed: true,
                        });
                    }, 900);
                }
                else {
                    setTimeout(function () {
                        _this.setState({
                            transform2: 'translate3d(0, -30vh, 0)',
                        });
                    }, 700);
                    setTimeout(function () {
                        _this.setState({
                            open: false,
                            closed: true,
                        });
                    }, 900);
                }
            }
        };
        _this.close = function () {
            isShowing = false;
            list = [];
            if (_this.state.listView) {
                _this.setState({
                    errorList2: 'translate3d(0, -150vh, 0)',
                });
                setTimeout(function () {
                    _this.setState({
                        transform2: 'translate3d(0, -30vh, 0)',
                    });
                }, 700);
                setTimeout(function () {
                    _this.setState({
                        open: false,
                        closed: true,
                    });
                }, 900);
            }
            else {
                setTimeout(function () {
                    _this.setState({
                        transform2: 'translate3d(0, -30vh, 0)',
                    });
                }, 700);
                setTimeout(function () {
                    _this.setState({
                        open: false,
                        closed: true,
                    });
                }, 900);
            }
        };
        _this.open = function (e) {
            if (!isShowing) {
                if (e.sound)
                    _this.audio();
                if (e.msg) {
                    _this.setState({
                        message: e.msg,
                    });
                }
                if (e.autoClose) {
                    _this.setState({
                        autoCloseTemp: true,
                    });
                    _this.auto(e.autoClose);
                }
                if (e.list) {
                    e.list.map(function (group) {
                        list.push(group);
                    });
                }
                if (e.actions) {
                    if (e.actions.type === 'ActionsYesNo') {
                        _this.setState({
                            actions: ActionsYesNo,
                            request: e.actions.request,
                        });
                    }
                }
                if (e.type === 'error') {
                    _this.setState({ state: errorIcon });
                }
                else if (e.type === 'success') {
                    _this.setState({ state: SuccessIcon });
                }
                else if (e.type === 'info') {
                    _this.setState({ state: InfoIcon });
                }
                if (_this.state.closed) {
                    _this.setState({
                        open: true,
                        closed: false,
                    });
                    setTimeout(function () {
                        _this.setState({
                            transform2: 'translate3d(0, 0, 0)',
                        });
                        isShowing = true;
                    }, 700);
                    if (_this.props.notifications.auto_close) {
                        _this.setAutoClose(9000);
                    }
                }
            }
        };
        _this.InlineError = function (error) {
            if (error) {
                _this.setState({
                    InlineError: error,
                });
                _this.open;
            }
        };
        _this.closeList = function () {
            _this.setState({
                errorList2: 'translate3d(0, -150vh, 0)',
            });
        };
        _this.openListView = function (e) {
            if (e === 'list') {
                _this.setState({
                    errorList2: 'translate3d(0, 0, 0)',
                    index: 0,
                    listView: true,
                });
            }
            else {
                _this.setState({
                    errorList2: 'translate3d(0, 0, 0)',
                    index: 1,
                    listView: true,
                });
            }
        };
        _this.handleChangeMain = function (event) {
            _this.setState({
                index: event,
            });
        };
        _this.autoClose = function () {
            if (_this.props.notifications.auto_close) {
                _this.setState({
                    autoClose: false,
                });
            }
            else {
                _this.setState({
                    autoClose: true,
                });
            }
        };
        _this.setAutoClose = function (time) {
            if (_this.props.notifications.auto_close) {
                _this.auto(time);
            }
        };
        _this.ShowonStart = function () {
            if (_this.state.ShowonStart) {
                _this.setState({
                    ShowonStart: false,
                });
            }
            else {
                _this.setState({
                    ShowonStart: false,
                });
            }
        };
        _this.handleToggleChange = function (evant) {
            _this.setState({
                d_auto_close_toggle: !_this.state.d_auto_close_toggle,
            });
            _this.autoClose();
            renderer_1.default.dispatch({
                type: 'UPDATE',
                payload: { type: 'AUTO_CLOSE', state: _this.state.autoClose },
            });
        };
        _this.handleTheme = function (theme) {
            if (theme.palette.alternateTextColor === '#ffffff') {
                _this.setState({
                    lightTheme: true,
                    darkTheme: false,
                });
            }
            else {
                _this.setState({
                    darkTheme: true,
                    lightTheme: false,
                });
            }
            _this.setState({
                theme: theme,
            });
            renderer_1.default.dispatch({
                type: 'UPDATE',
                payload: { type: 'THEME', theme: theme },
            });
        };
        _this.handleClick = function (event) {
            // This prevents ghost click.
            event.preventDefault();
            _this.setState({
                openPoup: true,
                anchorEl: event.currentTarget,
            });
        };
        _this.handleRequestClose = function () {
            _this.setState({
                openPoup: false,
            });
        };
        _this.handleChange = function (event, index, value) {
            renderer_1.default.dispatch({
                type: 'ChangeMonth',
                payload: event.target.innerText,
            });
            _this.setState({
                selectedText: 'March',
            });
            _this.setState({ value: value });
        };
        _this.state = {
            transform2: 'translate3d(0, -30vh, 0)',
            errorList2: 'translate3d(0, -150vh, 0)',
            listView: false,
            index: 0,
            open: false,
            openPoup: false,
            autoClose: null,
            ShowonStart: false,
            autoCloseTemp: false,
            d_auto_close_toggle: false,
            auto_close_toggle: true,
            closed: true,
            theme: lightBaseTheme_1.default,
            lightTheme: null,
            darkTheme: null,
            value: itemIndex,
            selectedText: '',
            IconIndcator: React.createElement(warning_1.default, null),
            backgroundColor: colors_1.red400,
            IconIndcator2: React.createElement(done_all_1.default, null),
            backgroundColor2: colors_1.blue500,
            state: InfoIcon,
            actions: null,
            request: '',
            message: ' To view all the errors click on the list view icon to open error list, from there you can view and fix these errors ',
        };
        return _this;
    }
    AppNotifer.prototype.componentDidMount = function () {
        this.props.onRef(this);
        this.setState({
            autoClose: this.props.notifications.auto_close,
            theme: this.props.notifications.theme,
        });
        if (this.props.notifications.theme.palette.alternateTextColor === '#ffffff') {
            this.setState({
                lightTheme: true,
                darkTheme: false,
            });
        }
        else {
            this.setState({
                darkTheme: true,
                lightTheme: false,
            });
        }
    };
    AppNotifer.prototype.componentWillMount = function () {
        var keys = this.props.statementfiles.logs;
        object_keys = Object.keys(keys).length;
        this.setState({});
    };
    AppNotifer.prototype.componentWillUnmount = function () {
        this.props.onRef(undefined);
    };
    AppNotifer.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            autoClose: this.props.notifications.auto_close,
        });
        var keys = this.props.statementfiles.logs;
        if (keys) {
            var NOerrors = 0;
            var name;
            var ErrorMsg;
            keys.map(function (group) {
                if (group.state === 'Error')
                    NOerrors++;
                group.link, group.state;
            });
        }
    };
    AppNotifer.prototype.render = function () {
        var _this = this;
        var _a = this.state, index = _a.index, open = _a.open, autoClose = _a.autoClose, ShowonStart = _a.ShowonStart, d_auto_close_toggle = _a.d_auto_close_toggle, theme = _a.theme, lightTheme = _a.lightTheme, darkTheme = _a.darkTheme, openPoup = _a.openPoup, IconIndcator = _a.IconIndcator, backgroundColor = _a.backgroundColor, IconIndcator2 = _a.IconIndcator2, backgroundColor2 = _a.backgroundColor2, message = _a.message, state = _a.state, actions = _a.actions;
        ActionsYesNo = (React.createElement("div", { style: { marginTop: 10, marginLeft: 20 } },
            React.createElement("button", { onClick: function () { _this.props.ExcuteRequest(_this.state.request); _this.close(); }, style: {
                    backgroundColor: ' rgba(102, 240, 68, 0.377)',
                    color: '#fff',
                    marginRight: 20,
                    borderRadius: 2,
                    padding: 6,
                    border: 'none',
                    cursor: 'pointer',
                } }, "Yes go on"),
            React.createElement("button", { onClick: this.close, style: {
                    backgroundColor: 'rgba(241, 74, 74, 0.473)',
                    color: '#fff',
                    borderRadius: 2,
                    padding: 6,
                    cursor: 'pointer',
                    border: 'none',
                } }, "No thanks")));
        var keyItem = 0;
        var iconButtonElement = (React.createElement(IconButton_1.default, { touch: true, tooltip: "more", tooltipPosition: "bottom-left" },
            React.createElement(more_vert_1.default, { color: colors_2.grey400 })));
        if (open) {
            return (React.createElement(MuiThemeProvider_1.default, { muiTheme: getMuiTheme_1.default(theme) },
                React.createElement("div", { style: {
                        height: 100,
                        width: 500,
                        zIndex: 2000,
                        top: 20,
                        right: 10,
                        position: 'fixed',
                    }, onMouseLeave: function () {
                        _this.setState({
                            autoCloseTemp: true,
                        });
                        _this.setAutoClose(9000);
                    }, onMouseEnter: function () {
                        _this.setState({
                            autoCloseTemp: false,
                        });
                    } },
                    React.createElement(Paper_1.default, { style: {
                            height: 500,
                            width: 450,
                            marginTop: 120,
                            marginLeft: 23,
                            borderRadius: 5,
                            position: 'fixed',
                            transform: this.state.errorList2,
                        }, zDepth: 3 },
                        React.createElement("div", { style: { paddingTop: 10 } },
                            React.createElement(IconButton_1.default, { tooltip: "Close", onClick: this.closeList },
                                React.createElement(close_1.default, null)),
                            React.createElement(DropDownMenu_1.default, { value: this.state.value, onChange: this.handleChange }, results.map(function (results) { return (keyItem++,
                                (React.createElement(MenuItem_1.default, { value: keyItem, key: keyItem, primaryText: results }))); }))),
                        React.createElement("div", { style: {
                                paddingTop: 10,
                            } },
                            React.createElement(react_swipeable_views_1.default, { index: index, onChangeIndex: this.handleChangeMain },
                                React.createElement("div", { style: {
                                        overflow: 'auto',
                                        paddingBottom: 50,
                                        width: '95%',
                                        margin: 'auto',
                                        height: 395,
                                    } },
                                    React.createElement("div", { style: {
                                            width: '95%',
                                            margin: 'auto',
                                        } },
                                        React.createElement(Divider_1.default, { inset: true }),
                                        React.createElement(List_1.List, null, this.props.statementfiles.logs.map(function (group) {
                                            if (group.message.err.state === 'error') {
                                                return (React.createElement(List_1.ListItem, { leftAvatar: React.createElement(Avatar_1.default, { icon: IconIndcator, backgroundColor: backgroundColor }), key: group.id, primaryText: group.message.err.msg, secondaryText: React.createElement("p", null,
                                                        React.createElement("span", { style: { color: colors_2.lightBlue600 } }, group.date),
                                                        React.createElement("br", null),
                                                        group.message.err.state), secondaryTextLines: 2 },
                                                    React.createElement(react_router_dom_1.NavLink, { to: group.link, style: {
                                                            width: '100%',
                                                            marginLeft: -72,
                                                            marginTop: -20,
                                                            height: 90,
                                                            position: 'absolute',
                                                        } })));
                                            }
                                            else {
                                                return (React.createElement(List_1.ListItem, { leftAvatar: React.createElement(Avatar_1.default, { icon: IconIndcator2, backgroundColor: backgroundColor2 }), key: group.id, primaryText: group.message.err.msg, secondaryText: React.createElement("p", null,
                                                        React.createElement("span", { style: { color: colors_2.lightBlue600 } }, group.date),
                                                        React.createElement("br", null),
                                                        group.message.err.state), secondaryTextLines: 2 },
                                                    React.createElement(react_router_dom_1.NavLink, { to: group.link, style: {
                                                            width: '100%',
                                                            marginLeft: -72,
                                                            marginTop: -20,
                                                            height: 90,
                                                            position: 'absolute',
                                                        } })));
                                            }
                                        })),
                                        React.createElement(Divider_1.default, { inset: true }))),
                                React.createElement("div", { style: {
                                        overflow: 'auto',
                                        paddingBottom: 50,
                                        width: '90%',
                                        margin: 'auto',
                                        height: 395,
                                    } },
                                    React.createElement("div", { style: {
                                            width: '95%',
                                            margin: 'auto',
                                        } },
                                        React.createElement(List_1.List, null,
                                            React.createElement(Subheader_1.default, null, "Notification Settings"),
                                            React.createElement(List_1.ListItem, { primaryText: "Always auto close", rightToggle: React.createElement(Toggle_1.default, { onToggle: this.handleToggleChange.bind(this), defaultToggled: this.props.notifications.auto_close, toggle: d_auto_close_toggle.toString() }) })),
                                        React.createElement(Divider_1.default, null),
                                        React.createElement(List_1.List, null,
                                            React.createElement(Subheader_1.default, null, " Themes"),
                                            React.createElement(List_1.ListItem, { primaryText: "Light", leftCheckbox: React.createElement(Checkbox_1.default, { onClick: function () {
                                                        _this.handleTheme(lightBaseTheme_1.default);
                                                    }, checked: lightTheme }) }),
                                            React.createElement(List_1.ListItem, { primaryText: "Dark", leftCheckbox: React.createElement(Checkbox_1.default, { onClick: function () {
                                                        _this.handleTheme(darkBaseTheme_1.default);
                                                    }, checked: darkTheme }) }))))))),
                    React.createElement(Paper_1.default, { style: {
                            height: 150,
                            width: 500,
                            zIndex: 1,
                            borderRadius: '0 0 10 10',
                            padding: 10,
                            marginTop: -20,
                            transform: this.state.transform2,
                        }, zDepth: 5 },
                        React.createElement("div", null,
                            React.createElement("div", { style: {
                                    height: 10,
                                    width: 10,
                                    borderRadius: '50%',
                                    marginRight: 10,
                                    marginLeft: 10,
                                    marginTop: 10,
                                    position: 'absolute',
                                } }),
                            React.createElement("div", { style: { marginLeft: 30, paddingBottom: 20 } }, "Notification"),
                            React.createElement("div", null, state),
                            React.createElement("div", { style: {
                                    position: 'fixed',
                                    right: 20,
                                    marginTop: -50,
                                    fontSize: 10,
                                    marginLeft: 50,
                                } },
                                React.createElement(IconButton_1.default, { tooltip: "List view", onClick: function () {
                                        _this.openListView('list');
                                    } },
                                    React.createElement(list_1.default, { color: "#9C9C9C", hoverColor: "#EBEBEB" })),
                                React.createElement(IconButton_1.default, { tooltip: "Settings", onClick: function () {
                                        _this.openListView('settings');
                                    } },
                                    React.createElement(settings_1.default, { color: "#9C9C9C", hoverColor: "#EBEBEB" })),
                                React.createElement(IconButton_1.default, { tooltip: "Close", onClick: this.close },
                                    React.createElement(close_1.default, { color: "#9C9C9C", hoverColor: "#EBEBEB" }))),
                            React.createElement("div", { style: {
                                    width: '80%',
                                    height: 65,
                                    overflow: 'auto',
                                    marginLeft: 70,
                                    marginTop: -10,
                                } },
                                message,
                                React.createElement("div", null,
                                    React.createElement("ul", null, list.map(function (li) {
                                        return React.createElement("li", { key: li }, li);
                                    })))),
                            React.createElement("div", null, actions))))));
        }
        else {
            return null;
        }
    };
    return AppNotifer;
}(React.Component));
function mapStateToProps(state) {
    return {
        statementfiles: state.statementLogs,
        statements: state.statementOfaccounts,
        notifications: state.notifications,
    };
}
exports.default = react_redux_1.connect(mapStateToProps)(AppNotifer);
//# sourceMappingURL=appNotifer.js.map