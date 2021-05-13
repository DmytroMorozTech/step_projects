import {combineReducers} from 'redux';
import usersReducer from "./users/usersReducer";
import postsReducer from "./posts/postsReducer";
import modalReducer from './modal/modalReducer';
import loginFormReducer from "./loginForm/loginFormReducer";
// import currentUserReducer from './users/currentUserReducer'

const rootReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    modal: modalReducer,
    form: loginFormReducer,
    // currentUser: currentUserReducer,
    // modalStatus: toggleModalReducer
})

export default rootReducer;
