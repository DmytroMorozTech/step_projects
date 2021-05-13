import {WRONG_DATA} from "./loginFormActionTypes";

export  const formErrorData = () => (dispatch) => {
    dispatch({ type: WRONG_DATA, payload: true });
}

export  const formCorrectData = () => (dispatch) => {
    dispatch({ type: WRONG_DATA, payload: false });

}