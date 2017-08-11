import * as actionTypes from './action-types';

export function showRequieredFields() {
    return {
        type: actionTypes.SHOW_REQUIRED_FIELDS,
    };
}

export function hideRequieredFields() {
    return {
        type: actionTypes.HIDE_REQUIRED_FIELDS,
    };
}