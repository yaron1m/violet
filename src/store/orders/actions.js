import * as actionTypes from './action-types';


export function receiveOrders(orders) {
    return {
        type: actionTypes.RECEIVE_ORDERS,
        payload: orders,
    };
}
