import {calculateDuration} from "../../util/time-util";
import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    organization: {},
    order: {},
    isSelected:{
        organization: false,
        order: false,
    }
});

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_ORGANIZATION:
            return state.merge({
                organization: action.payload,
            });

        case actionTypes.SELECT_ORDER:
            let selectedOrder = action.payload;
            if (selectedOrder.lectureTimes) //if there are times //TODO what if there were and deleted?
                selectedOrder.lectureTimes = calculateDuration(selectedOrder.lectureTimes);

            return state.merge({
                order: selectedOrder,
            });

        case actionTypes.UPDATE_VALUE_IN_SELECTED_ORDER:
            let updatedOrder = state.order;
            updatedOrder[action.key] = action.payload;
            return state.merge({
                order: updatedOrder
            });

        case actionTypes.UPDATE_VALUE_IN_SELECTED_ORGANIZATION:
            let updatedOrganization = state.organization;
            updatedOrganization[action.key] = action.payload;
            return state.merge({
                order: updatedOrganization
            });

        case actionTypes.CLEAR_SELECTED:
            return initialState;

        case actionTypes.CLEAR_SELECTED_ORDER:
            return state.merge({
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
    return state.selected.isSelected.organization;
}

export function getSelectedOrder(state){
    return state.selected.order;
}

export function isSelectedOrder(state){
    return state.selected.isSelected.order;
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
