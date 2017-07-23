import * as actionTypes from './action-types';
import {calculateDuration} from "../../util/time-util";
import {getOrganizationById} from "../organizations/reducer";

// Organizations:
export function selectOrganization(organizationId) {
    return async function selectOrganization(dispatch, getState) {
        const organization = getOrganizationById(getState(), organizationId);
        dispatch({
            type: actionTypes.SELECT_ORGANIZATION,
            payload: organization
        })
    };
}


export function setIsSelectedOrganization(isSelected) {
    return {
        type: actionTypes.SET_IS_SELECTED_ORGANIZATION,
        payload: isSelected
    }
}


// Orders:

export function selectOrder(order) {
    if (order.lectureTimes) //if there are times //TODO what if there were and deleted?
        order.lectureTimes = calculateDuration(order.lectureTimes);

    return {
        type: actionTypes.SELECT_ORDER,
        payload: order
    }
}





export function updateValueInSelectedOrganization(key, value) {
    return {
        type: actionTypes.UPDATE_VALUE_IN_SELECTED_ORGANIZATION,
        key: key,
        payload: value
    };
}


export function updateValueInSelectedOrder(key, value) {
    return {
        type: actionTypes.UPDATE_VALUE_IN_SELECTED_ORDER,
        key: key,
        payload: value
    }
}

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