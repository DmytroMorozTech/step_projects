import React from "react";
import SubscribersMain from "../SubscribersMain/SubscribersMain";
import SubscribersBlock from "../SubscriptionsRec/SubscriptionsMain";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'fixed',
        top: '14%',
        left: '68%',
    },
}))

function SubscribersWrapper(props) {
    const {users, active_user} = props

    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <SubscribersMain users={users} active_user={active_user}/>
            <SubscribersBlock users={users} active_user={active_user}/>
        </div>
    )
}

export default SubscribersWrapper