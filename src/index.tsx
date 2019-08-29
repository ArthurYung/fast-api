import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/index.scss";
import "prismjs/themes/prism-tomorrow.css";
import apiInterpreter from "./utils/baseStatement";
import * as serviceWorker from "./serviceWorker";
import { Loops, Element, ArRay, Json } from "./template/api";
import { initDB } from "./utils/indexDB";
// import * as worker from "./utils/worker";
// worker.addWorkerWatcher((e) => {});
apiInterpreter.init([Loops, Element, Json, ArRay]);
initDB();

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
