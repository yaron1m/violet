import {RECEIVE_ORDERS} from '../actions/action-database';


export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ORDERS:
            return action.payload;

        default:
            return state
    }
}


