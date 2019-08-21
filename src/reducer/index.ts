import { combineReducers } from "redux";
import baseApi from "./baseApi";
import progress from "./progress";

export default combineReducers({ baseApi, progress });
