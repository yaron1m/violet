import * as actionTypes from './action-types';

export function selectOrder(order) {
    return {
        type: actionTypes.SELECT_ORDER,
        payload: order
    }
}


export function selectOrganization(organizationData) {
    return {
        type: actionTypes.SELECT_ORGANIZATION,
        payload: organizationData
    }
}


export function setIsSelectedOrganization(isSelected) {
    return {
        type: actionTypes.SET_IS_SELECTED_ORGANIZATION,
        payload: isSelected
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