import * as actionTypes from './ActionTypes';
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {createImmutable, mergeImmutable} from "../../util/ObjectUpdater";

const initialState = createImmutable({
    isSelectedOrganization: false,
    organization: {},
});

export default (state = initialState, action = {}) => {
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
            return initialState;

        default:
            return state
    }
}

