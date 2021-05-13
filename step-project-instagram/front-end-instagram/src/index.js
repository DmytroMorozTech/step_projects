import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./redux/configRedux";
import CssBaseline from '@material-ui/core/CssBaseline';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <CssBaseline>
                <App/>
            </CssBaseline>
        </Router>
    </Provider>,
    document.getElementById('root')
);