import * as _ from "lodash";
import {progressiveStatuses, terminatingStatuses} from "../Constants/Status";
import {existsAndNotEmpty} from "./OrderStatusUtils";

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
    switch (requirement) {
        case progressiveStatuses.contact:
            return isContact();

        case progressiveStatuses.offer:
            return isOffer(order);

        case progressiveStatuses.order:
            return isOrder(order);

        case progressiveStatuses.approvedOrder:
            return isApprovedOrder(order);

        case progressiveStatuses.isExecuting:
            return isExecuting(order);

        case progressiveStatuses.executed:
            return isExecuted(order);

        case progressiveStatuses.waitingPayment:
            return isWaitingPayment(order);

        case progressiveStatuses.payed:
            return isPayed(order);

        case terminatingStatuses.cancelled:
            return isCancelled(order);

        case terminatingStatuses.rejected:
            return isRejected(order);

        default:
            return false;
    }
}

function isContact() {
    // An order is always a contact
    return true;
}

function isOffer(order) {
    // Order must have at least one lecture time with a topic
    if (!existsAndNotEmpty(order, "lectureTimes"))
        return false;

    return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));
}

function isOrder(order) {
    // Order must have at lease one lecture with date
    return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.date));
}

function isApprovedOrder(order) {
    // Order must be approved
    return existsAndNotEmpty(order, "orderApproved");
}

function isExecuting(order) {
    // At least one lectures is done

    const lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
    const tomorrowMorning = new Date();
    tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
    tomorrowMorning.setHours(0, 0, 0, 0);
    return _.some(lectureTimesDates, date => new Date(date) <= tomorrowMorning);
}

function isExecuted(order) {
    // All lectures passed
    const lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
    const thisMorning = new Date();
    const pastUtcMidnightHours = 4;
    thisMorning.setHours(pastUtcMidnightHours, 0, 0, 0);
    return _.every(lectureTimesDates, date => new Date(date) <= thisMorning);
}

function isWaitingPayment(order) {
    // Order has proforma or tax invoice number
    return existsAndNotEmpty(order, "proformaInvoiceNumber")
        || existsAndNotEmpty(order, "taxInvoiceNumber");
}

function isPayed(order){
    return existsAndNotEmpty(order, "receiptNumber");
}

function isCancelled(order){
    return order.cancelled;
}

function isRejected(order){
    return order.rejected;
}
