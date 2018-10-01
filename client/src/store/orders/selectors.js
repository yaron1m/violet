/* eslint-disable no-magic-numbers */
import * as _ from "lodash";
import {getOrganizationById} from "../Organizations/Selectors";
import {isMatchingStatus} from "../../util/OrderStatus/OrderStatusUtils";
import {cutIfLong, isEmptyValue, moneyFormat} from "../../util/StringUtil";
import getActionRequiredOrdersArray from "./action-required-orders";
import {getLabels} from "../Labels/Selectors";
import {getSelectedOrganization, isSelectedOrganization} from "../SelectedOrganization/Selectors";
import {getOrderStatusLabel} from "../Labels/Selectors";
import {isPublicCourseOrder} from "../SelectedOrder/Selectors";
import {getPublicCourseByOrder, getPublicCourses} from "../PublicCourses/Selectors";
import entityTypes from "../../util/Constants/EntityTypes";

export function getOrders(state, status = null) {
    const orders = state.orders;

    if (status === null)
        return orders;

    return _.filter(orders, order => isMatchingStatus(order, status));
}

export function getOrderById(state, id) {
    return getOrders(state)[id];
}

export function getNextOrderId(state) {
    const orders = getOrders(state);
    const keys = _.keys(orders);
    if (!orders || keys.length === 0)
        return 5000;

    return _.chain(orders).keys().map(_.parseInt).max() + 1;
}

export function getOrdersByOrganization(state) {
    if (!isSelectedOrganization(state))
        return null;

    const organizationId = getSelectedOrganization(state).id;
    return _.values(getOrders(state)).filter((order) => order.organizationId === organizationId);
}

export function getFollowUpOrdersSummary(state) {
    const orders = _.filter(getOrders(state), order => order.followUpRequired);

    function map(order) {
        const result = {
            id: order.id,
            status: getOrderStatusLabel(state, order),
            createdDate: order.createdDate,
            followUpDate: order.followUpDate,
            followUpDetails: cutIfLong(order.followUpDetails, 30),
            organizationName: cutIfLong(getOrganizationById(state, order.organizationId).organizationName, 20),
        };
        if (isPublicCourseOrder(order)) {
            result.topic = getLabels(state).orderTypes.publicCourse;
        }
        else {
            if (!_.isEmpty(order.lectureTimes)) {
                result.topic = cutIfLong(order.lectureTimes[0].topic, 15);
            }
        }
        return result;
    }

    return _.map(orders, map)
}

//TODO update tests
export function getAllLectureTimes(state, status = null, includePublicCourse = false) {
    function getMappedLectureTimes(order) {
        return _.map(order.lectureTimes, time => {
            time.info = {
                type: entityTypes.order,
                id: order.id,
            };
            time.orderId = order.id;
            time.organizationName = getOrganizationById(state, order.organizationId).organizationName;
            return time;
        });
    }

    const internalLectures = _.flatMap(getOrders(state, status), getMappedLectureTimes);
    if (!includePublicCourse)
        return internalLectures;

    function mapPublicCourses(course) {
        return _.map(course.lectures, function (lecture) {
            lecture.info = {
                type: entityTypes.publicCourse,
                id: course.id,
            };
            lecture.orderId = course.courseName;
            lecture.organizationName = getLabels(state).orderTypes.publicCourse;
            lecture.isPublicCourseOrder = true;
            return lecture;
        });
    }

    const publicCourseLectures = _.flatMap(getPublicCourses(state), mapPublicCourses);

    return _.concat(internalLectures, publicCourseLectures);
}

export function getExpectedIncomeOrders(state, status) {
    const orders = getOrders(state, status);

    function map(order) {
        const result = {
            id: order.id,
            status: cutIfLong(getOrderStatusLabel(state, order), 20),
            proformaInvoiceNumber: order.proformaInvoiceNumber,
            expectedPayDate: order.expectedPayDate,
            totalSum: moneyFormat(order.totalSum, getLabels(state).currencyIcon),
            organizationName: cutIfLong(getOrganizationById(state, order.organizationId).organizationName, 25),
        };
        if (isPublicCourseOrder(order)) {
            result.topic = getLabels(state).orderTypes.publicCourse;
        }
        else {
            if (!_.isEmpty(order.lectureTimes)) {
                result.lectureDate = order.lectureTimes[0].date;
                result.topic = cutIfLong(order.lectureTimes[0].topic, 25);
            }
        }

        return result;
    }

    return _.sortBy(_.map(orders, map), x => x.expectedPayDate);
}

export function getOrdersSummary(state, getOrdersFunction) {
    const orders = getOrdersFunction(state);

    function map(order) {
        const result = {
            id: order.id,
            status: getOrderStatusLabel(state, order),
            organizationName: getOrganizationById(state, order.organizationId).organizationName
        };

        if (isPublicCourseOrder(order)) {
            const publicCourse = getPublicCourseByOrder(state, order);
            if (!publicCourse) //Did not load yet.
                return result;

            result.date = _.minBy(publicCourse.lectures, lecture => new Date(lecture.date)).date;
            result.topic = getLabels(state).orderTypes.publicCourse + " " + publicCourse.courseName;
        }
        else {
            if (!_.isEmpty(order.lectureTimes)) {
                result.date = order.lectureTimes[0].date;
                result.topic = order.lectureTimes[0].topic;
            }
        }

        return result;
    }

    return _.map(orders, map)
}

export function getActionRequiredOrders(state) {
    return getActionRequiredOrdersArray(state);
}

//TODO test function
export function getPublicCourseParticipantsSummary(state) {
    if (_.isEmpty(getPublicCourses(state))) {
        return [];
    }

    const orders = getOrders(state);
    const publicCourseOrders = _.filter(orders, order => isPublicCourseOrder(order) && !isEmptyValue(order, "publicCourseId"));

    return _.flatMap(publicCourseOrders,
        order => _.map(order.publicCourseParticipants, participant => {
            return {
                orderId: order.id,
                organizationId: order.organizationId,
                participantFirstName: participant.participantFirstName,
                participantLastName: participant.participantLastName,
                publicCourseName: getPublicCourseByOrder(state, order).courseName,
            };
        }));
}