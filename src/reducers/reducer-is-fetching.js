import {REQUEST_DATA, RECEIVE_OFFERED_LECTURES} from "../actions/action-database";
import {RECEIVE_ORDERS} from "../actions/action-orders";
import {RECEIVE_ORGANIZATIONS} from "../actions/action-organizations";

const initialState = {
    isFetching: false,
    numberOfFetchingActions: 0,
};

export default(state = initialState, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                isFetching: true,
                numberOfFetchingActions: action.payload
            };


        case RECEIVE_ORDERS:
        case RECEIVE_ORGANIZATIONS:
        case RECEIVE_OFFERED_LECTURES:
            if (state.numberOfFetchingActions === 1) {
                return {
                    isFetching: false,
                    numberOfFetchingActions: 0,
                };
            }
            return {
                isFetching: false,
                numberOfFetchingActions: state.fetching - 1,
            };


        default:
            return state
    }
};

