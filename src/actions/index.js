import { ADD_LECTURE_TIME, REMOVE_LECTURE_TIME } from './action-types';

export function addLectureTime() {
    return {
        type: ADD_LECTURE_TIME
    };
}


export function removeLectureTime(index) {
    return {
        type: REMOVE_LECTURE_TIME,
        index: index,
    };
}