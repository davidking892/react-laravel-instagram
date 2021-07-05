import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { fetchProfileData } from "../service/DataService";
import { Link } from "react-router-dom";
import * as action from "../store/actions";
import ShowProfile from "../pages/ShowProfile";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.props
            .dispatch(fetchProfileData())
            .then(res => {
                console.log(res.status);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useStyle = makeStyles(theme => ({
        root: {
            flexGrow: 1
        }
    }));

    logOut = () => {
        this.props.dispatch(action.authLogout());
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/login" }
        };

        if (!this.props.isAuthenticated) {
            return <Redirect to={from} replace />;
        }

        const classes = this.useStyle;

        const { id: user_Id } = this.props.user;

        return (
            <div className={classes.root}>
                <Grid className="justify-content-end mt-4" container>
                    <Grid xs={3} item>
                        <Button
                            className="mx-2"
                            variant="contained"
                            color="secondary"
                        >
                            <Link to="/users">Users</Link>
                        </Button>
                        <Button onClick={this.logOut} variant="contained">
                            LogOut
                        </Button>
                    </Grid>
                </Grid>
                <ShowProfile user_id={user_Id} profile={this.props.profile} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    profile: state.Profile.profile
});

export default connect(mapStateToProps)(Dashboard);
