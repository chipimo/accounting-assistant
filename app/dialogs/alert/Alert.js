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
var semantic_ui_react_1 = require("semantic-ui-react");
var material_ui_1 = require("material-ui");
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { active: false, flip: '', content: null, height: 300 };
        _this.flip = function (e) {
            if (e === 'open') {
                _this.setState({ flip: 'flip' });
            }
            else {
                _this.setState({ flip: '' });
            }
        };
        _this.HandleOnChange = function (e, content, type) {
            if (type === 'msg') {
                _this.setState({ height: 100 });
            }
            else {
                _this.setState({ height: 300 });
            }
            if (e) {
                _this.setState({ active: true });
                _this.setState({ content: content });
                setTimeout(function () {
                    _this.setState({ flip: 'flip' });
                }, 500);
            }
            else {
                _this.setState({ active: false });
                setTimeout(function () {
                    _this.setState({ flip: '' });
                }, 500);
            }
        };
        _this.handleShow = function () {
            _this.setState({ active: true });
            setTimeout(function () {
                _this.setState({ flip: 'flip' });
            }, 500);
        };
        _this.handleHide = function () {
            _this.setState({ active: false });
            setTimeout(function () {
                _this.setState({ flip: '' });
            }, 500);
        };
        return _this;
    }
    Alert.prototype.componentDidMount = function () { };
    Alert.prototype.render = function () {
        var _this = this;
        var _a = this.state, active = _a.active, flip = _a.flip, content = _a.content, height = _a.height;
        return (React.createElement(semantic_ui_react_1.Dimmer, { active: active, page: true, onClickOutside: this.handleHide },
            React.createElement("div", { className: 'panel ' + flip, style: {
                    width: '50%',
                    margin: 'auto',
                    marginTop: 130,
                    paddingTop: 150,
                    paddingLeft: 50,
                } },
                React.createElement("div", { className: "front", style: {
                        background: 'transparent',
                        height: 300,
                        width: 600,
                        borderRadius: 5,
                        transition: 'all 0.5s',
                    } }),
                React.createElement("div", { className: "back", style: {
                        background: '#fff',
                        height: height,
                        width: 600,
                        color: '#3b3b3b',
                        borderRadius: 5,
                        transition: 'all 0.5s',
                        textAlign: 'left',
                    } },
                    content,
                    React.createElement("div", { style: { marginLeft: 10, marginTop: 100 } },
                        React.createElement(material_ui_1.Button, { style: { marginRight: 20 }, onClick: function () { return _this.handleHide(); }, variant: "raised", color: "primary" }, "try again"),
                        React.createElement(material_ui_1.Button, { variant: "raised" }, "Need help ?"))))));
    };
    return Alert;
}(React.Component));
exports.default = Alert;
//# sourceMappingURL=Alert.js.map