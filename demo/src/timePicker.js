"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var timePicker_1 = require("./components/timePicker");
require('./styles/reset.scss');
var CustimizeList = (function (_super) {
    __extends(CustimizeList, _super);
    function CustimizeList() {
        _super.call(this);
        this.state = {
            wheelviewDisplay: false,
            time: '00:00'
        };
    }
    CustimizeList.prototype.showTimePicker = function (type) {
        this.setState({
            wheelviewDisplay: true
        });
    };
    CustimizeList.prototype.getPickedData = function (time) {
        this.setState({
            wheelviewDisplay: false,
            time: time
        });
    };
    CustimizeList.prototype.change = function () {
    };
    CustimizeList.prototype.render = function () {
        var _a = this.state.time.split(':'), hour = _a[0], minute = _a[1];
        return (<div>
                <input type="text" value={this.state.time} onChange={this.change} onClick={this.showTimePicker.bind(this)}/>
                <timePicker_1.TimePicker hour={+hour} minute={+minute} wheelviewDisplay={this.state.wheelviewDisplay} getPickedData={this.getPickedData.bind(this)}/>
            </div>);
    };
    return CustimizeList;
}(React.Component));
exports.CustimizeList = CustimizeList;
ReactDOM.render(<CustimizeList />, document.getElementById('container'));
//# sourceMappingURL=timePicker.js.map