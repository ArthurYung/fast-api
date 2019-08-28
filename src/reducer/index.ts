import { combineReducers } from "redux";
import baseApi from "./baseApi";
import progress from "./progress";
import currCode from "./currCode";
import history from "./history";
export default combineReducers({ currCode, baseApi, progress, history });
