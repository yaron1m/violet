import {SELECT_ORGANIZATION} from '../actions/action-organizations';
import {SELECT_ORDER} from "../actions/action-orders";
import {calculateDuration} from "../util/time-util";
import {
    CLEAR_SELECTED, CLEAR_SELECTED_ORDER, UPDATE_VALUE_IN_SELECTED_ORDER,
    UPDATE_VALUE_IN_SELECTED_ORGANIZATION
} from "../actions/action-selected";

function getInitialState(){
    return {
        organization: false,
        order: false,
    }
};

export default (state = getInitialState(), action) => {
    switch (action.type) {
        case SELECT_ORGANIZATION:
            return Object.assign({}, state, {
                organization: true,
            });

        case SELECT_ORDER:
            return Object.assign({}, state, {
                order: true,
            });

        case CLEAR_SELECTED:
            return getInitialState();

        case CLEAR_SELECTED_ORDER:
            return Object.assign({}, state, {
                order: false,
            });

        default:
            return state
    }
}


