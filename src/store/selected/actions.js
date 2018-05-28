import {getOrganizationById} from "../organizations/reducer";
import {getSelectedOrganization} from "../SelectedOrganization/Selectors";
import {sendDataToDatabase} from "../firebase/actions";
import * as Immutable from "seamless-immutable";
import {getPublicCourseById} from "../PublicCourses/reducer";
import {calculateDuration} from "../../util/time-util";
import * as _ from "lodash";
import {getSelectedPublicCourse} from "../SelectedPublicCourse/Selectors";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../SelectedOrganization/ActionTypes";
import {
    SELECT_PUBLIC_COURSE,
    SET_IS_SELECTED_PUBLIC_COURSE,
    UPDATE_SELECTED_PUBLIC_COURSE
} from "../SelectedPublicCourse/ActionTypes";
import {changeImmutable} from "../../util/ObjectUpdater";

// Organizations:
export function selectOrganization(organizationId) {
    return function selectOrganization(dispatch, getState) {
        const organization = getOrganizationById(getState(), organizationId);
        dispatch({
            type: SELECT_ORGANIZATION,
            payload: organization
        })
    };
}

export function updateSelectedOrganization(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const currentOrganization = getSelectedOrganization(getState());
        const selectedOrganization = changeImmutable(currentOrganization, key, value);
        dispatch({
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: selectedOrganization,
        });
    }
}

export function setIsSelectedOrganization() {
    return {
        type: SET_IS_SELECTED_ORGANIZATION,
    }
}

export function sendSelectedOrganizationToDatabase() {
    return async function sendSelectedOrganizationToDatabase(dispatch, getState) {
        await dispatch(updateSelectedOrganization("changedDate", new Date().toJSON()));
        const selectedOrganization = getSelectedOrganization(getState());

        return sendDataToDatabase('/organizations/' + selectedOrganization.id, selectedOrganization);
    }
}

// Orders:

// Public Courses:
export function selectPublicCourse(courseId) {
    return function selectPublicCourse(dispatch, getState) {
        const publicCourse = getPublicCourseById(getState(), courseId);
        dispatch(setIsSelectedPublicCourse());
        dispatch({
            type: SELECT_PUBLIC_COURSE,
            payload: publicCourse
        })
    };
}

export function updateSelectedPublicCourse(key, value) {
    return function updateSelectedPublicCourse(dispatch, getState) {
        const currentPublicCourse = getSelectedPublicCourse(getState());
        const selectedPublicCourse = changeImmutable(currentPublicCourse, key, value);
        dispatch({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: selectedPublicCourse,
        });
    }
}

export function updatePublicCourseLecture(key, value, lectureId) {
    return function updatePublicCourseLecture(dispatch, getState) {
        const lectures = Immutable.asMutable(getSelectedPublicCourse(getState()).lectures, {deep: true});
        lectures[lectureId][key] = value;
        lectures[lectureId].duration = calculateDuration(lectures[lectureId]);
        dispatch(updateSelectedPublicCourse("lectures", lectures));
    }
}

export function addLectureToSelectedPublicCourse() {
    return function addLectureToSelectedPublicCourse(dispatch, getState) {
        const selectedPublicCourse = Immutable.asMutable(getSelectedPublicCourse(getState()), {deep: true});

        let lectures;
        if (!_.hasIn(selectedPublicCourse, 'lectures')) {
            lectures = [{
                id: 0,
                active: true,
            }];
        }
        else {
            lectures = selectedPublicCourse.lectures;
            const nextId = _.keys(lectures).length;
            lectures[nextId] = {
                id: nextId,
                active: true,
            };
        }

        dispatch(updateSelectedPublicCourse("lectures", lectures));
    }
}

export function setIsSelectedPublicCourse() {
    return {
        type: SET_IS_SELECTED_PUBLIC_COURSE,
    }
}

export function sendSelectedPublicCourseToDatabase() {
    return async function sendSelectedPublicCourseToDatabase(dispatch, getState) {
        await dispatch(updateSelectedPublicCourse("changedDate", new Date().toJSON()));
        const selectedPublicCourse = getSelectedPublicCourse(getState());

        return sendDataToDatabase('/publicCourses/' + selectedPublicCourse.id, selectedPublicCourse);
    }
}



export function clearSelectedOrganization() {
    return {
        type: CLEAR_SELECTED_ORGANIZATION,
    }
}