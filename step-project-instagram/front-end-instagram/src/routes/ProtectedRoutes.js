import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {loadUsersFromServer, setActiveUser} from "../redux/users/usersActions";
import {loadPostsFromServer} from "../redux/posts/postsActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";


const ProtectedRoutes = (props) => {
    const { activeUser,...rest } = props;

    return activeUser ?
        ( <Route {...rest} />) :
        ( <Redirect to={{ pathname: '/' }} />);
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.users.activeUser,
    };
};

ProtectedRoutes.propTypes = {
    activeUser: PropTypes.string
};

export default connect(mapStateToProps, null)(ProtectedRoutes);