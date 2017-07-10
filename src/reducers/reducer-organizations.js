import {REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS, LOAD_ORGANIZATION_TO_FORM} from '../actions/action-organizations';

const initialState = {
    isFetching: false,
    data: {},
    selected: {},
};

export default (state = initialState, action) => {
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

        case LOAD_ORGANIZATION_TO_FORM:
            let newSelected = state.data[action.payload];
            return Object.assign({}, state, {
                selected: newSelected
            });

        default:
            return state
    }
}


