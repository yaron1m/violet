const _ = require("lodash");

exports.calculateOrderStatus = function (order) {
    if (isPublicCourseOrder(order))
        return order.status;
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
        } else {
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

        case progressiveStatuses.isExecuting:
            lectureTimesDates = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
            const tomorrowMorning = new Date();
            tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
            tomorrowMorning.setHours(0, 0, 0, 0);
            return _.some(lectureTimesDates, date => new Date(date) <= tomorrowMorning);

        case progressiveStatuses.executed:
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

function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key];
}

const terminatingStatuses = {
    cancelled: "cancelled",
    rejected: "rejected",
};

const progressiveStatuses = {
    contact: "contact",
    offer: "offer",
    order: "order",
    approvedOrder: "approvedOrder",
    isExecuting: "isExecuting",
    executed: "executed",
    waitingPayment: "waitingPayment",
    payed: "payed",
};

function isPublicCourseOrder(order) {
    return order.lectureDetailsTabKey === "publicCourseTab";
}

