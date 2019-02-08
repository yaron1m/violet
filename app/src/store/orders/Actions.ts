import * as actionTypes from './ActionTypes';


export function receiveOrders(orders) {
    return {
        type: actionTypes.RECEIVE_ORDERS,
        payload: orders,
    };
}
