import React from 'react';
import {connect} from "react-redux";
import PostsWrapper from '../../components/postWrapper/PostsWrapper';
import PropTypes from "prop-types";
import SubscribersMain from "../../components/SubscribersMain/SubscribersMain";
import SubscribersBlock from "../../components/SubscriptionsRec/SubscriptionsMain";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        ...theme.wrapper
    },
    rightBlock: {
        position: 'fixed',
        height: '50vh',
        right: 50,
        top: 115,
        width: '30%'
    },
    leftBlock: {
        width: '70%'
    }

}))

function Feed(props) {
    const {users, active_user} = props;
    const classes = useStyles()

    return (
        <Grid container>
            <Grid item  className={classes.leftBlock}>
                <PostsWrapper/>
            </Grid>
            <Grid item xs={6} className={classes.rightBlock}>
                <SubscribersMain users={users} active_user={active_user}/>
                <SubscribersBlock users={users} active_user={active_user}/>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        posts: state.posts.postsList,
        users: state.users.usersList,
        active_user: state.users.activeUser
    }
}

Feed.propTypes = {
    posts: PropTypes.array,
    users: PropTypes.array,
    active_user: PropTypes.string
}

export default connect(mapStateToProps, null)(Feed);