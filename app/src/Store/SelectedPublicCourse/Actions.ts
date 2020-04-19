import {sendDataToDatabase} from "../Firebase/Actions";
import {getPublicCourseById} from "../PublicCourses/Selectors";
import * as _ from "lodash";
import {getSelectedPublicCourse} from "./Selectors";
import {
    CLEAR_SELECTED_PUBLIC_COURSE,
    SELECT_PUBLIC_COURSE,
    SET_IS_SELECTED_PUBLIC_COURSE,
    UPDATE_SELECTED_PUBLIC_COURSE
} from "./ActionTypes";
import {IDispatch, IGetState, IState} from "../../Interfaces/ReduxInterfaces";
import {IPublicCourseLecture, calculateDuration} from "@violet/common";
import {updateObject} from "../../Util/ObjectUpdater";

export function selectPublicCourse(courseId: string) {
    return function selectPublicCourse(dispatch: IDispatch, getState: IGetState) {
        const publicCourse = getPublicCourseById(getState(), courseId);
        dispatch(setIsSelectedPublicCourse());
        dispatch({
            type: SELECT_PUBLIC_COURSE,
            payload: publicCourse
        });
    };
}

export function updateSelectedPublicCourse(key: string, value: string | boolean | IPublicCourseLecture[]) {
    return function updateSelectedPublicCourse(dispatch: IDispatch, getState: IGetState) {
        const currentPublicCourse = getSelectedPublicCourse(getState());
        const selectedPublicCourse = updateObject(currentPublicCourse, {[key]: value});
        dispatch({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: selectedPublicCourse,
        });
    };
}

function getSelectedPublicCourseLecture(state: IState) {
    return _.cloneDeep(getSelectedPublicCourse(state).lectures);
}

export function updatePublicCourseLecture(key: string, value: string | boolean | number, lectureId: number) {
    return function updatePublicCourseLecture(dispatch: IDispatch, getState: IGetState) {
        const lectures = getSelectedPublicCourseLecture(getState());
        // @ts-ignore
        lectures[lectureId][key] = value;
        lectures[lectureId].duration = calculateDuration(lectures[lectureId]);
        dispatch(updateSelectedPublicCourse("lectures", lectures));
    };
}

export function addLectureToSelectedPublicCourse() {
    return function addLectureToSelectedPublicCourse(dispatch: IDispatch, getState: IGetState) {
        let lectures = getSelectedPublicCourseLecture(getState());

        if (!lectures) {
            lectures = [{
                id: 0,
                active: true,
            } as IPublicCourseLecture];
        } else {
            const nextId = _.keys(lectures).length;
            lectures.push({
                id: nextId,
                active: true,
            } as IPublicCourseLecture);
        }

        dispatch(updateSelectedPublicCourse("lectures", lectures));
    };
}

export function setIsSelectedPublicCourse() {
    return {
        type: SET_IS_SELECTED_PUBLIC_COURSE,
    };
}

export function sendSelectedPublicCourseToDatabase() {
    return async function sendSelectedPublicCourseToDatabase(dispatch: IDispatch, getState: IGetState) {
        await dispatch(updateSelectedPublicCourse("changedDate", new Date().toJSON()));
        const selectedPublicCourse = getSelectedPublicCourse(getState());

        return sendDataToDatabase("/publicCourses/" + selectedPublicCourse.id, selectedPublicCourse);
    };
}

export function clearSelectedPublicCourse() {
    return {
        type: CLEAR_SELECTED_PUBLIC_COURSE
    };
}
