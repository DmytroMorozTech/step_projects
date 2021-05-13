import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import SubscriptionsMainList from "./SubscriptionsMainList";
import {NavLink} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 20,
        backgroundColor: theme.palette.background.paper,
        zIndex: 5,
    },
    pos: {
        display: 'inline-block',
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 16,
    },
    all: {
        display: 'inline-block',
        marginRight: 0,
        fontWeight: 700,
        fontSize: 16,
        textDecoration: 'none',
        color: '#000',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: -5,
    },
    userwrapper: {
        marginLeft: 10,
        marginTop: 10,
    },
    avatar: {
        width: 50,
        height: 50,
    },
}));

function SubscribersBlock(props) {

    const {users, active_user} = props;

    const activeUser = users.filter(user => user._id === active_user)[0];
    let usersWithoutActiveUser = users.filter(user => user._id !== active_user);
    let otherUsers = usersWithoutActiveUser.filter(( el ) => !activeUser.subscriptions.includes(el._id)).slice(0, 3)

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <List dense className={classes.main}>
                    <div className={classes.header}>
                        <Typography className={classes.pos} color="textSecondary">People you may know</Typography>
                        <NavLink to="/users" className={classes.all} activeClassName='active'>Show All</NavLink>
                    </div>
                    <div className={classes.subwrap}>
                        {otherUsers.length > 0 ? otherUsers.map((other, i) => <SubscriptionsMainList key={other._id} active_user={active_user} activeUser = {activeUser} subscriber={other} index={i}/>):
                            <div>Oooops! There are no recommendations for you :(</div>}
                    </div>
                </List>
            </CardContent>
        </Card>
    );
}

export default SubscribersBlock

