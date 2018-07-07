import calculateOrderStatus from "../OrderStatusCalculator";
import Status from "../../Constants/Status";
import {toDateFormat} from "../../TimeUtil";

// TODO add tests for public course
describe('order-status', () => {

    it('calculateOrderStatus - contact', () => {
        const order = {};
        expect(calculateOrderStatus(order)).toEqual(Status.contact);
    });

    it('calculateOrderStatus - offer', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic"
                }
            ]
        };

        expect(calculateOrderStatus(order)).toEqual(Status.offer);
    });

    it('calculateOrderStatus - offer', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "some date",
                }
            ]
        };

        expect(calculateOrderStatus(order)).toEqual(Status.order);
    });

    it('calculateOrderStatus - approvedOrder', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "some date",
                }
            ],
            orderApproved: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.approvedOrder);
    });

    it('calculateOrderStatus - lecture date tomorrow - isExecuting', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: tomorrow,
                }
            ],
            orderApproved: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.approvedOrder);
    });

    it('calculateOrderStatus - lecture date today - isExecuted', () => {
        const today = new Date();
        today.setHours(0, 0, 0);

        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                },
                {
                    topic: "some topic",
                    date: toDateFormat(today),
                }
            ],
            orderApproved: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.executed);
    });

    it('calculateOrderStatus - only some of lectures passed - isExecuting', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                },
                {
                    topic: "some topic",
                    date: "2099-01-01",
                }
            ],
            orderApproved: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.isExecuting);
    });

    it('calculateOrderStatus - all lectures passed - executed', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                },
                {
                    topic: "some topic",
                    date: yesterday,
                }
            ],
            orderApproved: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.executed);
    });

    it('calculateOrderStatus - has proformaInvoiceNumber - waitingPayment', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                }
            ],
            orderApproved: true,
            proformaInvoiceNumber: 123,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.waitingPayment);
    });

    it('calculateOrderStatus - has taxInvoiceNumber - waitingPayment', () => {
        const today = new Date();
        today.setHours(7, 0, 0);

        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                }
            ],
            orderApproved: true,
            taxInvoiceNumber: 123,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.waitingPayment);
    });

    it('calculateOrderStatus - lecture date today and has proformaInvoiceNumber - waitingPayment', () => {
        const today = new Date();
        today.setHours(7, 0, 0);

        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: toDateFormat(today),
                }
            ],
            orderApproved: true,
            proformaInvoiceNumber: 123,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.waitingPayment);
    });

    it('calculateOrderStatus - lecture date today and has taxInvoiceNumber - waitingPayment', () => {
        const today = new Date();
        today.setHours(7, 0, 0);

        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: toDateFormat(today),
                }
            ],
            orderApproved: true,
            taxInvoiceNumber: 123,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.waitingPayment);
    });

    it('calculateOrderStatus - has receiptNumber - Payed', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                }
            ],
            orderApproved: true,
            proformaInvoiceNumber: 123,
            receiptNumber: 456,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.payed);
    });

    it('calculateOrderStatus - cancelled', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                }
            ],
            orderApproved: true,
            proformaInvoiceNumber: 123,
            receiptNumber: 456,
            cancelled: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.cancelled);
    });

    it('calculateOrderStatus - rejected', () => {
        const order = {
            lectureTimes: [
                {
                    topic: "some topic",
                    date: "2017-01-01",
                }
            ],
            orderApproved: true,
            proformaInvoiceNumber: 123,
            receiptNumber: 456,
            rejected: true,
        };

        expect(calculateOrderStatus(order)).toEqual(Status.rejected);
    });


});