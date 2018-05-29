import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../firebase/action-types";
import {createImmutable, mergeImmutable} from "../../util/ObjectUpdater";

const initialState = createImmutable({
    isSelectedOrder: false,
    order: {},
});

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.SELECT_ORDER:
            return mergeImmutable(state, {
                order: action.payload,
                isSelectedOrder: true,
            });

        case actionTypes.UPDATE_SELECTED_ORDER:
            return mergeImmutable(state, {
                order: action.payload,
            });

        case actionTypes.SET_IS_SELECTED_ORDER:
            return mergeImmutable(state, {
                isSelectedOrder: true,
            });

        case LOGGED_OUT:
        case actionTypes.CLEAR_SELECTED_ORDER:
            return initialState;

        default:
            return state
    }
}

