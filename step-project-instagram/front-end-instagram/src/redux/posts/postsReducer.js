import * as actions from "./postsActionTypes";
import update from "immutability-helper";
const perPage = 3;

const initialStore = {
    loading: false,
    postsList: [],
    uploadedPostsList: [],
    more: true,
    after: 0,

};

const postsReducer = (store = initialStore, action) => {

    switch (action.type) {
        case actions.LOADING_POSTS:
            return { ...store, loading: action.payload };

        case actions.SAVE_POSTS:
            return { ...store, postsList: action.payload };
        // ----------------------------------------------
        case actions.TOGGLE_LIKE_POSTS:
            const {action_payload:likedPostId,likes_counter_server} = action.payload;
            // console.log('Toggle_like reducer');
            // console.log(likedPost);

            // Now let's update post's field "likes_counter" in redux store.
            const targetPost = store.postsList.find(
                (post) => post._id === likedPostId
            );
            const postIndex = store.postsList.indexOf(targetPost);
            const updatedTargetPost = {
                ...targetPost,
                likes_counter : likes_counter_server
            };
            return update(store, {
                postsList: { $splice: [[postIndex, 1, updatedTargetPost]] },
            });
        // ----------------------------------------------
        case actions.ADD_COMMENT:
            const {post_id, updated_post} = action.payload;

            const targetPost1 = store.postsList.find((post) => post._id === post_id);
            const post1Index = store.postsList.indexOf(targetPost1);

            return update(store, {
                postsList: { $splice: [[post1Index, 1, updated_post]] },
            });
        // ----------------------------------------------
        case actions.NEW_POSTS_LOADED:
            return {
                ...store,
                loading: false,
                uploadedPostsList: [...store.uploadedPostsList, ...action.newData],
                more: action.newData.length === perPage,
                after: store.after + action.newData.length,
            }
        // ----------------------------------------------

        default:
            return store;
    }
}

export default postsReducer;
