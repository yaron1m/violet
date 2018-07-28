import * as actionTypes from './ActionTypes';

export function receiveLists(lists) {
    return {
        type: actionTypes.RECEIVE_LISTS,
        payload: lists,
    };
}