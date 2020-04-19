import {IOrder} from "../index";
import * as _ from 'lodash';

export enum terminatingStatuses {
    cancelled = "cancelled",
    rejected = "rejected",
}

export enum progressiveStatuses {
    contact = "contact",
    offer = "offer",
    order = "order",
    approvedOrder = "approvedOrder",
    isExecuting = "isExecuting",
    executed = "executed",
    waitingPayment = "waitingPayment",
    payed = "payed",
}

export enum Status {
    contact = "contact",
    offer = "offer",
    order = "order",
    approvedOrder = "approvedOrder",
    isExecuting = "isExecuting",
    executed = "executed",
    waitingPayment = "waitingPayment",
    payed = "payed",

    cancelled = "cancelled",
    rejected = "rejected",
}

export enum TabKey {
    internalTabKey = "internalTab",
    publicCourseTabKey = "publicCourseTab"
}

export function getStatusLabels() {
    return {
        contact: "פנייה",
        offer: "הצעת מחיר",
        order: "הזמנה",
        approvedOrder: "הזמנה מאושרת",
        isExecuting: "בביצוע",
        executed: "בוצע",
        waitingPayment: "ממתין לתשלום",
        payed: "שולם",
        cancelled: "בוטל",
        rejected: "לא אושר",
        followUp: " + המשך טיפול",
    };
}

export function getOrderStatusLabel(order: IOrder) {
    const labels = getStatusLabels();
    if (_.isEmpty(order))
        return labels[progressiveStatuses.contact];

    let status = labels[order.status];
    if (order.followUpRequired)
        status += labels.followUp;
    return status;
}

export function getStatusLabel(status: Status) {
    if (!status)
        return getStatusLabels().contact;

    return getStatusLabels()[status];
}