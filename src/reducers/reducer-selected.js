import {SELECT_ORGANIZATION} from '../actions/action-organizations';
import {SELECT_ORDER} from "../actions/action-orders";
import {calculateDuration} from "../util/time-util";
import {UPDATE_VALUE_IN_SELECTED_ORDER} from "../actions/action-selected";

const initialState = {
    organization: {},
    order: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ORGANIZATION:
            return Object.assign({}, state, {
                organization: action.payload,
            });

        case SELECT_ORDER:
            let selectedOrder = action.payload;
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

        default:
            return state
    }
}


