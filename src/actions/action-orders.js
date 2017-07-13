export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export function receiveOrders(organizations) {
    return {
        type: RECEIVE_ORDERS,
        payload: organizations,
    };
}

export const SELECT_ORDER = "SELECT_ORDER";
export function selectOrder(order) {
    return {
        type: SELECT_ORDER,
        payload: order
    }
}