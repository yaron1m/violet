import _ from "lodash";
import {hasDatePassed} from "../../Util/TimeUtil";
import {getOrders} from "../Orders/Selectors";
import {moneyFormat} from "../../Util/StringUtil";
import {isPublicCourseOrder} from "../SelectedOrder/Selectors";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {toMutable} from "../../Util/ObjectUpdater";
import IOrder from "../../Interfaces/IOrder";
import IPublicCourse from "../../Interfaces/IPublicCourse";

export function getPublicCourses(state: IState) {
    return toMutable(state.publicCourses);
}

export function getActivePublicCourses(state: IState) {
    return _.filter(getPublicCourses(state), course => {
        return _.some(course.lectures, lecture => !hasDatePassed(lecture.date));
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
        if (!_.isEmpty(course.lectures)) {
            const dates = _.map(course.lectures, x => x.date);
            result.date = dates.sort()[0];
        }

        const orders = getOrders(state);
        const publicCourseOrders = _.filter(orders, order => isPublicCourseOrder(order) && order.publicCourseId === course.id);
        result.courseIncome = moneyFormat(_.sumBy(publicCourseOrders, x => _.toNumber(x.cost)).toString());

        return result;
    }

    return _.reverse(_.map(courses, map));
}