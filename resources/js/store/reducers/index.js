import { combineReducers } from "redux";
import Auth from "./Auth";
import Profile from "./Profile";
import User from "./User";

const RootReducer = combineReducers({
    Auth,
    Profile,
    User
});

export default RootReducer;
