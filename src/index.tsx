import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/index.scss";
import * as serviceWorker from "./serviceWorker";
import "prismjs/themes/prism-tomorrow.css";
import apiInterpreter from "./utils/baseStatement";
import { Loops } from "./template/api";

apiInterpreter.init([Loops]);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
