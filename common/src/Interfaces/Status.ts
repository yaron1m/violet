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