import {SELECT_ORGANIZATION} from '../actions/action-organizations';
import {SELECT_ORDER} from "../actions/action-orders";

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
            return Object.assign({}, state, {
                order: action.payload,
            });

        default:
            return state
    }
}


