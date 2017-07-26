import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    organization: {},
    order: {},
    isSelectedOrganization: false,
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
    return state.selected.organization;
}

export function isSelectedOrganization(state){
    return state.selected.isSelectedOrganization;
}

export function getSelectedOrder(state){
    return state.selected.order;
}

//Is selected:

// export default (state = getInitialState(), action) => {
//     switch (action.type) {
//         case SELECT_ORGANIZATION:
//             return Object.assign({}, state, {
//                 organization: true,
//             });
//
//         case SELECT_ORDER:
//             return Object.assign({}, state, {
//                 order: true,
//             });
//
//         case CLEAR_SELECTED:
//             return getInitialState();
//
//         case CLEAR_SELECTED_ORDER:
//             return Object.assign({}, state, {
//                 order: false,
//             });
//
//         case SET_IS_SELECTED_ORGANIZATION:
//             return Object.assign({}, state, {
//                 organization: action.payload,
//             });
//
//         default:
//             return state
//     }
// }
