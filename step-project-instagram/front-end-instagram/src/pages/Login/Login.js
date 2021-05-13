import React, {useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../../util/copyrights";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import * as actions from "../../redux/users/usersActionTypes";
import config from "../../config.json";
import http from '../../services/httpService';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.form.error);
    const activeUser = useSelector(state => state.users.activeUser);
    const emailRef = useRef('');
    const passwordRef = useRef('');

    if (activeUser) {history.push("/feed")};

    const handleSubmit = async (e) => {
        e.preventDefault()

        let userInputEmail = emailRef.current.value;
        let userInputPassword = passwordRef.current.value;

        http
            .post(`${config.apiEndpoint}/auth`, {
                email: userInputEmail,
                password: userInputPassword
            })
            .then((res) => {
                if (res.status === 200) {
                    let token = res.data.token;
                    let activeUserId = res.data.id;
                    localStorage.setItem('x-auth-token', token);

                    dispatch({
                        type: actions.SET_ACTIVE_USER,
                        payload: activeUserId
                    });
                    history.push("/feed");

                } else {
                       return console.error('Invalid email or password!');
                }
            });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={emailRef}
                            error={error}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                            error={error}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        </>
    );
}