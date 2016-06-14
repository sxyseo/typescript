"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DialogComponent = (function (_super) {
    __extends(DialogComponent, _super);
    function DialogComponent() {
        _super.apply(this, arguments);
    }
    DialogComponent.prototype.render = function () {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    };
    return DialogComponent;
}(React.Component));
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.js.map