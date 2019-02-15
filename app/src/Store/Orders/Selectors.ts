/* eslint-disable no-magic-numbers */
import _ from "lodash";
import {getOrganizationById} from "../Organizations/Selectors";
import {isMatchingStatus} from "../../Util/OrderStatus/OrderStatusUtils";
import {cutIfLong, isEmptyValue, moneyFormat} from "../../Util/StringUtil";
import getActionRequiredOrdersArray from "./ActionRequiredOrderes";
import {getLabels} from "../Labels/Selectors";
import {getSelectedOrganization, isSelectedOrganization} from "../SelectedOrganization/Selectors";
import {getOrderStatusLabel} from "../Labels/Selectors";
import {isPublicCourseOrder} from "../SelectedOrder/Selectors";
import {getPublicCourseByOrder, getPublicCourses} from "../PublicCourses/Selectors";
import {EntityType} from "../../Util/Constants/EntityType";
import {IState} from '../../Interfaces/ReduxInterfaces';
import {toMutable} from '../../Util/ObjectUpdater';
import {Status} from '../../Util/Constants/Status';
import IOrder from '../../Interfaces/IOrder';
import IPublicCourse from '../../Interfaces/IPublicCourse';

function getOrdersMap(state: IState) {
    return toMutable(state.orders);
}

export function getOrders(state: IState, status?: Status | Status[]): IOrder[] {
    const orders = getOrdersMap(state);

    if (status === undefined)
        return _.values(orders);

    return _.filter(orders, order => isMatchingStatus(order, status));
}

export function getOrderById(state: IState, id: string): IOrder {
    return getOrdersMap(state)[id];
}

export function getNextOrderId(state: IState) {
    const orders = getOrdersMap(state);
    const keys = _.keys(orders);
    if (!orders || keys.length === 0)
        return 5000;

    // @ts-ignore
    return _.chain(orders).keys().map(_.parseInt).max() + 1;
}

export function getOrdersByOrganization(state: IState) {
    if (!isSelectedOrganization(state))
        return [];

    const organizationId = getSelectedOrganization(state).id;
    return getOrders(state).filter((order) => order.organizationId === organizationId);
}

export interface IFollowUpOrderSummary {
    orderId: number;
    status: string;
    createdDate: string;
    followUpDate: string;
    followUpDetails: string;
    organizationName: string;
    topic: string;
}

export function getFollowUpOrdersSummary(state: IState) {
    const orders = _.filter(getOrders(state), order => order.followUpRequired);

    function map(order: IOrder) {
        const result: IFollowUpOrderSummary = {
            orderId: order.id,
            status: getOrderStatusLabel(state, order),
            createdDate: order.createdDate,
            followUpDate: order.followUpDate,
            followUpDetails: cutIfLong(order.followUpDetails, 30),
            organizationName: cutIfLong(getOrganizationById(state, order.organizationId.toString()).organizationName, 20),
            topic: "",
        };
        if (isPublicCourseOrder(order)) {
            result.topic = getLabels(state).orderTypes.publicCourse;
        } else {
            if (!_.isEmpty(order.lectureTimes)) {
                result.topic = cutIfLong(order.lectureTimes[0].topic, 15);
            }
        }
        return result;
    }

    return _.map(orders, map);
}

//TODO update tests
export function getAllLectureTimes(state: IState, status?: Status | Status[]) {
    function getMappedLectureTimes(order: IOrder): ILectureTimeSummary[] {
        return _.map(order.lectureTimes, time => ({
            date: time.date,
            topic: time.topic,
            orderId: order.id.toString(),
            organizationName: getOrganizationById(state, order.organizationId.toString()).organizationName,
            entityType: EntityType.order,
            entityId: order.id,
        }));
    }

    const internalLectures = _.flatMap(getOrders(state, status), getMappedLectureTimes);

    function mapPublicCourses(course: IPublicCourse): ILectureTimeSummary[] {
        return _.map(course.lectures, lecture => ({
            date: lecture.date,
            topic: lecture.topic,
            orderId: course.courseName,
            organizationName: getLabels(state).orderTypes.publicCourse,

            entityType: EntityType.publicCourse,
            entityId: course.id
        }));
    }

    const publicCourseLectures = _.flatMap(getPublicCourses(state), mapPublicCourses);

    return _.concat(internalLectures, publicCourseLectures);
}

export interface ILectureTimeSummary {
    orderId: string;
    date: string;
    topic: string;
    organizationName: string;
    entityType: EntityType;
    entityId: number;
}

export interface IExpectedIncomeOrderSummary {
    orderId: number;
    status: string;
    proformaInvoiceNumber: string;
    expectedPayDate: string;
    totalSum: string;
    organizationName: string;
    topic: string;
    lectureDate: string;
}

export function getExpectedIncomeOrders(state: IState, status: Status | Status[]) {
    const orders = getOrders(state, status);

    function map(order: IOrder) {
        const result: IExpectedIncomeOrderSummary = {
            orderId: order.id,
            status: cutIfLong(getOrderStatusLabel(state, order), 20),
            proformaInvoiceNumber: order.proformaInvoiceNumber,
            expectedPayDate: order.expectedPayDate,
            totalSum: moneyFormat(order.totalSum, getLabels(state).currencyIcon),
            organizationName: cutIfLong(getOrganizationById(state, order.organizationId.toString()).organizationName, 25),
            topic: "",
            lectureDate: "",
        };
        if (isPublicCourseOrder(order)) {
            result.topic = getLabels(state).orderTypes.publicCourse;
        } else {
            if (!_.isEmpty(order.lectureTimes)) {
                result.lectureDate = order.lectureTimes[0].date;
                result.topic = cutIfLong(order.lectureTimes[0].topic, 25);
            }
        }

        return result;
    }

    return _.sortBy(_.map(orders, map), x => x.expectedPayDate);
}

export interface IOrderSummary {
    orderId: number;
    status: string;
    organizationName: string;
    date: string;
    topic: string;
}

export function getOrdersSummary(state: IState, getOrdersFunction: (state: IState) => IOrder[]) {
    const orders = getOrdersFunction(state);

    function map(order: IOrder) {
        const result: IOrderSummary = {
            orderId: order.id,
            status: getOrderStatusLabel(state, order),
            organizationName: getOrganizationById(state, order.organizationId.toString()).organizationName,
            date: "",
            topic: "",
        };

        if (isPublicCourseOrder(order)) {
            const publicCourse = getPublicCourseByOrder(state, order);
            if (!publicCourse) //Did not load yet
                return result;

            const minLecture = _.minBy(publicCourse.lectures, lecture => new Date(lecture.date));
            result.date = minLecture && minLecture.date ? minLecture.date : "";
            result.topic = getLabels(state).orderTypes.publicCourse + " " + publicCourse.courseName;
        } else {
            if (!_.isEmpty(order.lectureTimes)) {
                result.date = order.lectureTimes[0].date;
                result.topic = order.lectureTimes[0].topic;
            }
        }

        return result;
    }

    return _.map(orders, map);
}

export function getActionRequiredOrders(state: IState) {
    return getActionRequiredOrdersArray(state);
}

//TODO test function
export function getPublicCourseParticipantsSummary(state: IState) {
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