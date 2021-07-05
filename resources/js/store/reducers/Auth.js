import * as ActionTypes from "../action-type";
import Http from "../../service/Http";

const defaultUser = {
    id: null,
    name: null,
    email: null
};

const initialState = {
    isAuthenticated: false,
    user: defaultUser
};

const authLogin = (state, payload) => {
    const { access_token: AccessToken, user } = payload;
    localStorage.setItem("access_token", AccessToken);
    localStorage.setItem("user", JSON.stringify(user));
    Http.defaults.headers.common.Authorization = `Bearer ${AccessToken}`;
    const stateObj = Object.assign({}, state, {
        isAuthenticated: true,
        user
    });
    return stateObj;
};

const checkAuth = state => {
    const token = localStorage.getItem("access_token");

    const stateObj = Object.assign({}, state, {
        isAuthenticated: token,
        user: JSON.parse(localStorage.getItem("user"))
    });

    if (state.isAuthenticated) {
        Http.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    return stateObj;
};

const authLogout = state => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    const stateObj = Object.assign({}, state, {
        isAuthenticated: false,
        user: defaultUser
    });
    return stateObj;
};

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_CHECK:
            return checkAuth(state);
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state, action.payload);
        case ActionTypes.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
};

export default Auth;
