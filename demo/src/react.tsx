import * as React from "react";
import * as ReactDOM from "react-dom";

import { DialogComponent } from "./components/dialog/dialog";

function Dialog(config: {trigger: string, title: string, message: string}) {
    let props = config;
    ReactDOM.render(
        <DialogComponent { ...props } />,
        document.getElementById("ui-dialog")
    );
}

Dialog({
    trigger: 'J-dialog',
    title: 'dialog',
    message: 'this is a React dialog component'
});
