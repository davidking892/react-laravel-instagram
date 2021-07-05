import * as ActionTypes from "../action-type";

const initialState = {
    profile: [],
    posts: []
};

const fetchProfileData = (state, data) => {
    const { profile, posts } = data;
    const stateObj = Object.assign({}, state, {
        profile,
        posts
    });
    return stateObj;
};

const Profile = (state = initialState, { type, payload } = action) => {
    switch (type) {
        case ActionTypes.FETCH_PROFILE_DATA:
            return fetchProfileData(state, payload);
        default:
            return state;
    }
};

export default Profile;
