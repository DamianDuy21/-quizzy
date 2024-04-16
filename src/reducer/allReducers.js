import { combineReducers } from "redux";
import { AuthenReducer } from "./authenReducer";
import { UserReducer } from "./userReducer";

const AllReducers = combineReducers({
    AuthenReducer, UserReducer
})

export default AllReducers