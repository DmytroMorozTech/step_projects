import React, {useRef, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red, grey} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatarka from '../avatar/Avatarka';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {connect, useDispatch} from 'react-redux';
import {Image} from 'cloudinary-react';
import {toggleModal} from '../../redux/modal/modalActions';
import {toggleLike} from "../../redux/posts/postsActions";
import {toggleSaved} from "../../redux/users/usersActions";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import AddComment from '../Comments/AddComment';
import Comments from '../Comments/Comments';
import useDoubleClick from 'use-double-click';
import Divider from '@material-ui/core/Divider';
import {CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {toast} from "react-toastify";


const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
        marginTop: 100
    },
    media: {
        height: 100,
        paddingTop: '56.25%',
    },
    bookmark: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    postHeadLink: {
        textDecoration: 'none',
        color: '#013B8A',
        fontWeight: 'bold'
    },
    saveOpen: {
        transform: 'rotate(180deg)',
    },
    liketext: {
        marginLeft: 15
    },
    showMoreBtn: {
        fontSize: '10px',
        marginLeft: '15px',
        color: '#013B8A',
    }
}));

const Post = (props) => {
    const {postId, userId, allUsers, allPosts, active_user} = props;
  
    const user = allUsers.find(user => user._id === userId);
    const post = allPosts.find(post => post._id === postId);

    const [fullCom, setFullCom] = useState(false)

    const classes = useStyles();
    const dispatch = useDispatch();
    const postIsLikedStatus = (activeUserId, likedPostId) => {
        const activeUser = allUsers.find(user => user._id === activeUserId);
        return activeUser.liked_posts.indexOf(likedPostId) !== -1
    };
    const postIsBookedStatus = (activeUserId, likedPostId) => {
        const activeUser = allUsers.find(user => user._id === activeUserId);
        return activeUser.saved_posts.indexOf(likedPostId) !== -1
    };
    const buttonRef = useRef();
    useDoubleClick({
        onSingleClick: () => {
            dispatch(toggleModal(postId))
        },
        onDoubleClick: () => {
            if (post.author_id === active_user) {
                return toast.info('You can not set likes to your own posts!');
            }
            dispatch(toggleLike(active_user, postId));
        },
        ref: buttonRef,
        latency: 250
    });

    const handleShowMore = () => {
        setFullCom(!fullCom)

    }
    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatarka avatarUrl={user.avatar_url}/>
                    }
                    // action={
                    //   <IconButton aria-label="settings">
                    //     <MoreHorizIcon />
                    //   </IconButton>
                    // }
                    className={classes.postHeadLink}
                    title={user.username}
                    subheader={post && post.geolocation}
                    component={NavLink} to={`/account/${user._id}`}
                />
                <CardMedia
                    ref={buttonRef}
                    title="Some picture">
                    <Image
                        key="unique_key"
                        cloudName="dan-insta-step"
                        publicId={post.pic_url}
                        width="600"
                        crop="scale">
                    </Image>

                </CardMedia>

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post && post.title}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing className={classes.cardactions}>
                    <IconButton
                        onClick={() => {
                            if (post.author_id === active_user) {
                                return toast.info('You can not set likes to your own posts!');
                            }
                            dispatch(toggleLike(active_user, post._id));
                        }}
                        aria-label="liked">
                        {postIsLikedStatus(active_user, post._id) ? <FavoriteIcon style={{color: red[500]}}/> :
                            <FavoriteBorderIcon/>}
                    </IconButton>
                    <IconButton aria-label="comment" onClick={() => dispatch(toggleModal(post._id))}>
                        <ChatBubbleOutlineIcon/>
                    </IconButton>
                    {/* <IconButton aria-label="send">
                        <SendIcon/>
                    </IconButton> */}

                    <IconButton
                        className={classes.bookmark}
                        aria-label="bookmarked"
                        onClick={() => dispatch(toggleSaved(active_user, post._id))}
                    >
                        {postIsBookedStatus(active_user, post._id) ? <BookmarkIcon style={{color: grey[800]}}/> :
                            <BookmarkBorderIcon/>}
                    </IconButton>

                </CardActions>
                <CardActions>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.liketext}>
                        {post.likes_counter} likes
                    </Typography>
                </CardActions>
                <Divider/>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.liketext}>
                    {post.comments && post.comments.length > 0 ? 'Comments' : 'No comments yet'}
                </Typography>
                {!fullCom && post.comments[0] ?
                    <Comments comment={post.comments && post.comments[0]} allUsers={allUsers}/> : null}
                {!fullCom && post.comments[1] ?
                    <Button className={classes.showMoreBtn} onClick={handleShowMore} variant='outlined'>show
                        more</Button> : null}
                {fullCom ? post.comments && post.comments.map(postcomment =>
                    (
                        <>
                            <Comments comment={postcomment} allUsers={allUsers}/>
                            <Divider/>
                        </>
                    )) : null}

                <AddComment post={post} active_user={active_user}/>
            </Card>


        </>
    );

}

const mapStateToProps = (state) => {
    return {
        allUsers: state.users.usersList,
        allPosts: state.posts.postsList,
        active_user: state.users.activeUser
    };
};

Post.propTypes = {
    allUsers: PropTypes.array,
    allPosts: PropTypes.array,
    active_user: PropTypes.string
};

export default connect(mapStateToProps, null)(Post);
