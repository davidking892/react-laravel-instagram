import * as ActionType from "../action-type";

const initialState = {
    users: [],
    profiles: []
};

const fetchUserData = (state, userData) => {
    const stateObj = Object.assign({}, state, {
        users: userData.users.data,
        profiles: userData.profiles.data
    });
    return stateObj;
};

const User = (state = initialState, { type, payload } = action) => {
    switch (type) {
        case ActionType.FETCH_USER_DATA:
            return fetchUserData(state, payload);
        default:
            return state;
    }
};
export default User;
