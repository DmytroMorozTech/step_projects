import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import SubscriptionsAllList from "./SubscriptionsAllList";
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
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    wrapper: {
        marginTop: 80,

    }
}));

function UserList(props) {
    const {users, active_user} = props;
    const activeUser = users.filter(user => user._id === active_user)[0];
    let usersWithoutActiveUser = users.filter(user => user._id !== active_user);
    let otherUsers = usersWithoutActiveUser.filter((el) => !activeUser.subscriptions.includes(el._id))

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>Your Recommendations</div>
            <Card className={classes.root}>
                <CardContent>
                    <List dense className={classes.root}>
                        <div>
                            {otherUsers.length > 0 ? otherUsers.map((other, i) => <SubscriptionsAllList
                                    key={other._id} active_user={active_user} activeUser={activeUser} subscriber={other}
                                    index={i}/>) :
                                <div>Oooops! There are no recommendations for you :(</div>}
                        </div>
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

UserList.propTypes = {
    users: PropTypes.array,
    active_user: PropTypes.string
};


const mapStateToProps = (state) => {
    return {
        users: state.users.usersList,
        active_user: state.users.activeUser
    };
};

export default connect(mapStateToProps)(UserList);