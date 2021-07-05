import axios from "axios";
import store from "../store";

const token = localStorage.getItem("access_token");

axios.defaults.headers.common.Authorization = `Bearer ${token}`;

axios.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default axios;
