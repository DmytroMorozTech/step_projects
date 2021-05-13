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
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
        textDecoration: 'none',
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
        marginRight: 20,
    },
    postHeadLink: {
        textDecoration: 'none',
        color: '#013B8A'
    },

}))

function SubscriptionsMainList(props) {
    const {subscriber, active_user, index, activeUser} = props
    const dispatch = useDispatch();

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NavLink to={`/account/${subscriber._id}`} >
                <Image
                    key={index}
                    cloudName="dan-insta-step"
                    publicId={subscriber.avatar_url}
                    width="50"
                    crop="scale">
                    <Transformation height="150" width="150" crop="fill" radius="max"/>
                </Image>
            </NavLink>
            <div>
                <div className={classes.username}>
                    <NavLink to={`/account/${subscriber._id}`} className={classes.postHeadLink}>
                        {subscriber && subscriber.username}
                    </NavLink>
                    </div>
                <div className={classes.inheritance}>{activeUser.subscribers.includes(subscriber._id) ? 'Your subscriber' : null}</div>
            </div>
            <div className={classes.button}><Button onClick={()=> dispatch(toggleSubscription(active_user, subscriber._id)) }
                                                    color="primary" >Subscribe</Button></div>
        </div>
    )
}

export default SubscriptionsMainList