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
var react_md_2 = require("react-md");
var Group_1 = require("material-ui-icons/Group");
var ShoppingCart_1 = require("material-ui-icons/ShoppingCart");
var Assessment_1 = require("material-ui-icons/Assessment");
var Typography_1 = require("material-ui/Typography");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var call = 0;
var SideView = /** @class */ (function (_super) {
    __extends(SideView, _super);
    function SideView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            usersActive: 'transparent',
            ShoppingCartActive: 'transparent',
            AssessmentActive: 'transparent',
            GeneralLedger: 'transparent',
            ManagementReports: 'transparent',
            FinanicalState: 'transparent',
        };
        _this.setActiveList = function (e) {
            if (e === '/Users') {
                _this.setState({
                    usersActive: '#D4D4D4',
                    ShoppingCartActive: 'transparent',
                    AssessmentActive: 'transparent',
                    GeneralLedger: 'transparent',
                    ManagementReports: 'transparent',
                    FinanicalState: 'transparent',
                });
            }
            else if (e === '/Sales') {
                _this.setState({
                    usersActive: 'transparent',
                    ShoppingCartActive: '#D4D4D4',
                    AssessmentActive: 'transparent',
                    GeneralLedger: 'transparent',
                    ManagementReports: 'transparent',
                    FinanicalState: 'transparent',
                });
            }
            else if (e === '/StockControl') {
                _this.setState({
                    usersActive: 'transparent',
                    ShoppingCartActive: 'transparent',
                    AssessmentActive: '#D4D4D4',
                    GeneralLedger: 'transparent',
                    ManagementReports: 'transparent',
                    FinanicalState: 'transparent',
                });
            }
            else if (e === '/GeneralLedger') {
                _this.setState({
                    usersActive: 'transparent',
                    ShoppingCartActive: 'transparent',
                    AssessmentActive: 'transparent',
                    GeneralLedger: '#D4D4D4',
                    ManagementReports: 'transparent',
                    FinanicalState: 'transparent',
                });
            }
            else if (e === '/ManagementReports') {
                _this.setState({
                    usersActive: 'transparent',
                    ShoppingCartActive: 'transparent',
                    AssessmentActive: 'transparent',
                    GeneralLedger: 'transparent',
                    ManagementReports: '#D4D4D4',
                    FinanicalState: 'transparent',
                });
            }
            else if (e === '/FinanicalState') {
                _this.setState({
                    usersActive: 'transparent',
                    ShoppingCartActive: 'transparent',
                    AssessmentActive: 'transparent',
                    GeneralLedger: 'transparent',
                    ManagementReports: 'transparent',
                    FinanicalState: '#D4D4D4',
                });
            }
        };
        _this.__appendRoutes = function () {
            if (call === 0) {
                _this.props.dispatchEvent({
                    type: 'AppendRoutes',
                    payload: {
                        type: 'Parent_secondary',
                        routes: {
                            name: 'accounts',
                            Users: [{ main: '/Users', child: [] }],
                            Sales: [{ main: '/Sales', child: [] }],
                            StockControl: [{ main: '/StockControl', child: [] }],
                            GeneralLedger: [{ main: '/GeneralLedger', child: [] }],
                            ManagementReports: [{ main: '/ManagementReports', child: [] }],
                            FinanicalState: [{ main: '/FinanicalState', child: [] }],
                        },
                        ActiveRoute: '/Users',
                    },
                });
                call = 1;
            }
        };
        _this.checkForRoutes = function () {
            if (Object.keys(_this.props.routes.routes.ParentLeftSideBarRoutes_secondary)
                .length === 0) {
                _this.__appendRoutes();
            }
            else {
                var isAvelabel = false;
                _this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(function (element) {
                    if (element.name === 'accounts') {
                        isAvelabel = true;
                    }
                });
                if (!isAvelabel) {
                    _this.__appendRoutes();
                }
            }
        };
        _this.checkActiveRoute = function () {
            _this.props.routes.routes.ParentLeftSideBarRoutes_secondary.forEach(function (element) {
                if (element.ActiveRoute) {
                    _this.setActiveList(element.ActiveRoute);
                }
            });
        };
        return _this;
    }
    SideView.prototype.componentWillMount = function () {
        this.checkForRoutes();
        this.checkActiveRoute();
    };
    SideView.prototype.render = function () {
        var _this = this;
        var _a = this.state, usersActive = _a.usersActive, ShoppingCartActive = _a.ShoppingCartActive, AssessmentActive = _a.AssessmentActive, GeneralLedger = _a.GeneralLedger, ManagementReports = _a.ManagementReports, FinanicalState = _a.FinanicalState;
        return (React.createElement("div", null,
            React.createElement(react_md_1.Paper, { style: { height: 50, padding: 10, background: '#3F51B5', color: '#fff ' } },
                React.createElement(Typography_1.default, { variant: "title", color: 'inherit', gutterBottom: true }, this.props.details.name)),
            React.createElement("div", null,
                React.createElement(react_md_2.List, { style: { background: 'transparent' } },
                    React.createElement(react_md_2.Subheader, { primaryText: "Control panel" }),
                    React.createElement(react_md_2.ListItem, { leftAvatar: React.createElement(react_md_2.Avatar, { icon: React.createElement(Group_1.default, null) }), primaryText: "Users", primaryTextClassName: "list-item", contentStyle: {
                            borderColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderBottomColor: usersActive,
                        }, onClick: function () {
                            _this.setActiveList('/Users');
                            _this.props.dispatchEvent({
                                type: 'activeLink',
                                payload: {
                                    type: 'Parent_secondary',
                                    link: '/Users',
                                },
                            });
                        }, secondaryText: "we have 30 users" },
                        React.createElement(react_router_dom_1.NavLink, { to: "/Users", style: {
                                width: '100%',
                                marginLeft: -16,
                                height: 52,
                                position: 'absolute',
                            } })),
                    React.createElement(react_md_2.ListItem, { leftAvatar: React.createElement(react_md_2.Avatar, { icon: React.createElement(ShoppingCart_1.default, null) }), primaryText: "Sales control", contentStyle: {
                            borderColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderBottomColor: ShoppingCartActive,
                        }, primaryTextClassName: "list-item", onClick: function () {
                            _this.setActiveList('/Sales');
                            _this.props.dispatchEvent({
                                type: 'activeLink',
                                payload: {
                                    type: 'Parent_secondary',
                                    link: '/Sales',
                                },
                            });
                        }, secondaryText: "Jan 17, 2014" }),
                    React.createElement(react_md_2.ListItem, { leftAvatar: React.createElement(react_md_2.Avatar, { icon: React.createElement(Assessment_1.default, null) }), primaryText: "Stock control", contentStyle: {
                            borderColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderBottomColor: AssessmentActive,
                        }, primaryTextClassName: "list-item", onClick: function () {
                            _this.setActiveList('/StockControl');
                            _this.props.dispatchEvent({
                                type: 'activeLink',
                                payload: {
                                    type: 'Parent_secondary',
                                    link: '/StockControl',
                                },
                            });
                        }, secondaryText: "Jan 28, 2014" }),
                    React.createElement(react_md_2.Divider, { inset: true }),
                    React.createElement(react_md_2.Subheader, { primaryText: "Financial annaliysis" }),
                    React.createElement(react_md_2.ListItem, { leftAvatar: React.createElement(react_md_2.Avatar, { suffix: "amber", icon: React.createElement(Group_1.default, null) }), primaryText: "General (Nominal) Ledger", contentStyle: {
                            borderColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderBottomColor: GeneralLedger,
                        }, onClick: function () {
                            _this.setActiveList('/GeneralLedger');
                            _this.props.dispatchEvent({
                                type: 'activeLink',
                                payload: {
                                    type: 'Parent_secondary',
                                    link: '/GeneralLedger',
                                },
                            });
                        }, primaryTextClassName: "list-item", secondaryText: "Jan 20, 2014" }),
                    React.createElement(react_md_2.ListItem, { leftAvatar: React.createElement(react_md_2.Avatar, { suffix: "amber", icon: React.createElement(Group_1.default, null) }), primaryText: "Management reports", primaryTextClassName: "list-item", contentStyle: {
                            borderColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderBottomColor: ManagementReports,
                        }, onClick: function () {
                            _this.setActiveList('/ManagementReports');
                            _this.props.dispatchEvent({
                                type: 'activeLink',
                                payload: {
                                    type: 'Parent_secondary',
                                    link: '/ManagementReports',
                                },
                            });
                        }, secondaryText: "Jan 10, 2014" }),
                    React.createElement(react_md_2.Divider, { inset: true }),
                    React.createElement(react_md_2.Subheader, { primaryText: "Financial state" }),
                    React.createElement(react_md_2.ListItem, { leftAvatar: React.createElement(react_md_2.Avatar, { suffix: "blue", icon: React.createElement(Group_1.default, null) }), primaryText: "Finanical state", primaryTextClassName: "list-item", contentStyle: {
                            borderColor: 'transparent',
                            borderStyle: 'solid',
                            borderWidth: 2,
                            borderBottomColor: FinanicalState,
                        }, onClick: function () {
                            _this.setActiveList('/FinanicalState');
                            _this.props.dispatchEvent({
                                type: 'activeLink',
                                payload: {
                                    type: 'Parent_secondary',
                                    link: '/FinanicalState',
                                },
                            });
                        }, secondaryText: "Jan 10, 2014" })))));
    };
    return SideView;
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SideView);
//# sourceMappingURL=SideView.js.map