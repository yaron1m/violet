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