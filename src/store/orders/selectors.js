/* eslint-disable no-magic-numbers */
import * as _ from "lodash";
import {getOrganizationById} from "../organizations/reducer";
import {getOrderStatusLabel, isMatchingStatus} from "../../util/OrderStatus";
import {cutIfLong, moneyFormat} from "../../util/StringUtil";
import getActionRequiredOrdersArray from "./action-required-orders";
import {getLabels} from "../labels/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../SelectedOrganization/Selectors";

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
        if (!_.isEmpty(order.lectureTimes)) {
            result.topic = cutIfLong(order.lectureTimes[0].topic, 15);
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

    return _.flatMap(getOrders(state, status), getMappedLectureTimes);
}

export function getExpectedIncomeOrders(state, status) {
    const orders = getOrders(state, status);

    function map(order) {
        const result = {
            id: order.id,
            status: cutIfLong(getOrderStatusLabel(state, order), 20),
            proformaInvoiceNumber: order.proformaInvoiceNumber,
        };
        if (!_.isEmpty(order.lectureTimes)) {
            result.lectureDate = order.lectureTimes[0].date;
            result.topic = cutIfLong(order.lectureTimes[0].topic, 25);
            result.expectedPayDate = order.expectedPayDate;
            result.totalSum = moneyFormat(order.totalSum, getLabels(state).currencyIcon);
            result.organizationName = cutIfLong(getOrganizationById(state, order.organizationId).organizationName, 25);
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
        if (!_.isEmpty(order.lectureTimes)) {
            result.date = order.lectureTimes[0].date;
            result.topic = order.lectureTimes[0].topic;
        }

        return result;
    }

    return _.map(orders, map)
}

export function getActionRequiredOrders(state) {
    return getActionRequiredOrdersArray(state);
}