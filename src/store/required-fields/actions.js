import * as actionTypes from './action-types';

export function showRequiredFields() {
    return {
        type: actionTypes.SHOW_REQUIRED_FIELDS,
    };
}

export function hideRequiredFields() {
    return {
        type: actionTypes.HIDE_REQUIRED_FIELDS,
    };
}