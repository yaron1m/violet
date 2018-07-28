import * as actionTypes from './action-types';

export function receiveOrganizations(organizations) {
    return {
        type: actionTypes.RECEIVE_ORGANIZATIONS,
        payload: organizations,
    };
}

