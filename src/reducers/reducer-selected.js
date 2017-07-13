import {SELECT_ORGANIZATION} from '../actions/action-organizations';

const initialState={
    organization:{},
    order:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ORGANIZATION:
            return Object.assign({}, state, {
                organization: action.payload,
            });

        default:
            return state
    }
}


