import React, {useEffect} from 'react'
import Post from '../post/Post'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {connect, useDispatch} from "react-redux";
import * as actions from "../../redux/posts/postsActionTypes";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection:'column'
    }
  }));

const perPage = 3;

const PostsWrapper = (props) => {
    const dispatch = useDispatch();

    let {allPosts, uploadedPosts, users, after, more, loading,active_user} = props;
    const classes = useStyles();

    const load = () => {
        dispatch({ type: actions.LOADING_POSTS });

        const newData = allPosts.slice(after, after + perPage);
        dispatch({ type: actions.NEW_POSTS_LOADED, newData });
    }

    // ------------------------------------------
    const loader = React.useRef(load);

    const observer = React.useRef(
        new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting) {
                    loader.current();
                }
            },
            { threshold: 1, rootMargin: '50px' }
        )
    );
    const [element, setElement] = React.useState(null);

    useEffect(() => {
        loader.current = load;
    }, [load]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);


    const findAuthorOfPostId = (postAuthorId) => {
        const authorOfPostObj = users.filter( user => user._id === postAuthorId)[0];
        return authorOfPostObj._id;
        
    }

    return (
        <>
            <div className={classes.root} >
                {uploadedPosts.map(post => <Post postId={post._id} userId={findAuthorOfPostId(post.author_id)} key={post._id}/>)}
            </div>

            {loading && <p>Loading...</p>}

            {!loading && more && <p ref={setElement} style={{ background: 'transparent' }}></p>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        allPosts: state.posts.postsList,
        uploadedPosts: state.posts.uploadedPostsList,
        users: state.users.usersList,
        active_user: state.users.activeUser,
        after: state.posts.after,
        more: state.posts.more,
        loading: state.posts.loading
    }
}

PostsWrapper.propTypes = {
    allPosts: PropTypes.array,
    uploadedPosts: PropTypes.array,
    users: PropTypes.array,
    active_user: PropTypes.string,
    after: PropTypes.number,
    more: PropTypes.bool,
    loading: PropTypes.bool
}

export default connect(mapStateToProps, null)(PostsWrapper);