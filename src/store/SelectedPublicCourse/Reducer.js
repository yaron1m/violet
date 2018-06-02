import {LOGGED_OUT} from "../Firebase/ActionTypes";
import * as actionTypes from "./ActionTypes";
import {createImmutable, mergeImmutable} from "../../util/ObjectUpdater";

const initialState = createImmutable({
    isSelectedPublicCourse: false,
    publicCourse: {},
});

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.SELECT_PUBLIC_COURSE:
            return mergeImmutable(state, {
                publicCourse: action.payload,
                isSelectedPublicCourse: true,
            });

        case actionTypes.UPDATE_SELECTED_PUBLIC_COURSE:
            return mergeImmutable(state, {
                publicCourse: action.payload,
            });

        case actionTypes.SET_IS_SELECTED_PUBLIC_COURSE:
            return mergeImmutable(state, {
                isSelectedPublicCourse: true,
            });

        case LOGGED_OUT:
        case actionTypes.CLEAR_SELECTED_PUBLIC_COURSE:
            return initialState;

        default:
            return state
    }
}
