import { combineReducers } from "redux";
import value from "./reducer_value";
import page from "./reducer_page";

const reducers = combineReducers({ value, page });

export default reducers;
