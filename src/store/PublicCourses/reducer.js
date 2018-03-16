import * as actionTypes from './action-types';
import _ from 'lodash';
import {LOGGED_OUT} from "../firebase/action-types";

export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_PUBLIC_COURSES:
            return action.payload;

        case LOGGED_OUT:
            return {};

        default:
            return state
    }
}

// Selectors:
export function getPublicCourses(state) {
    return state.publicCourses;
}

export function getNextPublicCourseId(state) {
    const courses = getPublicCourses(state);
    const keys = _.keys(courses);
    if (!courses || keys.length === 0)
        return null;
    return _.max(_.map(_.keys(courses), _.parseInt)) + 1;
}

export function getPublicCourseById(state, id) {
    return getPublicCourses(state)[id];
}