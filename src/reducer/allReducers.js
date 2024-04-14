import { combineReducers } from "redux";
import { AuthenReducer } from "./authenReducer";

const AllReducers = combineReducers({
    AuthenReducer,
})

export default AllReducers