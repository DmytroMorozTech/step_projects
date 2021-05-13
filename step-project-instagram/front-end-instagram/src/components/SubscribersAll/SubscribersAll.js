import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import SubscribersAllList from "./SubscribersAllList";
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
    root: {
        width: 960,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.background.paper,
        zIndex: 5,
        marginTop: 10
    },
    header: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    wrapper: {
        marginTop: 80,
    }
}));

function SubscribersMain(props) {
    const {users, active_user} = props;
    const activeUser = users.filter(user => user._id === active_user)[0];
    let otherUsers = activeUser.subscriptions.filter(( el ) => el !== active_user)

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>Your Subscriptions</div>
            <Card className={classes.root}>
                <CardContent>
                    <List dense className={classes.root}>
                        <div>
                            {otherUsers && otherUsers.length > 0 ? otherUsers && otherUsers.map(subscription =>
                                <SubscribersAllList key={subscription} active_user={active_user} subscription={subscription}
                                                    users={users}/>) :
                                <div>Oooops! You aren't subscribed to anyone :( </div>}
                        </div>
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

SubscribersMain.propTypes = {
    users: PropTypes.array,
    active_user: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        users: state.users.usersList,
        active_user: state.users.activeUser,

    };
};

export default connect(mapStateToProps)(SubscribersMain);