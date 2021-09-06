import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import fbuserdataReducer from './fbuserdataReducer'

export const appReducer = combineReducers({loginReducer, fbuserdataReducer})                                                                                      