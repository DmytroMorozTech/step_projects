import React from "react";
import {Image, Transformation} from "cloudinary-react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {toggleSubscription} from "../../redux/users/usersActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: 10,
        marginLeft: 10,
    },
    username: {
        marginLeft: 10,
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 16,
    },
    name: {
        marginLeft: 10,
        marginTop: 10,
        color: 'grey',
        fontSize: 16,
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
    link: {
        textDecoration: 'none',
        fontSize: 16,
    }
}))

function SubscribersAllList(props) {
    const {subscription, active_user, users, index} = props
    const subscriberUser = users.filter(user => user._id === subscription)[0]
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavLink to={`/account/${subscription}`}>
                <Image
                    key={index}
                    cloudName="dan-insta-step"
                    publicId={subscriberUser.avatar_url}
                    width="80"
                    crop="scale">
                    <Transformation height="150" width="150" crop="fill" radius="max"/>
                </Image>
            </NavLink>
            <div>
                <div className={classes.username}>
                    <NavLink className={classes.link} to={`/account/${subscription}`}>
                        {subscriberUser && subscriberUser.username}
                    </NavLink>
                </div>
                <div
                    className={classes.name}>{subscriberUser && subscriberUser.name + ' '}
                    {subscriberUser && subscriberUser.surname}
                </div>
            </div>
            <div className={classes.button}><Button
                onClick={() => dispatch(toggleSubscription(active_user, subscription))} variant="outlined"
                color="secondary">Unsubscribe</Button></div>
        </div>

    )
}

export default SubscribersAllList