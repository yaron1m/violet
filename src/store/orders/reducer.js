import * as actionTypes from './action-types';
import * as _ from "lodash";
import {LOGGED_OUT} from "../firebase/action-types";
import {getSelectedOrganization} from "../selected/reducer";
import {getOrganizationById} from "../organizations/reducer";
import {getOrderStatus} from "../../util/order-status";

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

export function getOrders(state) {
    return state.orders;
}

export function getOrderById(state, id) {
    return state.orders[id];
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

export function getNextOrderId(state) {
    const orders = getOrders(state);
    const keys = _.keys(orders);
    if (!orders || keys.length === 0)
        return null;
    return _.max(_.map(_.keys(orders), _.parseInt)) + 1;
}

export function getAllLectureTimes(state){

    function getMappedLectureTimes(order){
        return _.map(order.lectureTimes, function(time){
            time.orderId = order.id;
            time.organizationName = getOrganizationById(state, order.organizationId).organizationName;
            return time;
            });
    }
    return _.flatMap(getOrders(state),getMappedLectureTimes);
}

export function getOrdersByStatus(state, status){
    return _.filter(getOrders(state), order => order.status === status);
}

export function getWaitingPaymentOrders(state){
    const orders = getOrdersByStatus(state,"waitingPayment");

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