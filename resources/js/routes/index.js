import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./route";
import Public from "./Public";

const Routes = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route, index) => {
                    return <Public key={index} {...route} />;
                })}
            </Switch>
        </Router>
    );s
};

export default Routes;
