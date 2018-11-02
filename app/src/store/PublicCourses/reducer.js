import * as actionTypes from './action-types';
import {LOGGED_OUT} from "../Firebase/ActionTypes";

export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PUBLIC_COURSES:
            return action.payload;

        case LOGGED_OUT:
            return {};

        default:
            return state
    }
}