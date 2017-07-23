import * as actionTypes from './action-types';

export function receiveOrganizations(organizations) {
    return {
        type: actionTypes.RECEIVE_ORGANIZATIONS,
        payload: organizations,
    };
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