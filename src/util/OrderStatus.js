import * as _ from "lodash";
import {getStatusLabels} from "../store/labels/reducer";
import {getSelectedOrder} from "../store/SelectedOrder/Selectors";
import {progressiveStatuses, terminatingStatuses} from "./Constants/Status";

export default function calculateOrderStatus(order) {
    let possibleStatuses = _.values(terminatingStatuses);
    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            return possibleStatuses[i];
        }
    }

    possibleStatuses = _.values(progressiveStatuses);
    let status;

    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, possibleStatuses[i])) {
            status = possibleStatuses[i];
        }
        else {
            break;
        }
    }

    return status;
}

function meetsRequirements(order, requirement) {

    let lectureTimesDates;

    switch (requirement) {
        case progressiveStatuses.contact:
            return true;

        case progressiveStatuses.offer:
            return existsAndNotEmpty(order, "lectureTimes") && _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));

        case progressiveStatuses.order:
            return Boolean(order.lectureTimes[0].date);

        case progressiveStatuses.approvedOrder:
            return existsAndNotEmpty(order, "orderApproved");

        case progressiveStatuses.isExecuting: {
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            const tomorrowMorning = new Date();
            tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
            tomorrowMorning.setHours(0, 0, 0, 0);
            return _.some(lectureTimesDates, date => new Date(date) <= tomorrowMorning);
        }

        case progressiveStatuses.executed: {

            if (existsAndNotEmpty(order, "proformaInvoiceNumber") || existsAndNotEmpty(order, "taxInvoiceNumber")) {
                lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
                const tomorrowMorning = new Date();
                tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
                tomorrowMorning.setHours(0, 0, 0, 0);
                return _.every(lectureTimesDates, date => new Date(date) <= tomorrowMorning);
            }

            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            const thisMorning = new Date();
            //yesterday.setDate(yesterday.getDate() - 1);
            thisMorning.setHours(0, 0, 0, 0);
            return _.every(lectureTimesDates, date => new Date(date) <= thisMorning);
        }

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
    const labels = getStatusLabels(state);
    if (_.isEmpty(order))
        return labels[progressiveStatuses.contact];

    let status = labels[order.status];
    if (order.followUpRequired)
        status += labels.followUp;
    return status;
}

export function isMatchingStatus(order, status) {
    if (_.isArray(status))
        return _.includes(status, order.status);

    return order.status === status;
}
