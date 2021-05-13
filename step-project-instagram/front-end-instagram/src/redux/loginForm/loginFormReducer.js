import * as actions from "./loginFormActionTypes";
const initialStore = {
    error: false
};

const loginFormReducer = (store = initialStore, action) => {
    switch (action.type) {

        case actions.WRONG_DATA :
            return { ...store, error: action.payload }

        case actions.CORRECT_DATA :
            return { ...store, error: action.payload }

        default:
            return store;
    }
}

export default loginFormReducer;
