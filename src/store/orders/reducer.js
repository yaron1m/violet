import * as actionTypes from './action-types';
import * as _ from "lodash";
import {LOGGED_OUT} from "../firebase/action-types";
import {getSelectedOrganization} from "../selected/reducer";


export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORDERS:
            return action.payload;

        case LOGGED_OUT:
            return {};

        default:
            return state
    }
}

export function getOrders(state) {
    return state.orders;
}

export function getOrderById(state, id) {
    return state.orders[id];
}

export function getOrdersByOrganization(state) {
    const organizationId = getSelectedOrganization(state).id;
    return _.values(getOrders(state)).filter((order) => order.organizationId === organizationId);
}

export function getNextOrderId(state) {
    const orders = getOrders(state);
    const keys = _.keys(orders);
    if (!orders || keys.length === 0)
        return null;
    return _.max(_.map(_.keys(orders), _.parseInt)) + 1;
}
