
import {TOGGLE_MODAL} from './modalActionTypes'

export const toggleModal = (activePostId) => (dispatch) => {
    dispatch({type: TOGGLE_MODAL, payload: activePostId})
}

