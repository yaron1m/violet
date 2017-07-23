import * as actionTypes from './action-types';

export function receiveOfferedLectures(offeredLectures) {
    return {
        type: actionTypes.RECEIVE_OFFERED_LECTURES,
        payload: offeredLectures,
    };
}