import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    organization: {},
    order: {},
    isSelectedOrganization: false,
    isSelectedOrder: false,
});

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.SELECT_ORGANIZATION:
            return Immutable.merge(state,{
                organization: action.payload,
                isSelectedOrganization: true,
            });

        case actionTypes.SET_IS_SELECTED_ORGANIZATION:
            return Immutable.merge(state,{
                isSelectedOrganization: true,
            });

        case actionTypes.SELECT_ORDER:
            return Immutable.merge(state,{
                order: action.payload,
                isSelectedOrder: true,
            });

        case actionTypes.SET_IS_SELECTED_ORDER:
            return Immutable.merge(state,{
                isSelectedOrder: true,
            });

        case actionTypes.CLEAR_SELECTED:
            return initialState;

        case actionTypes.CLEAR_SELECTED_ORDER:
            return Immutable.merge(state,{
                order: {},
            });

        default:
            return state
    }
}

// Selectors:
export function getSelectedOrganization(state){
    return isSelectedOrganization(state) ? state.selected.organization : {};
}

export function isSelectedOrganization(state){
    return state.selected.isSelectedOrganization;
}

export function getSelectedOrder(state){
    return state.selected.order;
}

export function isSelectedOrder(state){
    return state.selected.isSelectedOrder;
}