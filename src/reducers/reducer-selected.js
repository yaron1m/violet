import {SELECT_ORGANIZATION} from '../actions/action-organizations';
import {SELECT_ORDER} from "../actions/action-orders";
import {calculateDuration} from "../util/time-util";
import {
    CLEAR_SELECTED, CLEAR_SELECTED_ORDER, UPDATE_VALUE_IN_SELECTED_ORDER,
    UPDATE_VALUE_IN_SELECTED_ORGANIZATION
} from "../actions/action-selected";

function getInitialState(){
    return {
        organization: {},
        order: {},
    }
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case SELECT_ORGANIZATION:
            return Object.assign({}, state, {
                organization: action.payload,
            });

        case SELECT_ORDER:
            let selectedOrder = action.payload;
            if (selectedOrder.lectureTimes) //if there are times //TODO what if there were and deleted?
                selectedOrder.lectureTimes = calculateDuration(selectedOrder.lectureTimes);

            return Object.assign({}, state, {
                order: selectedOrder,
            });

        case UPDATE_VALUE_IN_SELECTED_ORDER:
            let updatedOrder = state.order;
            updatedOrder[action.key] = action.payload;
            return Object.assign({}, state, {
                order: updatedOrder
            });

        case UPDATE_VALUE_IN_SELECTED_ORGANIZATION:
            let updatedOrganization = state.organization;
            updatedOrganization[action.key] = action.payload;
            return Object.assign({}, state, {
                order: updatedOrganization
            });

        case CLEAR_SELECTED:
            return getInitialState();

        case CLEAR_SELECTED_ORDER:
            return Object.assign({}, state, {
                order: {},
            });

        default:
            return state
    }
}


