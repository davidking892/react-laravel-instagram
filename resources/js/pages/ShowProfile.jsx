import React, { Component } from "react";
import ShowPost from "../pages/ShowPost";
import { profileImage } from "../service/ProfileImage";
import { Image } from "react-bootstrap";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class ShowProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            title,
            description,
            url,
            id: profile_Id,
            image
        } = this.props.profile;

        return (
            <div>
                <Grid
                    className="  p-4 justify-content-center align-items-center"
                    container
                    spacing={3}
                >
                    <Grid className="mt-4 pt-5" item xs={3}>
                        <Image
                            src={profileImage(image)}
                            className="w-100"
                            thumbnail
                        />
                    </Grid>
                    <Grid className="align-items-center" item xs={6}>
                        {profile_Id == this.props.user_id && (
                            <Link
                                to={{
                                    pathname: "/edit",
                                    state: {
                                        profile: this.props.profile
                                    }
                                }}
                            >
                                Edit Profile
                            </Link>
                        )}
                        <div className="d-flex mt-2">
                            <div className="pr-5">
                                <strong>10k</strong> posts
                            </div>
                            <div className="pr-5">
                                <strong>25k</strong> followers
                            </div>
                            <div className="pr-5">
                                <strong>32k</strong> following
                            </div>
                        </div>
                        <Typography
                            className="mt-2"
                            variant="h5"
                            component="h5"
                        >
                            {title}
                        </Typography>
                        <Typography className="mt-2">{description}</Typography>
                        <div>
                            <Link to="/">{url}</Link>
                            <Button
                                className="mx-2"
                                variant="contained"
                                color="primary"
                            >
                                <Link to="/post">Upload Post</Link>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                <div className="container">
                    <ShowPost />
                </div>
            </div>
        );
    }
}
export default ShowProfile;
