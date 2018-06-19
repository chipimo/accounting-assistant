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
var Typography_1 = require("material-ui/Typography");
var react_router_dom_1 = require("react-router-dom");
var UserDashboard_1 = require("./componentsViews/UserDashboard");
var react_redux_1 = require("react-redux");
var Mainview = /** @class */ (function (_super) {
    __extends(Mainview, _super);
    function Mainview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkActiveRoute = function () {
            _this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(function (element) {
                if (element.ActiveRoute) {
                    React.createElement(react_router_dom_1.Redirect, { to: element.ActiveRoute });
                }
            });
        };
        return _this;
    }
    Mainview.prototype.componentWillMount = function () {
        this.checkActiveRoute();
    };
    Mainview.prototype.render = function () {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(react_md_1.Paper, { style: { height: 50, padding: 10 } },
                        React.createElement(Typography_1.default, { variant: "subheading", gutterBottom: true }, "Haeder items here"))),
                React.createElement("div", null,
                    React.createElement(react_router_dom_1.Route, { path: "/Users", component: UserDashboard_1.default })))));
    };
    return Mainview;
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Mainview);
//# sourceMappingURL=Mainview.js.map