import React, {useRef, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
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
import {connect, useDispatch, useSelector} from 'react-redux';
import {Image} from 'cloudinary-react';
import {toggleLike} from "../../redux/posts/postsActions";
import {toggleSaved} from "../../redux/users/usersActions";
import PropTypes from "prop-types";
import {toggleModal} from '../../redux/modal/modalActions';
import {NavLink} from "react-router-dom";
import Comments from '../Comments/Comments';
import AddComment from '../Comments/AddComment';
import Divider from '@material-ui/core/Divider';
import useDoubleClick from 'use-double-click';
import {toast} from "react-toastify";


const useStyles = makeStyles((theme) => ({
    card: {
        width: 550,
        boxShadow: 'unset'
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
        color: 'black'
    },
    saveOpen: {
        transform: 'rotate(180deg)',
    },
    grid: {
        display: 'flex',
    },
    post: {
        width: '600px',
    },
    info: {
        width: '500px',
    },
}));

const ModalPost = (props) => {
    const [onFocus, setFocus] = useState(false)
    const {post, user, allUsers, modalIsOpen, active_user} = props;

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
      onSingleClick: ()=>dispatch(toggleModal(post._id)),
      onDoubleClick: ()=> {
          if (post.author_id === active_user) {
          return toast.info('You can not set likes to your own posts!');
            }
          dispatch(toggleLike(active_user, post._id));
      },
      ref: buttonRef,
      latency: 250
    });

    const handleComClick = () => {
        setFocus(!onFocus)
    }

    return (
        <>
            <div className={classes.grid}>
                <div className={classes.post}>
                    <Card className={classes.card}>
                        <CardMedia
                            ref={buttonRef}
                            title="Some picture"
                            style={{width: '600px'}}
                        >
                            <Image
                                key="unique_key"
                                cloudName="dan-insta-step"
                                publicId={post.pic_url}
                                width="600"
                                crop="scale">
                            </Image>
                        </CardMedia>
                    </Card>
                </div>
                <div className={classes.info}>
                    <CardHeader
                        avatar={
                            <Avatarka avatarUrl={user.avatar_url}/>
                        }
                        title={user.username}
                        subheader={post && post.geolocation}
                        component={NavLink} to={`/account/${user._id}`} className={classes.postHeadLink}
                        onClick = {()=> {
                            if (modalIsOpen) dispatch(toggleModal())
                        }}
                    />
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
                        <IconButton aria-label="comment">
                            <ChatBubbleOutlineIcon onClick={handleComClick}/>
                        </IconButton>
                        {/* <IconButton aria-label="send">
                            <SendIcon />
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
                        <Typography variant="body2" color="textSecondary" component="p">
                            {post.likes_counter} likes
                        </Typography>
                    </CardActions>
                    <Divider/>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.liketext}>
                        {post.comments && post.comments.length > 0 ? 'Comments' : 'No comments yet'}
                    </Typography>
                    {post.comments.map(postcomment =>
                        (
                            <>
                                <Divider/>
                                <Comments comment={postcomment} allUsers={allUsers} modalIsOpen={modalIsOpen}/>
                            </>
                        ))}
                    <AddComment post={post} active_user={active_user} focus={onFocus}/>
                </div>
            </div>
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        allUsers: state.users.usersList,
        modalIsOpen: state.modal.modalIsOpen,
        active_user: state.users.activeUser
    };
};


ModalPost.propTypes = {
    allUsers: PropTypes.array,
    modalIsOpen: PropTypes.bool,
    active_user: PropTypes.string
};

export default connect(mapStateToProps, null)(ModalPost);
