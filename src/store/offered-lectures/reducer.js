import * as actionTypes from './action-types';


export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_OFFERED_LECTURES:
            return action.payload;

        default:
            return state;
    }
}

export function getOfferedLectures(state){
    return state.offeredLectures;
}