import React from "react";
import ReactDOM from "react-dom";
import Route from "../routes";
import { Provider } from "react-redux";
import store from "../store";
import * as action from "../store/actions";

store.dispatch(action.authCheck());

function Index() {
    return (
        <div className="IndexContainer">
            <Route />
        </div>
    );
}

export default Index;

if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <Index />
        </Provider>,
        document.getElementById("root")
    );
}
