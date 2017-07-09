import {REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS} from '../actions/action-organizations';

export default (state = {isFetching: false, data:{}}, action) => {
    switch (action.type) {
        case REQUEST_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_ORGANIZATIONS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                data: action.payload,
            });
        default:
            return state
    }
}


