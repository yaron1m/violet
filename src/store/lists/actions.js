import * as actionTypes from './action-types';

export function receiveLists(lists) {
    return {
        type: actionTypes.RECEIVE_LISTS,
        payload: lists,
    };
}