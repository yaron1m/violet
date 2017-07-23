import * as actionTypes from './action-types';
import * as _ from "lodash";


export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORDERS:
            return action.payload;

        default:
            return state
    }
}

export function getOrders(state){
    return state.orders;
}

export function getOrdersByOrganization(state){
    return (organizationId) =>_.values(getOrders(state)).filter((order) => order.organizationId === organizationId)

}