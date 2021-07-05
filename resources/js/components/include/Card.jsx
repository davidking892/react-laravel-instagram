import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@material-ui/core";
import { profileImage } from "../../service/ProfileImage";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345
    }
}));

export default function UserCard(props) {
    const classes = useStyles();

    const { name, email } = props.user;
    const { description, image } = props.profile;

    return (
        <Grid className="m-2" item md={3}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={profileImage(image)}
                            aria-label="profile"
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={email}
                    subheader={name}
                />

                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
