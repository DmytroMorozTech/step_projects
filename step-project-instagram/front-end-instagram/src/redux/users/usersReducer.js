import * as actions from "./usersActionTypes";
import update from "immutability-helper";

const initialStore = {
    loading: false,
    usersList: [],
    activeUser: ""
};

const usersReducer = (store = initialStore, action) => {
    switch (action.type) {
        // ------------------------------------------------
        case actions.LOADING_USERS:
            return { ...store, loading: action.payload };
        // ------------------------------------------------
        case actions.SAVE_USERS:
            return { ...store, usersList: action.payload };

        // ------------------------------------------------
        case actions.TOGGLE_LIKE_USERS:
            const {action_payload:likedPostId,active_user} = action.payload;

            // Now let's update active user's field "liked_posts" in redux store.
            const activeUser = store.usersList.find(
                (user) => user._id === active_user
            );
            let updatedActiveUser = {...activeUser};

            if (activeUser.liked_posts.indexOf(likedPostId)===-1) {
                updatedActiveUser.liked_posts.push(likedPostId);
            } else {
                let index = activeUser.liked_posts.indexOf(likedPostId);
                updatedActiveUser.liked_posts.splice(index,1);
            }

            const userIndex = store.usersList.indexOf(activeUser);
            return update(store, {
                usersList: { $splice: [[userIndex, 1, updatedActiveUser]] },
            });

        // ------------------------------------------------
        case actions.TOGGLE_SAVED_POSTS:

            let {action_payload:savedPostId,active_user:activeUser1Id} = action.payload;
            // console.log(`savedPostId: ${savedPostId}`);
            // console.log(`activeUser1Id: ${activeUser1Id}`);
            // activeUser1Id is basically simply an active_user. But we renamed it due to limitations of JS: variables can not be reassigned within one scope.
            // console.log('TOGGLE_SAVED_POSTS reducer');

            const activeUser1Obj = store.usersList.find(
                (user) => user._id === activeUser1Id
            );

            let updatedActiveUser1Obj = {...activeUser1Obj};

            if (activeUser1Obj.saved_posts.indexOf(savedPostId)===-1) {
                updatedActiveUser1Obj.saved_posts.push(savedPostId);
            } else {
                let index = activeUser1Obj.saved_posts.indexOf(savedPostId);
                updatedActiveUser1Obj.saved_posts.splice(index,1);
            }

            const activeUser1Index = store.usersList.indexOf(activeUser1Obj);
            return update(store, {
                usersList: { $splice: [[activeUser1Index, 1, updatedActiveUser1Obj]] },
            });
        // ------------------------------------------------
        case actions.TOGGLE_SUBSCRIPTION_ACTIVE_USER:
            let {active_user_updated_data} = action.payload;

            let activeUserId = active_user_updated_data.user_id;
            const activeUserSub = store.usersList.find(
                (user) => user._id === activeUserId
            )
            let updatedActiveUserSub = {...activeUserSub};
            updatedActiveUserSub.subscriptions = active_user_updated_data.subscriptions;

            const indexOfActiveUser = store.usersList.indexOf(activeUserSub);
            // console.log(indexOfActiveUser);

            return update(store, {
                usersList: {$splice: [[indexOfActiveUser, 1, updatedActiveUserSub]]}
            })
        // ------------------------------------------------

        case actions.TOGGLE_SUBSCRIBER_PASSIVE_USER:
            let {passive_user_updated_data} = action.payload;

            let passiveUserId = passive_user_updated_data.user_id;
            const passiveUserSub = store.usersList.find(
                (user) => user._id === passiveUserId
            )
            let updatedPassiveUserSub = {...passiveUserSub};
            updatedPassiveUserSub.subscribers = passive_user_updated_data.subscribers;

            const indexOfPassiveUser = store.usersList.indexOf(passiveUserSub);
            // console.log(`indexOfPassiveUser: ${indexOfPassiveUser}`);

            return update(store, {
                usersList: {$splice: [[indexOfPassiveUser, 1, updatedPassiveUserSub]]}
            })

        // ------------------------------------------------
        case actions.SET_ACTIVE_USER :
            return { ...store, activeUser: action.payload }

        case actions.LOGOUT_ACTIVE_USER :
            return { ...store, activeUser: action.payload }

        default:
            return store;
    }
}

export default usersReducer;
