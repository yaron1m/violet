import {SELECT_ORGANIZATION, SET_IS_SELECTED_ORGANIZATION} from '../actions/action-organizations';
import {SELECT_ORDER} from "../actions/action-orders";
import {
    CLEAR_SELECTED, CLEAR_SELECTED_ORDER
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

        case SET_IS_SELECTED_ORGANIZATION:
            return Object.assign({}, state, {
                organization: action.payload,
            });

        default:
            return state
    }
}


