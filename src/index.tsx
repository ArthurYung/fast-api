import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/index.scss";
import "prismjs/themes/prism-tomorrow.css";
import apiInterpreter from "./utils/baseStatement";
import * as serviceWorker from "./serviceWorker";
import { Loops } from "./template/api";
import { initDB } from "./utils/indexDB";
import "./utils/worker";
apiInterpreter.init([Loops]);
initDB();

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
