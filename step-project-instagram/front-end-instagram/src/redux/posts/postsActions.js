import * as actions from "./postsActionTypes";
import config from "../../config.json";
import http from '../../services/httpService';


export const loadPostsFromServer = () => (dispatch) => {
    dispatch({ type: actions.LOADING_POSTS, payload: true });

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    return http
        .get(`${config.apiEndpoint}/posts`)
        .then((result) => result.data)
        .then((listOfPosts) => {
            dispatch({ type: actions.SAVE_POSTS, payload: shuffleArray(listOfPosts) });
            dispatch({ type: actions.LOADING_POSTS, payload: false });
        });
};

export const toggleLike = (active_user, action_payload) => (dispatch) => {

    return http
        .patch(`${config.apiEndpoint}/users`, {
            active_user,
            action_type:"TOGGLE_LIKE",
            action_payload
        })
        .then((result) => {
   
            let likes_counter_server = result.data.likes_counter;
            // we receive from server the number of likes that the current post has and handed it over further to the reducer. In order to set correct number of likes!

            if (result.status===200) {

                dispatch({ type: actions.TOGGLE_LIKE_USERS, payload: {action_payload,active_user}});
                dispatch({ type: actions.TOGGLE_LIKE_POSTS, payload: {action_payload,likes_counter_server}});
            } else return console.error('Nothing was found!')
        });
    // const {active_user, action_type, action_payload} = req.body;

};

export const addCommentToPost = (author_id, post_id, {text}) => (dispatch) => {

    return http
        .patch(`${config.apiEndpoint}/posts`, {
            author_id,
            post_id,
            text
        })
        .then((result) => {
            if (result.status===200) {
         
                let updated_post = result.data;

                dispatch({
                    type: actions.ADD_COMMENT,
                    payload: {post_id, updated_post}
                });

            } else return console.error('Nothing was found!')
        });

};




