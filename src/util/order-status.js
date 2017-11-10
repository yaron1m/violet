import * as Immutable from "seamless-immutable";
import * as _ from "lodash";
import {getLabels} from "../store/labels/reducer";
import {getSelectedOrder} from "../store/selected/reducer";
import {progressiveStatuses, terminatingStatuses} from "./consts/status";

export default function calculateOrderStatus(order) {

    let status;

    let possibleStatuses = _.values(progressiveStatuses);

    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            status = possibleStatuses[i];
        } else {
            break;
        }
    }

    possibleStatuses = _.values(terminatingStatuses);
    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            status = possibleStatuses[i];
            break;
        }
    }

    return Immutable.merge(order, {
        status: status
    });
}

function meetsRequirements(order, requirement) {

    let lectureTimesDates;
    let now;

    switch (requirement) {
        case progressiveStatuses.contact:
            return true;

        case progressiveStatuses.offer:
            return existsAndNotEmpty(order, "lectureTimes") && _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));

        case progressiveStatuses.order:
            return Boolean(order.lectureTimes[0].date);

        case progressiveStatuses.approvedOrder:
            return existsAndNotEmpty(order, "orderApproved");

        case progressiveStatuses.isExecuting:
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            now = new Date();
            return _.some(lectureTimesDates, date => new Date(date) < now);

        case progressiveStatuses.executed:
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            now = new Date();
            return _.every(lectureTimesDates, date => new Date(date) <= now);

        case progressiveStatuses.waitingPayment:
            return existsAndNotEmpty(order, "proformaInvoiceNumber") || existsAndNotEmpty(order, "taxInvoiceNumber");

        case progressiveStatuses.payed:
            return existsAndNotEmpty(order, "receiptNumber");

        case terminatingStatuses.cancelled:
            return order.cancelled;

        case terminatingStatuses.rejected:
            return order.rejected;

        default:
            return false;
    }
}

export function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key];
}

export function getSelectedOrderStatus(state) {
    const selectedOrder = getSelectedOrder(state);
    return getOrderStatusLabel(state, selectedOrder);

}

export function getOrderStatusLabel(state, order) {
    const labels = getLabels(state).pages.orderPage.orderStatus;
    if (_.isEmpty(order))
        return labels[progressiveStatuses.contact];

    let status = labels[order.status];
    if (order.followUpRequired)
        status += labels.followUp;
    return status;
}

export function isMatchingStatus(order, status){
    if (_.isArray(status))
        return _.includes(status, order.status);

    return order.status === status;
}
