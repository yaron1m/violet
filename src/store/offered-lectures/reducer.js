import * as actionTypes from './action-types';
import _ from 'lodash';


export default (state = {}, action={}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_OFFERED_LECTURES:
            return action.payload;

        default:
            return state;
    }
}

export function getOfferedLectures(state){
    return _.keys(state.offeredLectures).filter((lecture) => state.offeredLectures[lecture]);
}