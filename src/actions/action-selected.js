export const SEND_SELECTED_ORGANIZATION = "SEND_SELECTED_ORGANIZATION";
export function sendSelectedOrganization(key, value) {
    return {
        type: SEND_SELECTED_ORGANIZATION,
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