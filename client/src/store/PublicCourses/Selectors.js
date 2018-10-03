import _ from "lodash";
import {hasDatePassed} from "../../util/TimeUtil";
import {getOrders} from "../orders/selectors";
import {moneyFormat} from "../../util/StringUtil";
import {getLabels} from "../Labels/Selectors";

export function getPublicCourses(state) {
    return state.publicCourses;
}

export function getActivePublicCourses(state) {
    return _.filter(getPublicCourses(state), course => {
        return _.some(course.lectures, lecture => !hasDatePassed(lecture.date))
    });
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

export function getPublicCourseByOrder(state, order) {
    return getPublicCourses(state)[order.publicCourseId];
}

export function getPublicCoursesSummary(state) {
    const courses = getPublicCourses(state);

    function map(course) {
        const result = {
            id: course.id,
            courseName: course.courseName,
            courseLocation: course.courseLocation,
        };
        if (!_.isEmpty(course.lectures)) {
            const dates = _.map(course.lectures, x => x.date);
            result.date = dates.sort()[0];
        }

        const orders = getOrders(state);
        const publicCourseOrders = _.filter(orders, order => order.publicCourseId === course.id);
        result.courseIncome = moneyFormat(_.sumBy(publicCourseOrders, x => _.toNumber(x.cost)), getLabels(state).currencyIcon);

        return result;
    }

    return _.reverse(_.map(courses, map))
}