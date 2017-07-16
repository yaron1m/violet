export const RECEIVE_ORGANIZATIONS = "RECEIVE_ORGANIZATIONS";
export function receiveOrganizations(organizations) {
    return {
        type: RECEIVE_ORGANIZATIONS,
        payload: organizations,
    };
}

export const SELECT_ORGANIZATION = "SELECT_ORGANIZATION";
export function selectOrganization(organizationData) {
    return {
        type: SELECT_ORGANIZATION,
        payload: organizationData
    }
}

export const SET_IS_SELECTED_ORGANIZATION = "SET_IS_SELECTED_ORGANIZATION";
export function setIsSelectedOrganization(isSelected) {
    return {
        type: SET_IS_SELECTED_ORGANIZATION,
        payload: isSelected
    }
}