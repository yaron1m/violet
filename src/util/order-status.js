import * as Immutable from "seamless-immutable";
import * as _ from "lodash";
import {getLabels} from "../store/labels/reducer";
import {getSelectedOrder} from "../store/selected/reducer";

export const Status = {
    contact: "contact",
    offer: "offer",
    order: "order",
    approvedOrder: "approvedOrder",
    isExecuting: "isExecuting",
    executed: "executed",
    waitingPayment: "waitingPayment",
    payed: "payed",
    cancelled: "cancelled",
};

export default function calculateOrderStatus(order) {

    let status;

    const possibleStatuses = _.values(Status);

    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            status = possibleStatuses[i];
        } else {
            break;
        }
    }

    if (meetsRequirements(order, Status.cancelled))
        status = Status.cancelled;

    return Immutable.merge(order, {
        status: status
    });
}

function meetsRequirements(order, requirement) {

    let lectureTimesDates;
    let now;

    switch (requirement) {
        case Status.contact:
            return true;

        case Status.offer:
            return existsAndNotEmpty(order, "lectureTimes") && _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));

        case Status.order:
            return Boolean(order.lectureTimes[0].date);

        case Status.approvedOrder:
            return existsAndNotEmpty(order, "orderApproved");

        case Status.isExecuting:
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            now = new Date();
            return _.some(lectureTimesDates, date => new Date(date) < now);

        case Status.executed:
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            now = new Date();
            return _.every(lectureTimesDates, date => new Date(date) <= now);

        case Status.waitingPayment:
            return existsAndNotEmpty(order, "proformaInvoiceNumber") || existsAndNotEmpty(order, "taxInvoiceNumber");

        case Status.payed:
            return existsAndNotEmpty(order, "receiptNumber");

        case Status.cancelled:
            return order.cancelled;

        default:
            return false;
    }
}

function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key];
}

export function getStatus(state) {
    const labels = getLabels(state);
    const selectedOrder = getSelectedOrder(state);
    if (_.isEmpty(selectedOrder))
        return labels.orderPage.orderStatus[Status.contact];

    let status = labels.orderPage.orderStatus[selectedOrder.status];
    if(selectedOrder.followUpRequired)
        status += labels.orderPage.orderStatus.followUp;
    return status;
}
