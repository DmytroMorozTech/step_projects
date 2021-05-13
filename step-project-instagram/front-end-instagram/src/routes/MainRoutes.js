import ProtectedRoutes from "./ProtectedRoutes";
import Personal from "../pages/Personal/Personal";
import {Route, Switch} from 'react-router-dom';
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Feed from "../pages/Feed/Feed";
import React from "react";

import UserList from "../components/SubscriptionsRecAll/SubscriptionsAll";
import Subscribers from "../components/SubscribersAll/SubscribersAll";


const MainRoutes = () => {

    return (
        <>
            <Switch>
                <Route exact path='/' render={() => <Login/>} />
                <ProtectedRoutes exact path='/feed' render={() => <Feed/>}/>
                <ProtectedRoutes exact path='/account' render={() => <Personal/>}/>
                <ProtectedRoutes exact path='/account/:id/' render={() => <Personal/>}/>
                <ProtectedRoutes exact path='/users' render={() => <UserList/>}/>
                <ProtectedRoutes exact path='/subscribers' render={() => <Subscribers/>}/>
                <ProtectedRoutes exact path='*' render={() => <NotFound/>}/>
            </Switch>
        </>
    );
}

export default MainRoutes;
