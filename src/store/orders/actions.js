import * as actionTypes from './action-types';


export function receiveOrders(organizations) {
    return {
        type: actionTypes.RECEIVE_ORDERS,
        payload: organizations,
    };
}
