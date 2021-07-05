import React, { Component } from "react";
import UserCard from "../components/include/Card";
import { Paper, TextField, Grid } from "@material-ui/core";
import { fetchUsersData } from "../service/DataService";
import { connect } from "react-redux";

class Users extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(fetchUsersData()).catch(err => {
            console.log(err);
        });
    }

    handleChange = e => {};

    onKeyPress = e => {
        if (e.key === "Enter") {
            this.onSubmit(searchTerm);
        }
    };

    onSubmit() {}

    findProfile = id => {
        let profile = this.props.profiles.find(item => item.user_id === id);
        return profile;
    };

    render() {
        const { users } = this.props;
        return (
            <>
                <Grid container className="justify-content-center my-5">
                    <Grid item md={10}>
                        <Paper elevation={6} style={{ padding: "25px" }}>
                            <TextField
                                fullWidth
                                label="Search..."
                                onChange={this.handleChange}
                                onKeyPress={this.onKeyPress}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container className="justify-content-center">
                    {users.map((item, index) => (
                        <UserCard
                            profile={this.findProfile(item.id)}
                            user={item}
                            key={index}
                        />
                    ))}
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    users: state.User.users,
    profiles: state.User.profiles
});

export default connect(mapStateToProps)(Users);
