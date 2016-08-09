"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var ReactDOM = require("react-dom");
var dialog_1 = require("./components/dialog");
function Dialog(config) {
    var props = config;
    ReactDOM.render(<dialog_1.DialogComponent {...props}/>, document.getElementById("ui-dialog"));
}
Dialog({
    trigger: 'J-dialog',
    title: 'dialog',
    message: 'this is a React dialog component'
});
//# sourceMappingURL=dialog.js.map