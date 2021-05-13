import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PersonalAvatar from "../../components/PersonalAvatar/PersonalAvatar";
import Grid from '@material-ui/core/Grid';
import {useSelector} from "react-redux";
import PersonalCard from "../../components/PersonalCard/PersonalCard.";
import PersonalTab from "../../components/PersonalTab/PersonalTab";
import {withRouter} from "react-router";


const useStyles = makeStyles((theme) => ({
    wrapper: {
        ...theme.wrapper
    },
    container: {
        marginTop: '80px'
    },
    personalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%',
        margin: '0px auto 40px auto'
    }
}))

function Personal(props) {
    const classes = useStyles()
    const user = useSelector(state => state.users.activeUser)
    const userList = useSelector(state => state.users.usersList)
    const posts = useSelector(state => state.posts.postsList)
    const {match} = props

    const compareUser = match.params.id ? match.params.id : user
    const comparePost = match.params.id ? match.params.id : user
    
    const fullUser = userList.filter(e => e._id === compareUser)
    const relatedPosts = posts.filter(e => e.author_id === comparePost)

    return (
        <Grid className={classes.wrapper}>
            <Grid className={classes.container}>
                <Grid className={classes.personalHeader}>
                    <PersonalAvatar avatar={{...fullUser[0]}.avatar_url}/>
                    <PersonalCard user={{...fullUser[0]}} activeUser={user}/>
                </Grid>
            </Grid>
            <PersonalTab posts={relatedPosts} user={{...fullUser[0]}}/>
        </Grid>

    );
}

export default withRouter(Personal);