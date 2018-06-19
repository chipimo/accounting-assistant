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
var react_md_1 = require("react-md");
var SideView_1 = require("./views/SideView");
var UserDashboard_1 = require("./views/componentsViews/UserDashboard");
var socketIOClient = require('socket.io-client');
var Typography_1 = require("material-ui/Typography");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var material_ui_1 = require("material-ui");
var Mail_1 = require("material-ui-icons/Mail");
var Settings_1 = require("material-ui-icons/Settings");
var Events_1 = require("../../events/Events");
var socketUrl = 'http://localhost:3200';
var WindowUi = /** @class */ (function (_super) {
    __extends(WindowUi, _super);
    function WindowUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            socket: null,
            ConntionState: '',
            users: [],
        };
        _this.checkActiveRoute = function () {
            _this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(function (element) {
                if (element.ActiveRoute) {
                    React.createElement(react_router_dom_1.Redirect, { to: element.ActiveRoute });
                }
            });
        };
        _this.initiSocket = function () {
            var socket = socketIOClient(socketUrl);
            socket.on('connect', function () {
                _this.setState({ ConntionState: 'Connted to server' });
            });
            socket.on('NEW_TILL', _this.newEvent);
            // socket.emit('PRIVATE_MESSAGE', { reciver: 'main', sender: 'tail1' });
            _this.setState({ socket: socket });
        };
        _this.newEvent = function (e) {
            _this.props.dispatchEvent({ type: 'NEW_TILL' });
        };
        _this.setUser = function (user) {
            var socket = _this.state.socket;
            socket.emit(Events_1.USER_CONNECTED, user);
            _this.state.users.push(user);
        };
        _this.UserLogout = function (user) {
            var socket = _this.state.socket;
            socket.emit(Events_1.LOGOUT, user);
            var old = _this.state.users;
            _this.setState({ user: user });
        };
        return _this;
    }
    WindowUi.prototype.componentWillMount = function () {
        this.initiSocket();
        this.checkActiveRoute();
    };
    WindowUi.prototype.render = function () {
        var ConntionState = this.state.ConntionState;
        var socket = this.state.socket;
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", { style: { height: '100vh', width: '100%', background: '#fff' } },
                React.createElement(react_md_1.Paper, { style: {
                        width: 300,
                        height: '100vh',
                        background: '#FAFAFA',
                        zIndex: 2,
                        overflow: 'auto',
                    } },
                    React.createElement(SideView_1.default, null)),
                React.createElement(react_md_1.Paper, { style: {
                        width: 1070,
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        background: '#fff',
                    } },
                    React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement(react_md_1.Paper, { style: {
                                    height: 50,
                                    padding: 10,
                                    background: '#F5F5F5',
                                    borderColor: 'transparent',
                                    borderStyle: 'solid',
                                    borderWidth: 3,
                                    borderTopColor: '#C4C0BE',
                                } },
                                React.createElement(Typography_1.default, { variant: "subheading", gutterBottom: true },
                                    "Haeder items here",
                                    React.createElement("div", { style: { marginLeft: 910, marginTop: -30 } },
                                        React.createElement(material_ui_1.IconButton, null,
                                            React.createElement(Mail_1.default, null)),
                                        React.createElement(material_ui_1.IconButton, null,
                                            React.createElement(Settings_1.default, null)))))),
                        React.createElement("div", null,
                            React.createElement(UserDashboard_1.default, { socket: socket }),
                            React.createElement(react_router_dom_1.Route, { path: "/Users", component: UserDashboard_1.default })))))));
    };
    return WindowUi;
}(React.Component));
function mapStateToProps(state) {
    return {
        details: state.company,
        routes: state.routes,
        user: state.user,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WindowUi);
//# sourceMappingURL=windowUi.js.map