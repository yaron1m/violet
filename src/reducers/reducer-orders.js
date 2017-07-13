import {RECEIVE_ORDERS} from '../actions/action-orders';


export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ORDERS:
            return action.payload;

        default:
            return state
    }
}


