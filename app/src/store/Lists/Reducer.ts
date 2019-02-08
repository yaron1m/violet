import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    offeredLectures: {},
    cancellationReasons: {},
    rejectionReasons: {},
});

export default (state = initialState, action :any= {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_LISTS:
            return action.payload;

        case LOGGED_OUT:
            return initialState;

        default:
            return state;
    }
}
