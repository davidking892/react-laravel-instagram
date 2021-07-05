import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../pages/Dashboard";
import Post from "../pages/Post";
import EditProfile from "../pages/EditProfile";
import Users from "../pages/Users";

const routes = [
    {
        path: "/",
        exact: true,
        component: Dashboard,
        auth: true
    },
    {
        path: "/register",
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: "/login",
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: "/post",
        exact: true,
        component: Post
    },
    {
        path: "/users",
        exact: true,
        component: Users
    },
    {
        path: "/edit",
        exact: true,
        component: EditProfile
    }
];

export default routes;
