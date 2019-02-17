import * as actionTypes from "./ActionTypes";
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {createImmutable, mergeImmutable} from "../../Util/ObjectUpdater";

const initialState = {
    isSelectedOrganization: false,
    organization: {},
} as any;

export default (state = createImmutable(initialState), action: any = {}) => {
    switch (action.type) {
        case actionTypes.SELECT_ORGANIZATION:
            return mergeImmutable(state, {
                organization: action.payload,
                isSelectedOrganization: true,
            });

        case actionTypes.UPDATE_SELECTED_ORGANIZATION:
            return mergeImmutable(state, {
                organization: action.payload,
            });

        case actionTypes.SET_IS_SELECTED_ORGANIZATION:
            return mergeImmutable(state, {
                isSelectedOrganization: true,
            });

        case LOGGED_OUT:
        case actionTypes.CLEAR_SELECTED_ORGANIZATION:
            return createImmutable(initialState);

        default:
            return state;
    }
};
