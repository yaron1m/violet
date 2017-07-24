import * as actionTypes from './action-types';
import _ from 'lodash';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case actionTypes.RECEIVE_ORGANIZATIONS:
            return action.payload;

        default:
            return state
    }
}

// Selectors:
export function getOrganizations(state){
    return state.organizations;
}

export function getNextOrganizationId(state){
    return _.parseInt(_.max(_.keys(getOrganizations(state)))) + 1;
}

export function getOrganizationById(state, id){
    return getOrganizations(state)[id];
}