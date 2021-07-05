import * as ActionTypes from "../action-type";

export function authCheck() {
    return {
        type: ActionTypes.AUTH_CHECK
    };
}

export function authLogin(payload) {
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    };
}

export function authLogout(payload) {
    return {
        type: ActionTypes.AUTH_LOGOUT
    };
}

export function uploadPost(payload) {
    return {
        payload,
        type: ActionTypes.UPLOAD_POST
    };
}

export function uploadProfileData(payload) {
    return {
        type: ActionTypes.FETCH_PROFILE_DATA,
        payload
    };
}

export function uploadUsersData(payload) {
    return {
        type: ActionTypes.FETCH_USER_DATA,
        payload
    };
}
