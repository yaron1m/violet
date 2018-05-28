import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../firebase/action-types";
import {updateObject} from "../../util/ObjectUpdater";
import {CLEAR_SELECTED} from "../selected/action-types";

const initialState = {
    isSelectedOrder: false,
    order: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.SELECT_ORDER:
            return updateObject(state, {
                order: action.payload,
                isSelectedOrder: true,
            });

        case actionTypes.UPDATE_SELECTED_ORDER:
            return updateObject(state, {
                order: action.payload,
            });

        case actionTypes.SET_IS_SELECTED_ORDER:
            return updateObject(state, {
                isSelectedOrder: true,
            });

        case CLEAR_SELECTED:
        case LOGGED_OUT:
        case actionTypes.CLEAR_SELECTED_ORDER:
            return initialState;

        default:
            return state
    }
}

