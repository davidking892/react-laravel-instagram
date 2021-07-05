import Http from "./Http";
import * as action from "../store/actions";

export const fetchProfileData = () => {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/profile")
                .then(res => {
                    dispatch(action.uploadProfileData(res.data));
                    return resolve(res.data);
                })
                .catch(err => {
                    const { status, errors } = err.response.data;
                    if (status === 401) {
                        dispatch(action.authLogout());
                    }
                    return reject(data);
                });
        });
};

export const fetchUsersData = () => {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/users")
                .then(res => {
                    dispatch(action.uploadUsersData(res.data));
                    return resolve(res.data);
                })
                .catch(err => {
                    const { status, errors } = err.resoponse.data;
                    const data = { status, errors };
                    return reject(data);
                });
        });
};

export const updateProfile = credentials => {
    const config = {
        headers: { "Content-Type": "multipart/form-data" }
    };
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/profile/update", credentials, config)
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    console.log(err);
                    const { status, errors } = err.response.data;
                    const data = { status, errors };

                    return reject(data);
                });
        });
};

export const uploadPost = credentials => {
    const config = {
        headers: { "content-Type": "multipart/form-data" }
    };
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/p", credentials, config)
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    const { status, errors } = err.response.data;
                    const data = { status, errors };
                    return reject(data);
                });
        });
};
