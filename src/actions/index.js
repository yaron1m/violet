import { ADD_LECTURE_TIME, REMOVE_LECTURE_TIME } from './action-types';

export function addLectureTime(newTimesIndex) {
    return {
        type: ADD_LECTURE_TIME,
        newTimesIndex: newTimesIndex,
    };
}


export function removeLectureTime(index) {
    return {
        type: REMOVE_LECTURE_TIME,
        index: index,
    };
}