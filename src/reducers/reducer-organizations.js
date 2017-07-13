import {RECEIVE_ORGANIZATIONS} from '../actions/action-database';



export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ORGANIZATIONS:
            return action.payload;

        default:
            return state
    }
}


