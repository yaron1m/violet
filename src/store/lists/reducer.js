import * as actionTypes from './action-types';
import _ from 'lodash';
import {LOGGED_OUT} from "../firebase/action-types";
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    offeredLectures: {},
    cancellationReasons: {},
    rejectionReasons: {},
});

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_LISTS:
            return action.payload;

        case LOGGED_OUT:
            return initialState;

        default:
            return state;
    }
}

export function getOfferedLectures(state) {
    return _.keys(state.lists.offeredLectures).filter((lecture) => state.offeredLectures[lecture]);
}

export function getRejectionReasons(state){
    return _.values(state.lists.rejectionReasons)
}
export function getCancellationReasons(state){
    return _.values(state.lists.cancellationReasons)
}