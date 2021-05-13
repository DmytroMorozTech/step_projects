import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {toggleSubscription} from "../../redux/users/usersActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
    },
    personalHeaderTop: {
        display: 'flex'
    },
    personalHeaderMid: {
        display: 'flex',
        margin: '20px 0px 20px 0px'
    },
    textMargin: {
        margin: '0px 20px 0px 20px'
    }
}))

function PersonalCard(props) {
    const classes = useStyles()
    const {user, activeUser} = props
    const dispatch = useDispatch()

    return (
        <Grid>
            <Paper className={classes.paper}>
                <Grid className={classes.personalHeaderTop}>
                    <Typography variant='h6' className={classes.textMargin}>
                        {user && user.username}
                    </Typography>
                    {user._id === activeUser ? null : user.subscribers && !user.subscribers.includes(activeUser) ? <Button onClick={()=> dispatch(toggleSubscription(activeUser, user._id)) } variant="outlined" color="primary">
                            Subscribe
                        </Button>
                        : <Button onClick={()=> dispatch(toggleSubscription(activeUser, user._id)) } variant="outlined" color="secondary">
                            Unsubscribe
                        </Button>}
                </Grid>
                <Grid className={classes.personalHeaderMid}>
                    <Typography variant='body2' className={classes.textMargin}>
                        {user.posts && user.posts.length} posts
                    </Typography>
                    <Typography variant='body2' className={classes.textMargin}>
                        {user.subscribers && user.subscribers.length} followers
                    </Typography>
                    <Typography variant='body2' className={classes.textMargin}>
                        {user.subscriptions && user.subscriptions.length} following
                    </Typography>
                </Grid>
                <Typography variant='h6' className={classes.textMargin}>
                    {user && user.name + ' '}
                    {user && user.surname}
                </Typography>
            </Paper>
        </Grid>
    );
}

export default PersonalCard;