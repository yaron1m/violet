const _ = require("lodash");

/*
 * Imports
 */
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

function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key] && isNonEmptyArray(order[key]);
}

function isNonEmptyArray(arr) {
    return _.isArray(arr) ? arr.length !== 0 : true;
}

function hasDatePassed(dateString) {
    const now = new Date();
    // eslint-disable-next-line no-magic-numbers
    now.setHours(7);
    return now >= new Date(dateString);
}
/*
 * Function
 */

exports.calculateOrderStatus = function (order, publicCourses) {

    let publicCourse = null;
    if (isPublicCourseOrder(order)) {
        publicCourse = publicCourses[order.publicCourseId];
    }

    let possibleStatuses = _.values(terminatingStatuses);
    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, publicCourse, possibleStatuses[i])) {
            return possibleStatuses[i];
        }
    }

    possibleStatuses = _.values(progressiveStatuses);
    let status;

    for (let i = 0; i < possibleStatuses.length; i++) {
        if (meetsRequirements(order, publicCourse, possibleStatuses[i])) {
            status = possibleStatuses[i];
        }
        else {
            break;
        }
    }

    return status;
};

function meetsRequirements(order, publicCourse, statusName) {
    switch (statusName) {
        case progressiveStatuses.contact:
            return isContact();

        case progressiveStatuses.offer:
            return isOffer(order);

        case progressiveStatuses.order:
            return isOrder(order);

        case progressiveStatuses.approvedOrder:
            return isApprovedOrder(order);

        case progressiveStatuses.isExecuting:
            return isExecuting(order, publicCourse);

        case progressiveStatuses.executed:
            return isExecuted(order, publicCourse);

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
    if (isPublicCourseOrder(order)) {
        return existsAndNotEmpty(order, "publicCourseParticipants");
    }

    // Order must have at least one lecture time with a topic
    if (!existsAndNotEmpty(order, "lectureTimes"))
        return false;

    return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.topic));
}

function isOrder(order) {
    if (isPublicCourseOrder(order)) {
        // Order must have at lease one participant attending one lecture
        return _.some(order.publicCourseParticipants, participant =>
            _.isArray(participant.lecturesAttending) && participant.lecturesAttending.length !== 0);
    }

    // Order must have at lease one lecture with date
    return _.some(order.lectureTimes, lectureTime => Boolean(lectureTime.date));
}

function isApprovedOrder(order) {
    // Order must be approved
    return existsAndNotEmpty(order, "orderApproved");
}

function isExecuting(order, publicCourse) {
    let datesToCheck;
    if (isPublicCourseOrder(order)) {
        datesToCheck = _.map(publicCourse.lectures, lecture => lecture.date);
    }
    else {
        datesToCheck = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
    }

    // At least one lectures is done
    return _.some(datesToCheck, hasDatePassed);
}

function isExecuted(order, publicCourse) {
    // All lectures passed
    let datesToCheck;
    if (isPublicCourseOrder(order)) {
        datesToCheck = _.map(publicCourse.lectures, lecture => lecture.date);
    }
    else {
        datesToCheck = _.mapValues(order.lectureTimes, lectureTime => lectureTime.date);
    }

    return _.every(datesToCheck, hasDatePassed);
}

function isWaitingPayment(order) {
    // Order has proforma or tax invoice number
    return existsAndNotEmpty(order, "proformaInvoiceNumber")
        || existsAndNotEmpty(order, "taxInvoiceNumber");
}

function isPayed(order) {
    return existsAndNotEmpty(order, "receiptNumber");
}

function isCancelled(order) {
    return order.cancelled;
}

function isRejected(order) {
    return order.rejected;
}