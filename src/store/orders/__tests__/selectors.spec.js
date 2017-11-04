import * as Selectors from '../selectors';
import {Status} from "../../../util/consts/status";

const state = {
    "orders": {
        "1000": {
            "id": 1000,
            "organizationId": 100,
            "lectureTimes": [{
                topic: "lecture"
            }],
            "status": Status.contact,
            followUpRequired: false,
        },
        "1001": {
            "id": 1001,
            "organizationId": 101,
            "lectureTimes": [],
            "status": Status.order,
            followUpRequired: false,
        },
        "1002": {
            "id": 1002,
            "organizationId": 100,
            "lectureTimes": [{
                topic: "topic",
            }],
            "status": Status.order,
            followUpRequired: true,
            followUpDate: 111,
            followUpDetails: "bla",
            createdDate: 123,
        },
        "1003": {
            "id": 1003,
            "organizationId": 101,
            "status": Status.approvedOrder,
            followUpRequired: true,
            followUpDate: 222,
            followUpDetails: "bla bla",
            createdDate: 456,
        },
    },
    "selected": {
        isSelectedOrganization: true,
        organization: {
            id: 100,
        }
    }
};

const organizationReducer = require("../../organizations/reducer");
const orgDetails = {organizationName: "orgName"};
organizationReducer.getOrganizationById = jest.fn((state, id) => orgDetails);

describe('store/orders/selectors', () => {

    it('getOrders - get all orders', () => {
        expect(Selectors.getOrders(state)).toBe(state.orders);
    });

    it('getOrders - filtered by status', () => {
        expect(Selectors.getOrders(state, [Status.order]))
            .toEqual([state.orders[1001], state.orders[1002]]);
    });

    it('getOrders - filtered by status', () => {
        expect(Selectors.getOrders(state, [Status.contact, Status.approvedOrder]))
            .toEqual([state.orders[1000], state.orders[1003]]);
    });

    it('getOrders - no order with such status exists - empty array', () => {
        expect(Selectors.getOrders(state, [Status.cancelled]))
            .toEqual([]);
    });

    it('getOrderById - valid - order returned', () => {
        expect(Selectors.getOrderById(state, 1001))
            .toEqual(state.orders[1001]);
    });

    it('getOrderById - no such id - undefined', () => {
        expect(Selectors.getOrderById(state, 9999))
            .toBeUndefined();
    });

    it('getNextOrderId - valid state', () => {
        expect(Selectors.getNextOrderId(state))
            .toBe(1004);
    });

    it('getNextOrderId - no orders', () => {
        expect(Selectors.getNextOrderId({orders: {}}))
            .toBe(5000);
    });

    it('getOrdersByOrganization - valid', () => {
        expect(Selectors.getOrdersByOrganization(state))
            .toEqual([state.orders[1000], state.orders[1002]]);
    });

    it('getOrdersByOrganization - no organization selected - null', () => {
        expect(Selectors.getOrdersByOrganization({selected: {isSelectedOrganization: false}}))
            .toBeNull();
    });

    it('getFollowUpOrdersSummary - valid', () => {
        const statuses = require("../../../util/order-status");
        statuses.getOrderStatusLabel = jest.fn((state, order) => order.status);

        const organizationReducer = require("../../organizations/reducer");
        const orgDetails = {organizationName: "orgName"};
        organizationReducer.getOrganizationById = jest.fn((state, id) => orgDetails);

        expect(Selectors.getFollowUpOrdersSummary(state))
            .toEqual([
                {
                    id: 1002,
                    organizationName: "orgName",
                    topic: "topic",
                    status: Status.order,
                    followUpDate: 111,
                    followUpDetails: "bla",
                    createdDate: 123,
                }, {
                    id: 1003,
                    organizationName: "orgName",
                    status: Status.approvedOrder,
                    followUpDate: 222,
                    followUpDetails: "bla bla",
                    createdDate: 456,
                }
            ]);
    });

    it('getFollowUpOrdersSummary - no orders - empty array', () => {
        expect(Selectors.getFollowUpOrdersSummary({orders: {}}))
            .toEqual([]);
    });

    it('getAllLectureTimes - valid', () => {
        expect(Selectors.getAllLectureTimes(state))
            .toEqual([
                {
                    orderId: 1000,
                    topic: "lecture",
                    organizationName: "orgName",
                    status: Status.contact,
                }, {
                    orderId: 1002,
                    topic: "topic",
                    organizationName: "orgName",
                    status: Status.order,
                }
            ]);
    });

    it('getAllLectureTimes - filtered by status', () => {
        expect(Selectors.getAllLectureTimes(state, Status.contact))
            .toEqual([
                {
                    orderId: 1000,
                    topic: "lecture",
                    organizationName: "orgName",
                    status: Status.contact,
                }
            ]);
    });
});