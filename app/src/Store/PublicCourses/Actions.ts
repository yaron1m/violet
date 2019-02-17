import * as actionTypes from "./ActionTypes";
import IPublicCourse from "../../Interfaces/IPublicCourse";

export function receivePublicCourses(courses: { [id: string]: IPublicCourse }) {
    return {
        type: actionTypes.RECEIVE_PUBLIC_COURSES,
        payload: courses,
    };
}
