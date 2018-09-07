import * as actionTypes from './ActionTypes';

export function receiveOrganizations(organizations) {
    return {
        type: actionTypes.RECEIVE_ORGANIZATIONS,
        payload: organizations,
    };
}

