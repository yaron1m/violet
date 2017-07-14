export const SEND_SELECTED_ORGANIZATION = "SEND_SELECTED_ORGANIZATION";
export function sendSelectedOrganization(key, value) {
    return {
        type: SEND_SELECTED_ORGANIZATION,
        key: key,
        payload: value
    };
}


export const SEND_SELECTED_ORDER = "SEND_SELECTED_ORDER";
export function sendSelectedOrder(key, value) {
    return {
        type: SEND_SELECTED_ORDER,
        key: key,
        payload: value
    }
}