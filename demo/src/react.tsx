import * as React from "react";
import * as ReactDOM from "react-dom";

import { DialogComponent } from "./components/dialog";

ReactDOM.render(
    <DialogComponent compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);
