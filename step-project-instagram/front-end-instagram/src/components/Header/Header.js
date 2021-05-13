import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import menu from '../../util/mainMenu'
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logoutActiveUser} from "../../redux/users/usersActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const activeUser = useSelector(state => state.users.activeUser)


    const handleLogoutUser =() => {
        localStorage.removeItem('x-auth-token');
        dispatch(logoutActiveUser())
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {menu.map(e => <Button key={e.id} component={NavLink} to={e.link}>{e.name}</Button>)}
                    </Typography>
                    {!localStorage.getItem('token') && activeUser === null ? <Button color="inherit" component={NavLink} to='/'>Login</Button> : <Button color="inherit" component={NavLink} to='/' onClick={handleLogoutUser}>Logout</Button> }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;