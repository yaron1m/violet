import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../Firebase/ActionTypes";

export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORGANIZATIONS:
            return action.payload;

        case LOGGED_OUT:
            return {};

        default:
            return state
    }
}
