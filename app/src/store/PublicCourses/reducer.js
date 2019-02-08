import * as actionTypes from './action-types';
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {createImmutable} from "../../util/ObjectUpdater";

const initialState = createImmutable({});

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PUBLIC_COURSES:
            return createImmutable(action.payload);

        case LOGGED_OUT:
            return initialState;

        default:
            return state
    }
}
