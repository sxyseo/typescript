"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
require('./dialog.scss');
var DialogComponent = (function (_super) {
    __extends(DialogComponent, _super);
    function DialogComponent(props) {
        _super.call(this);
        this.state = { item: null, show: false };
        document.getElementById(props.trigger).addEventListener('click', this.show.bind(this), false);
    }
    DialogComponent.prototype.show = function (e) {
        e.preventDefault();
        this.setState({ show: true });
    };
    DialogComponent.prototype.close = function (e) {
        e.preventDefault();
        this.setState({ show: false });
    };
    DialogComponent.prototype.render = function () {
        return (<div className="dialog" style={{ display: this.state.show === false ? 'none' : 'block' }}>
                <div className="dialog-overlayer">
                    <div className="dialog-box">
                        <div className="dialog-head">
                            <a href="javascript:;" className="dialog-close" onClick={this.close.bind(this)}>X</a>
                            {this.props.title}
                        </div>
                        <div className="dialog-content">{this.props.message}</div>
                        <div className="dialog-foot"></div>
                    </div>
                </div>
            </div>);
    };
    return DialogComponent;
}(React.Component));
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.js.map