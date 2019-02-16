export enum terminatingStatuses {
    cancelled = 'cancelled',
    rejected = 'rejected',
}

export enum progressiveStatuses {
    contact = 'contact',
    offer = 'offer',
    order = 'order',
    approvedOrder = 'approvedOrder',
    isExecuting = 'isExecuting',
    executed = 'executed',
    waitingPayment = 'waitingPayment',
    payed = 'payed',
}

export enum Status {
    contact = 'contact',
    offer = 'offer',
    order = 'order',
    approvedOrder = 'approvedOrder',
    isExecuting = 'isExecuting',
    executed = 'executed',
    waitingPayment = 'waitingPayment',
    payed = 'payed',

    cancelled = 'cancelled',
    rejected = 'rejected',
}

// export default Status;

export enum TabKey {
    internalTabKey = 'internalTab',
    publicCourseTabKey = 'publicCourseTab'
}