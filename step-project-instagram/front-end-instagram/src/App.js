import {connect} from "react-redux";
import React, {useEffect} from 'react';
import { ToastContainer} from "react-toastify";

import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme/Theme'
import Header from "./components/Header/Header";
import MainRoutes from "./routes/MainRoutes";
import {loadUsersFromServer, setActiveUser} from "./redux/users/usersActions";
import {loadPostsFromServer} from "./redux/posts/postsActions";
import Loader from "./components/Loader/Loader";
import PropTypes from "prop-types";
import TransitionsModal from './components/Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';

// const sServerAPI = 'https://fe-15-sample-project.herokuapp.com/api';
// когда будем деплоить проект, то нужно указать в эту переменную URL задеплоенного сервера.

// import {getPosts} from './redux/posts/postsAction'


function App(props) {
    const {getUsers, getPosts, loadingUsers, loadingPosts, modalIsOpen, setCurrentUser} = props;


    useEffect(() => {
        getUsers();
        getPosts();
        try {setCurrentUser()}
        catch(ex) {}

    }, [getUsers,getPosts,setCurrentUser]);


    return loadingUsers || loadingPosts ? <Loader /> :
        (
            <>
                <ToastContainer />
                <ThemeProvider theme={theme}>
                    {modalIsOpen ? <TransitionsModal/>: null}
                    <Header/>
                    <MainRoutes/>
                </ThemeProvider>
            </>
        );
};

const mapStateToProps = (state) => {
    return {
        modalIsOpen: state.modal.modalIsOpen,
        loadingUsers: state.users.loading,
        loadingPosts: state.posts.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(loadUsersFromServer()),
        getPosts: () => dispatch(loadPostsFromServer()),
        setCurrentUser: () => dispatch(setActiveUser()),
    };
};

App.propTypes = {
    modalIsOpen: PropTypes.bool,
    loadingUsers: PropTypes.bool,
    loadingPosts: PropTypes.bool,
    getUsers: PropTypes.func,
    getPosts: PropTypes.func,
    setCurrentUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
