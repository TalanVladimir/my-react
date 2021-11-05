import { combineReducers } from "redux";
import value from "./reducer_value";
import page from "./reducer_page";
import user from "./reducer_user";
import email from "./reducer_email";

const reducers = combineReducers({ value, page, user, email });

export default reducers;
