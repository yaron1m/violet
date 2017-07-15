export const UPDATE_VALUE_IN_SELECTED_ORGANIZATION = "UPDATE_VALUE_IN_SELECTED_ORGANIZATION";
export function updateValueInSelectedOrganization(key, value) {
    return {
        type: UPDATE_VALUE_IN_SELECTED_ORGANIZATION,
        key: key,
        payload: value
    };
}


export const UPDATE_VALUE_IN_SELECTED_ORDER = "UPDATE_VALUE_IN_SELECTED_ORDER";
export function updateValueInSelectedOrder(key, value) {
    return {
        type: UPDATE_VALUE_IN_SELECTED_ORDER,
        key: key,
        payload: value
    }
}

export const CLEAR_SELECTED = "CLEAR_SELECTED";
export function clearSelected(){
    return {
        type: CLEAR_SELECTED,
    }
}

export const CLEAR_SELECTED_ORDER = "CLEAR_SELECTED_ORDER";
export function clearSelectedOrder(){
    return {
        type: CLEAR_SELECTED_ORDER,
    }
}