import * as Selectors from '../selectors';
import {Status} from "../../../util/consts/status";

const state = {
    "orders": {
        "1000": {
            "id": 1000,
            "organizationId": 100,
            "lectureTimes": [{}],
            "status": Status.contact,
        },
        "1001": {
            "id": 1001,
            "organizationId": 101,
            "lectureTimes": [{}],
            "status": Status.order,
        },
        "1002": {
            "id": 1002,
            "organizationId": 100,
            "lectureTimes": [{}],
            "status": Status.order,
        },
        "1003": {
            "id": 1003,
            "organizationId": 101,
            "lectureTimes": [{}],
            "status": Status.approvedOrder,
        },
    },
    "selected": {
        organization: {
            id: 100,
        }
    }
};

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

    // it('should get order by id', () => {
    //     Selector(uut.getOrderById).expect(sampleState, 0).toReturn(sampleState.orders[0]);
    // });
    //
    // it('should get orders of organization 1', () => {
    //     const result = [sampleState.orders[1], sampleState.orders[3]];
    //     const organizationId = 1;
    //
    //     Selector(uut.getOrdersByOrganization).expect(sampleState, organizationId).toReturn(result);
    // });
    //
    // it('should get empty array', () => {
    //     const result = [];
    //     const organizationId = 999;
    //
    //     Selector(uut.getOrdersByOrganization).expect(sampleState, organizationId).toReturn(result);
    // });
});