import * as actions from "./usersActionTypes";
import config from "../../config.json";
import http from '../../services/httpService';
import jwtDecode from 'jwt-decode';


export const loadUsersFromServer = () => (dispatch) => {
    dispatch({ type: actions.LOADING_USERS, payload: true });

    return http
        .get(`${config.apiEndpoint}/users`)
        .then((result) => result.data)
        .then((listOfUsers) => {
            dispatch({ type: actions.SAVE_USERS, payload: listOfUsers });
            dispatch({ type: actions.LOADING_USERS, payload: false });
            // console.log(listOfUsers);
        });
};

export const toggleSaved = (active_user, action_payload) => (dispatch) => {

    return http
        .patch(`${config.apiEndpoint}/users`, {
            active_user,
            action_type: actions.TOGGLE_SAVED_POSTS,
            action_payload
        })
        .then((result) => {
            // console.log(result.data);
            // console.log(`Saved posts: ${result.data.saved_posts}`);

            if (result.status===200) {
                dispatch({ type: actions.TOGGLE_SAVED_POSTS, payload: {action_payload,active_user}});
            } else return console.error('Nothing was found!')
        });
};

export const toggleSubscription = (active_user, action_payload) => (dispatch) => {

    return http
        .patch(`${config.apiEndpoint}/users`, {
            active_user,
            action_type: actions.TOGGLE_SUBSCRIPTION,
            action_payload // -> Id of user to whom active_user subscribed/unsubscribed from
        })
        .then((result) => {
            if (result.status===200) {
                // console.log(`result.data: ${JSON.stringify(result.data)}`)
                let {active_user_updated_data,passive_user_updated_data} = result.data;

                dispatch({
                    type: actions.TOGGLE_SUBSCRIPTION_ACTIVE_USER,
                    payload: {active_user_updated_data} // this is correct syntax! PAY ATTENTION!
                });
                dispatch({
                    type: actions.TOGGLE_SUBSCRIBER_PASSIVE_USER,
                    payload: {passive_user_updated_data} // this is correct syntax! PAY ATTENTION!
                });

            } else return console.error('Nothing was found!')
        });
}


export  const logoutActiveUser = () => (dispatch) => {
    dispatch({ type: actions.LOGOUT_ACTIVE_USER, payload: null });
}

export  const setActiveUser = () => (dispatch) => {
    const jwt = localStorage.getItem('x-auth-token');
    const activeUserId = jwtDecode(jwt)._id;

    dispatch({ type: actions.SET_ACTIVE_USER, payload: activeUserId });
}



