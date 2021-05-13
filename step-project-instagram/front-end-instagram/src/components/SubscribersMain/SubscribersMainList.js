import React from "react";
import {Image, Transformation} from "cloudinary-react";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: 10,
        marginLeft: 10,
    },
    username: {
        marginLeft: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    name: {
        marginLeft: 10,
        marginTop: 5,
        color: 'grey',
    },
    inheritance: {
        color: 'grey',
        marginLeft: 10,
        marginTop: 5,
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
        marginLeft: 'auto',
        marginRight: 40,
    },
    postHeadLink: {
        textDecoration: 'none',
        color: '#013B8A'
    },
}))

function SubscribersMainList(props) {
    const {subscription, users, index, active_user} = props
    const subscriberUser = users.filter(user => user._id === subscription)[0]
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavLink to={`/account/${subscription}`}>
                <Image
                    key={index}
                    cloudName="dan-insta-step"
                    publicId={subscriberUser.avatar_url}
                    width="50"
                    crop="scale">
                    <Transformation height="150" width="150" crop="fill" radius="max"/>
                </Image>
            </NavLink>
            <div>
                <div className={classes.username}>
                    <NavLink to={`/account/${subscription}`} className={classes.postHeadLink}>
                        {subscriberUser && subscriberUser.username}
                    </NavLink>
                </div>
                <div className={classes.name}>
                    {subscriberUser && subscriberUser.name + ' '}
                    {subscriberUser && subscriberUser.surname}
                </div>
            </div>
        </div>
    )
}

export default SubscribersMainList

