import * as actionTypes from './action-types';
import _ from 'lodash';
import {LOGGED_OUT} from "../firebase/action-types";


export default (state = {}, action={}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_OFFERED_LECTURES:
            return action.payload;

        case LOGGED_OUT:
            return {};

        default:
            return state;
    }
}

export function getOfferedLectures(state){
    return _.keys(state.offeredLectures).filter((lecture) => state.offeredLectures[lecture]);
}