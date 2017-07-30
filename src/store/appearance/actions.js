import * as actionTypes from './action-types';

export function changeDrawerState() {
    return {
        type: actionTypes.CHANGE_DRAWER_STATE,
    };
}

export function changeLanguage(langCode, isRTL) {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        language: langCode,
        rtl: isRTL,
    };
}
