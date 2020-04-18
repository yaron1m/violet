import * as _ from 'lodash';

exports.terminatingStatuses = {
    cancelled: "cancelled",
    rejected: "rejected",
};

exports.progressiveStatuses = {
    contact: "contact",
    offer: "offer",
    order: "order",
    approvedOrder: "approvedOrder",
    isExecuting: "isExecuting",
    executed: "executed",
    waitingPayment: "waitingPayment",
    payed: "payed",
};

exports.isPublicCourseOrder = function (order) {
    return order.lectureDetailsTabKey === "publicCourseTab";
};

exports.existsAndNotEmpty = function (order, key) {
    return _.has(order, key) && order[key] && isNonEmptyArray(order[key]);
};

function isNonEmptyArray(arr) {
    return _.isArray(arr) ? arr.length !== 0 : true;
}

exports.hasDatePassed = function (dateString) {
    const now = new Date();
    // eslint-disable-next-line no-magic-numbers
    now.setHours(7);
    return now >= new Date(dateString);
};