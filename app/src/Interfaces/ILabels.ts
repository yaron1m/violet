export default interface ILabels {
    softwareName: string;
    currencyIcon: string;
    header: {
        searchLineHint: string;
        organizationPrefix: string;
        orderPrefix: string;
        logOut: string;
    },
    pages: any,
    orderTypes: {
        internalCourse: string;
        publicCourse: string;
    },
    orderStatus: {
        contact: string;
        offer: string;
        order: string;
        approvedOrder: string;
        isExecuting: string;
        executed: string;
        waitingPayment: string;
        payed: string;
        cancelled: string;
        rejected: string;
        followUp: string;
    },
}
