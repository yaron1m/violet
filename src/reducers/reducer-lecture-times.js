import {ADD_LECTURE_TIME, REMOVE_LECTURE_TIME} from '../actions/action-types'

export default function(state = [{}], action){
    switch (action.type) {
        case ADD_LECTURE_TIME:
            return state.concat({}); //TODO I read somewhere I should not modify state but return a new one

        case REMOVE_LECTURE_TIME:
            if(action.index >= state.length){
                return state;
            }
            return state.splice(action.index, 1);

        default:
            return state;
    }
}