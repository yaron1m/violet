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

export const Status = {
    ...progressiveStatuses,
    ...terminatingStatuses
};

export default Status;