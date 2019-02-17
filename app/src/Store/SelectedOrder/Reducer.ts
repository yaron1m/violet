import * as actionTypes from "./ActionTypes";
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {createImmutable, mergeImmutable} from "../../Util/ObjectUpdater";

const initialState = {
    isSelectedOrder: false,
    order: {},
};

export default (state = createImmutable(initialState), action: any = {}) => {
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
            return createImmutable(initialState);

        default:
            return state;
    }
};
