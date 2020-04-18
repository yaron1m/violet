import * as _ from 'lodash';

export const terminatingStatuses = {
    cancelled: "cancelled",
    rejected: "rejected",
};

export const progressiveStatuses = {
    contact: "contact",
    offer: "offer",
    order: "order",
    approvedOrder: "approvedOrder",
    isExecuting: "isExecuting",
    executed: "executed",
    waitingPayment: "waitingPayment",
    payed: "payed",
};

export function isPublicCourseOrder(order) {
    return order.lectureDetailsTabKey === "publicCourseTab";
}

export function existsAndNotEmpty(order, key) {
    return _.has(order, key) && order[key] && isNonEmptyArray(order[key]);
}

function isNonEmptyArray(arr) {
    return _.isArray(arr) ? arr.length !== 0 : true;
}

export function hasDatePassed(dateString) {
    const now = new Date();
    // eslint-disable-next-line no-magic-numbers
    now.setHours(7);
    return now >= new Date(dateString);
}