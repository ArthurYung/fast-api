import { combineReducers } from "redux";
import baseApi from "./baseApi";
import progress from "./progress";
import history from "./history";
export default combineReducers({ baseApi, progress, history });
