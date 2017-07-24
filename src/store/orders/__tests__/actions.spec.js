import * as actions from '../actions'
import * as actionTypes from '../action-types'

describe('store/orders/actions', () => {
    it('should create an action of received orders', () => {
        const expectedAction = {
            type: actionTypes.RECEIVE_ORDERS,
        };
        expect(actions.receiveOrders()).toEqual(expectedAction)
    })
});
