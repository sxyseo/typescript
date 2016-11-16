"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
require('./index.scss');
var getClassName = function (current, index) {
    if (current === index) {
        return 'beside';
    }
    if (current - 1 === index || current + 1 === index) {
        return 'beside';
    }
    if (current - 2 === index || current + 2 === index) {
        return 'behind';
    }
    return '';
};
var TimePicker = (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker(data) {
        _super.call(this);
        var hour = data.hour, minute = data.minute;
        this.state = {
            hour: hour || 0,
            minute: minute || 0,
            hourTop: hour ? -hour * 32 : 0,
            minuteTop: minute ? -minute * 32 : 0
        };
    }
    TimePicker.prototype.componentWillReceiveProps = function (nextProps) {
        var hour = nextProps.hour, minute = nextProps.minute;
        this.setState({
            hour: hour || 0,
            minute: minute || 0,
            hourTop: hour ? -hour * 32 : 0,
            minuteTop: minute ? -minute * 32 : 0
        });
    };
    TimePicker.prototype.clickHandle = function () {
        this.props.getPickedData(('0' + this.state.hour).slice(-2) + ":" + ('0' + this.state.minute).slice(-2));
    };
    TimePicker.prototype.touchStart = function (ev) {
        // console.log('start');
        var _a = ev.targetTouches[0], pageX = _a.pageX, pageY = _a.pageY;
        this.startX = pageX;
        this.startY = pageY;
        if (pageX > window.innerWidth / 2) {
            this.type = 'minute';
        }
        else {
            this.type = 'hour';
        }
    };
    TimePicker.prototype.touchMove = function (ev) {
        ev.preventDefault();
        var _a = ev.targetTouches[0], pageX = _a.pageX, pageY = _a.pageY;
        var _b = this.state, hourTop = _b.hourTop, minuteTop = _b.minuteTop;
        var X = pageX - this.startX;
        var Y = pageY - this.startY;
        var speed = Math.abs(Y) < 8 ? 8 : Math.abs(Y);
        var baseTop = this.type === 'hour' ? hourTop : minuteTop;
        var iDistance = -baseTop % 32;
        if (Math.abs(Y) > Math.abs(X) && Y > 0) {
            var nextTop = baseTop < 0 ? baseTop + speed : 15;
            var value = -parseInt((nextTop / 32) + '');
            // console.log("top 2 bottom");
            if (this.type === 'hour') {
                this.setState({
                    hour: value,
                    hourTop: nextTop
                });
            }
            else {
                this.setState({
                    minute: value,
                    minuteTop: nextTop
                });
            }
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
            // console.log("bottom 2 top");
            if (this.type === 'hour') {
                var nextTop = 32 * 23 + baseTop > speed ? baseTop - speed : -32 * 23 - 15;
                var value = -parseInt((nextTop / 32) + '');
                this.setState({
                    hour: value,
                    hourTop: nextTop
                });
            }
            else {
                var nextTop = 32 * 59 + baseTop > speed ? baseTop - speed : -32 * 59 - 15;
                var value = -parseInt((nextTop / 32) + '') + (iDistance > 15 ? 1 : 0);
                this.setState({
                    minute: value,
                    minuteTop: nextTop
                });
            }
        }
        this.startX = pageX;
        this.startY = pageY;
    };
    TimePicker.prototype.touchEnd = function () {
        var baseTop = this.type === 'hour' ? this.state.hourTop : this.state.minuteTop;
        var iDistance = -baseTop % 32;
        var value = -parseInt((baseTop / 32) + '') + (iDistance > 15 ? 1 : 0);
        // console.log(baseTop, iDistance)
        if (this.type === 'hour') {
            this.setState({
                hour: value,
                hourTop: value * -32
            });
        }
        else {
            this.setState({
                minute: value,
                minuteTop: value * -32
            });
        }
    };
    TimePicker.prototype.getHours = function (isOption) {
        var hour = this.state.hour;
        var temp = [];
        var i = 0;
        while (i < 24) {
            if (isOption) {
                temp.push(<li key={i} className={getClassName(hour, i)}>{('0' + i).slice(-2)}</li>);
            }
            else {
                temp.push(<li key={i}>{('0' + i).slice(-2)}</li>);
            }
            i++;
        }
        return temp;
    };
    TimePicker.prototype.getMinutes = function (isOption) {
        var minute = this.state.minute;
        var temp = [];
        var i = 0;
        while (i < 60) {
            if (isOption) {
                temp.push(<li key={i} className={getClassName(minute, i)}>{('0' + i).slice(-2)}</li>);
            }
            else {
                temp.push(<li key={i}>{('0' + i).slice(-2)}</li>);
            }
            i++;
        }
        return temp;
    };
    TimePicker.prototype.render = function () {
        return (<div className="timepicker" style={{ transform: 'translateY(' + (this.props.wheelviewDisplay ? 0 : '120%') + ')' }} onTouchStart={this.touchStart.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchEnd={this.touchEnd.bind(this)}>
                <div className="optionPicker">
                    <ul className="hoursList" style={{ transform: 'translateY(' + (this.state.hourTop + 32 * 3) + 'px)' }}>{this.getHours(true)}</ul>
                    <ul className="minutesList" style={{ transform: 'translateY(' + (this.state.minuteTop + 32 * 3) + 'px)' }}>{this.getMinutes(true)}</ul>
                </div>
                <div className="maskPicker"></div>
                <div className="currentPicker">
                    <ul className="hoursList" style={{ transform: 'translateY(' + this.state.hourTop + 'px)' }}>{this.getHours(false)}</ul>
                    <ul className="minutesList" style={{ transform: 'translateY(' + this.state.minuteTop + 'px)' }}>{this.getMinutes(false)}</ul>
                    <span className="hourMark">时</span>
                    <span className="minuteMark">分</span>
                </div>
                <button className="button" onClick={this.clickHandle.bind(this)}>确&nbsp;定</button>
            </div>);
    };
    return TimePicker;
}(React.Component));
exports.TimePicker = TimePicker;
//# sourceMappingURL=index.js.map