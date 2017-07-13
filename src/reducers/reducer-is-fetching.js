import {
    REQUEST_DATA, RECEIVE_ORDERS, RECEIVE_OFFERED_LECTURES,
    RECEIVE_ORGANIZATIONS
} from "../actions/action-database";

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

