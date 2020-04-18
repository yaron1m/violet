import * as actions from "./Actions";
import * as actionTypes from "./ActionTypes";
import {IOrder} from "@violet/common";

describe("Store/Orders/actions", () => {
    it("should create an action of received orders", () => {
        const orders = {0: {} as IOrder, 1: {} as IOrder};
        const expectedAction = {
            type: actionTypes.RECEIVE_ORDERS,
            payload: orders,
        };
        expect(actions.receiveOrders(orders)).toEqual(expectedAction);
    });
});
