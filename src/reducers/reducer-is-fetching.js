import {REQUEST_DATA} from "../actions/action-database";
import {RECEIVE_ORDERS} from "../actions/action-orders";
import {RECEIVE_ORGANIZATIONS} from "../actions/action-organizations";
import {RECEIVE_OFFERED_LECTURES} from "../store/offered-lectures/action-types";

const initialState = {
    isFetching: false,
    numberOfFetchingActions: 0,
};

export default(state = initialState, action) => { //TODO needs fix
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

