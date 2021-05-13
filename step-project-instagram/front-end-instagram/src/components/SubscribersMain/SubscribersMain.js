import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import {Image, Transformation} from "cloudinary-react";
import SubscribersMainList from "./SubscribersMainList";
import {NavLink} from "react-router-dom";
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        pos: {
            display: 'inline-block',
            marginLeft: 10,
            fontWeight: 'bold',
        },
        all: {
            display: 'inline-block',
            marginRight: 12,
            fontWeight: 700,
            textDecoration: 'none',
            color: '#000',
            fontSize: 16,
        },
        header: {
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between'
        },
        name: {
            marginRight: 5,
            color: 'grey',
            fontSize: 16
        },
        username: {
            fontWeight: 700,
        },
        surname: {
            color: 'grey',
            fontSize: 16,
        },
        wrapper: {
            display: 'flex',
            marginTop: -10,
        },
        userwrapper: {
            marginLeft: 10,
            marginTop: 10,
        },
        avatar: {
            width: 50,
            height: 50,
        },
        list: {
            width: 500,
            height: 200,
            overflow: 'auto',
        },
        postHeadLink: {
            textDecoration: 'none',
            color: '#013B8A'
        },
    })
);

function SubscribersMain(props) {
    const {users, active_user} = props;
    const activeUser = users.filter(user => user._id === active_user)[0];
    let otherUsers = activeUser.subscriptions.filter(( el ) => el !== active_user)

    const classes = useStyles();

    return (
        <div>
            <NavLink to={`/account/${active_user}`}>
                <Image
                    key={active_user}
                    cloudName="dan-insta-step"
                    publicId={activeUser && activeUser.avatar_url}
                    width="80"
                    crop="fill">
                    <Transformation background="#fafafa" height="150" width="150" crop="fill" radius="max"/>
                </Image>
            </NavLink>
            <div className={classes.userwrapper}>
                <div className={classes.username}>
                    <NavLink className={classes.postHeadLink} to={`/account/${active_user}`}>
                        {activeUser && activeUser.username}
                    </NavLink>
                </div>
                <span className={classes.name}>{activeUser && activeUser.name}</span>
                <span className={classes.surname}>{activeUser && activeUser.surname}</span>
            </div>
            <Card>
                <div className={classes.wrapper}>
                    <List className={classes.root}>
                        <div className={classes.header}>
                            <Typography className={classes.pos} color="textSecondary"
                                        gutterBottom>Subscriptions</Typography>
                            <NavLink to="/subscribers" className={classes.all} activeClassName='active'>Show
                                All</NavLink>
                        </div>
                        <ListItem>
                            <div className={classes.root}>
                                <div className={classes.list}>
                                    {activeUser && otherUsers.length > 0 ? activeUser && otherUsers.map((subscription, i) =>
                                        <SubscribersMainList key={i} subscription={subscription} users={users}
                                                             active_user={active_user}/>) :
                                        <div>Oooops! You aren't subscribed to anyone :(</div>}
                                </div>
                            </div>
                        </ListItem>
                    </List>
                </div>
            </Card>
        </div>
    )
}


export default SubscribersMain
