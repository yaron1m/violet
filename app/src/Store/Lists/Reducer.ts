import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {createImmutable} from '../../Util/ObjectUpdater';

const initialState = {
    offeredLectures: {},
    cancellationReasons: {},
    rejectionReasons: {},
};

export default (state = createImmutable(initialState), action :any= {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_LISTS:
            return createImmutable(action.payload);

        case LOGGED_OUT:
            return createImmutable(initialState);

        default:
            return state;
    }
}
