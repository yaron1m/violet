import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from '../Firebase/ActionTypes';
import {createImmutable} from '../../Util/ObjectUpdater';

const initialState = {};

export default (state = createImmutable(initialState), action: any = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PUBLIC_COURSES:
            return createImmutable(action.payload);

        case LOGGED_OUT:
            return createImmutable(initialState);

        default:
            return state;
    }
};
