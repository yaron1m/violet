import {ADD_LECTURE_TIME, REMOVE_LECTURE_TIME} from '../actions/action-types'

const initialState = {
    array: [{}]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LECTURE_TIME:
            return Object.assign({}, state, {
                array: state.array.concat({})
            });

        case REMOVE_LECTURE_TIME:
            const thisArray = state.array;
            thisArray.splice(action.index, 1);
            return Object.assign({}, state, {
                array: thisArray
            });

        default:
            return state;
    }
}