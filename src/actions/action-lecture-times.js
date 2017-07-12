export const ADD_LECTURE_TIME = 'ADD_LECTURE_TIME';
export const REMOVE_LECTURE_TIME = 'REMOVE_LECTURE_TIME';

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