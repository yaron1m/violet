import * as actionTypes from './action-types';
import * as _ from "lodash";
import {LOGGED_OUT} from "../firebase/action-types";
import {getSelectedOrganization} from "../selected/reducer";
import {getOrganizationById} from "../organizations/reducer";
import {getOrderStatus, Status} from "../../util/order-status";

export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORDERS:
            return action.payload;

        case LOGGED_OUT:
            return {};

        default:
            return state
    }
}

export function getOrders(state, status = null) {
    const orders = state.orders;

    if (status === null)
        return orders;
    return _.filter(orders, order => order.status === status);
}

export function getOrderById(state, id) {
    return getOrders(state)[id];
}

export function getNextOrderId(state) {
    const orders = getOrders(state);
    const keys = _.keys(orders);
    if (!orders || keys.length === 0)
        return null;
    return _.max(_.map(_.keys(orders), _.parseInt)) + 1;
}

export function getOrdersByOrganization(state) {
    const organizationId = getSelectedOrganization(state).id;
    return _.values(getOrders(state)).filter((order) => order.organizationId === organizationId);
}

export function getOrdersSummary(state) {
    const orders = getOrdersByOrganization(state);

    function map(order) {
        const result = {
            id: order.id,
            status: getOrderStatus(state, order),
        };
        if (!_.isEmpty(order.lectureTimes)) {
            result.date = order.lectureTimes[0].date;
            result.topic = order.lectureTimes[0].topic;
        }

        return result;
    }

    return _.map(orders, map)
}

export function getFollowUpOrdersSummary(state) {
    const orders = _.filter(getOrders(state), order => order.followUpRequired);

    function map(order) {
        const result = {
            id: order.id,
            status: getOrderStatus(state, order),
        };
        if (!_.isEmpty(order.lectureTimes)) {
            result.lectureDate = order.lectureTimes[0].date;
            result.topic = order.lectureTimes[0].topic;
            result.followUpDate = order.followUpDate;
            result.followUpDetails = order.followUpDetails;
            result.followUpDate = order.followUpDate;
            result.organizationName = getOrganizationById(state, order.organizationId).organizationName;
        }

        return result;
    }

    return _.map(orders, map)
}

export function getAllLectureTimes(state, status = null) {

    function getMappedLectureTimes(order) {

        return _.map(order.lectureTimes, function (time) {
            time.orderId = order.id;
            time.status = order.status;
            time.organizationName = getOrganizationById(state, order.organizationId).organizationName;
            return time;
        });
    }

    const orders = getOrders(state, status);
    return _.flatMap(orders, getMappedLectureTimes);
}

export function getWaitingPaymentOrders(state) {
    const orders = getOrders(state, Status.waitingPayment);

    function map(order) {
        const result = {
            id: order.id,
            status: getOrderStatus(state, order),
        };
        if (!_.isEmpty(order.lectureTimes)) {
            result.lectureDate = order.lectureTimes[0].date;
            result.topic = order.lectureTimes[0].topic;
            result.expectedPayDate = order.expectedPayDate;
            result.amount = order.amount;
            result.organizationName = getOrganizationById(state, order.organizationId).organizationName;
        }

        return result;
    }

    return _.sortBy(_.map(orders, map), x => x.expectedPayDate)
}