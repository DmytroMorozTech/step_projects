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
    link: {
        textDecoration: 'none',
        fontSize: 16,
    }
}))

function SubscriptionsAllList(props) {
    const {subscriber, activeUser, index, active_user} = props
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <NavLink to={`/account/${subscriber._id}`}>
                <Image
                    key={index}
                    cloudName="dan-insta-step"
                    publicId={subscriber.avatar_url}
                    width="80"
                    crop="scale">
                    <Transformation height="150" width="150" crop="fill" radius="max"/>
                </Image>
            </NavLink>
            <div>
                <div className={classes.username}>
                    <NavLink className={classes.link} to={`/account/${subscriber._id}`}>
                        {subscriber && subscriber.username}
                    </NavLink>
                </div>
                <div className={classes.name}>{subscriber && subscriber.name} {subscriber && subscriber.surname}</div>
                <div className={classes.inheritance}>{activeUser.subscribers.includes(subscriber._id) ? 'Your subscriber' : null}</div>
            </div>
            <div className={classes.button}><Button onClick={()=> dispatch(toggleSubscription(active_user, subscriber._id)) }
                                                    color="primary" >Subscribe</Button></div>
        </div>
    )
}

export default SubscriptionsAllList