import * as actionTypes from './action-types';

export function receivePublicCourses(courses) {
    return {
        type: actionTypes.RECEIVE_PUBLIC_COURSES,
        payload: courses,
    };
}

