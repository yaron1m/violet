import * as actionTypes from './action-types';
import * as _ from "lodash";
import {SIGNED_OUT} from "../firebase/action-types";


export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORDERS:
            return action.payload;

        case SIGNED_OUT:
            return {};

        default:
            return state
    }
}

export function getOrders(state){
    return state.orders;
}

export function getOrderById(state, id){
    return state.orders[id];
}

export function getOrdersByOrganization(state, organizationId){
    return _.values(getOrders(state)).filter((order) => order.organizationId === organizationId)

}