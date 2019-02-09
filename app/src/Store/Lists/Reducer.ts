import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {createImmutable} from '../../util/ObjectUpdater';

const initialState = createImmutable({
    offeredLectures: {},
    cancellationReasons: {},
    rejectionReasons: {},
});

export default (state = initialState, action :any= {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_LISTS:
            return createImmutable(action.payload);

        case LOGGED_OUT:
            return initialState;

        default:
            return state;
    }
}
