import * as actionTypes from './action-types';
import {calculateDuration} from "../../util/time-util";
import {getOrganizationById} from "../organizations/reducer";
import {getOrderById} from "../orders/reducer";
import {getSelectedOrder, getSelectedOrganization} from "./reducer";

// Organizations:
export function selectOrganization(organizationId) {
    return function selectOrganization(dispatch, getState) {
        const organization = getOrganizationById(getState(), organizationId);
        dispatch({
            type: actionTypes.SELECT_ORGANIZATION,
            payload: organization
        })
    };
}

export function updateSelectedOrganization(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const selectedOrganization = getSelectedOrganization(getState());
        selectedOrganization[key] = value;
        dispatch({
            type: actionTypes.UPDATE_SELECTED_ORGANIZATION,
            payload: selectedOrganization,
        });
    }
}

export function setIsSelectedOrganization(isSelected) {
    return {
        type: actionTypes.SET_IS_SELECTED_ORGANIZATION,
        payload: isSelected
    }
}


// Orders:

export function selectOrder(orderId) {
    return async function selectOrganization(dispatch, getState) {
        const order = getOrderById(getState(), orderId);
        dispatch({
            type: actionTypes.SELECT_ORDER,
            payload: order
        })
    };
}

export function updateSelectedOrder(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const selectedOrder = getSelectedOrder(getState());
        selectedOrder[key] = value;
        dispatch({
            type: actionTypes.UPDATE_SELECTED_ORDER,
            payload: selectedOrder,
        });
    }
}

// Clear

export function clearSelected(){
    return {
        type: actionTypes.CLEAR_SELECTED,
    }
}

export function clearSelectedOrder(){
    return {
        type: actionTypes.CLEAR_SELECTED_ORDER,
    }
}