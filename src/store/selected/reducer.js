import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';
import {LOGGED_OUT} from "../firebase/action-types";
import {
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../SelectedOrganization/ActionTypes";
import {
    CLEAR_SELECTED_ORDER,
    SELECT_ORDER,
    SET_IS_SELECTED_ORDER,
    UPDATE_SELECTED_ORDER
} from "../SelectedOrder/ActionTypes";
import {
    SELECT_PUBLIC_COURSE,
    SET_IS_SELECTED_PUBLIC_COURSE,
    UPDATE_SELECTED_PUBLIC_COURSE
} from "../SelectedPublicCourse/ActionTypes";

const initialState = Immutable({
    isSelectedOrganization: false,
    organization: {},
    isSelectedOrder: false,
    order: {},
    isSelectedPublicCourse: false,
    publicCourse: {},
});

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SELECT_ORGANIZATION:
            return Immutable.merge(state, {
                organization: action.payload,
                isSelectedOrganization: true,
            });

        case UPDATE_SELECTED_ORGANIZATION:
            return Immutable.merge(state, {
                organization: action.payload,
            });

        case SET_IS_SELECTED_ORGANIZATION:
            return Immutable.merge(state, {
                isSelectedOrganization: true,
            });

        case SELECT_ORDER:
            return Immutable.merge(state, {
                order: action.payload,
                isSelectedOrder: true,
            });

        case UPDATE_SELECTED_ORDER:
            return Immutable.merge(state, {
                order: action.payload,
            });

        case SET_IS_SELECTED_ORDER:
            return Immutable.merge(state, {
                isSelectedOrder: true,
            });

        case SELECT_PUBLIC_COURSE:
            return Immutable.merge(state, {
                publicCourse: action.payload,
                isSelectedPublicCourse: true,
            });

        case UPDATE_SELECTED_PUBLIC_COURSE:
            return Immutable.merge(state, {
                publicCourse: action.payload,
            });

        case SET_IS_SELECTED_PUBLIC_COURSE:
            return Immutable.merge(state, {
                isSelectedPublicCourse: true,
            });

        case actionTypes.CLEAR_SELECTED:
        case LOGGED_OUT:
            return initialState;

        case CLEAR_SELECTED_ORDER:
            return Immutable.merge(state, {
                order: {},
                isSelectedOrder: false,
            });

        default:
            return state
    }
}

// Selectors:
export function getSelectedOrganization(state) {
    return state.selected.organization;
}

export function isSelectedOrganization(state) {
    return state.selected.isSelectedOrganization;
}

