import _ from "lodash";
import {hasDatePassed, IOrder, IPublicCourse, isPublicCourseOrder} from "@violet/common";
import {getOrders} from "../Orders/Selectors";
import {moneyFormat} from "../../Util/StringUtil";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {toMutable} from "../../Util/ObjectUpdater";

export function getPublicCourses(state: IState) {
    return toMutable(state.publicCourses);
}

export function getActivePublicCourses(state: IState) {
    return _.filter(getPublicCourses(state), publicCourse => {
        const activeLectures = _.filter(publicCourse.lectures, lecture => lecture.active);
        return _.some(activeLectures, lecture => !hasDatePassed(lecture.date));
    });
}

export function getNextPublicCourseId(state: IState) {
    const courses = getPublicCourses(state);
    const keys = _.keys(courses);
    if (!courses || keys.length === 0)
        return 100;

    const maxId = _.max(_.map(_.keys(courses), _.parseInt));
    if (!maxId)
        return 100;

    return maxId + 1;
}

export function getPublicCourseById(state: IState, id: string) {
    return getPublicCourses(state)[id];
}

export function getPublicCourseByOrder(state: IState, order: IOrder) {
    return getPublicCourses(state)[order.publicCourseId];
}

export interface IPublicCourseSummary {
    id: number;
    courseName: string;
    courseLocation: string;
    date: string;
    courseIncome: string;
}

export function getPublicCoursesSummary(state: IState) {
    const courses = getPublicCourses(state);

    function map(course: IPublicCourse) {
        const result: IPublicCourseSummary = {
            id: course.id,
            courseName: course.courseName,
            courseLocation: course.courseLocation,
            date: "",
            courseIncome: "",
        };
        const activeLectures = _.filter(course.lectures, x => x.active);
        if (!_.isEmpty(activeLectures)) {
            const dates = _.map(activeLectures, x => x.date);
            result.date = dates.sort()[0];
        }

        const orders = getOrders(state);
        const publicCourseOrders = _.filter(orders, order => isPublicCourseOrder(order) && order.publicCourseId === course.id);
        result.courseIncome = moneyFormat(_.sumBy(publicCourseOrders, x => _.toNumber(x.cost)).toString());

        return result;
    }

    return _.reverse(_.map(courses, map));
}