import * as actionTypes from "./ActionTypes";
import IOrder from "../../Interfaces/IOrder";

export function receiveOrders(orders: { [id: string]: IOrder }) {
    return {
        type: actionTypes.RECEIVE_ORDERS,
        payload: orders,
    };
}
