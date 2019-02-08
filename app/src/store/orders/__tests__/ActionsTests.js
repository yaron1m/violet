import * as actions from '../Actions'
import * as actionTypes from '../ActionTypes'

describe('store/orders/actions', () => {
    it('should create an action of received orders', () => {
        const orders = {0: {}, 1: {}};
        const expectedAction = {
            type: actionTypes.RECEIVE_ORDERS,
            payload: orders,
        };
        expect(actions.receiveOrders(orders)).toEqual(expectedAction)
    })
});
