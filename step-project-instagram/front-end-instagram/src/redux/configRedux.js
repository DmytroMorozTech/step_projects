import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//         }) : compose;

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), devTools)
);

// const store = createStore(
//     rootReducer,
//     composeEnhancers(
//         applyMiddleware(
//             thunk
//         )
//     )
// )

export default store;

