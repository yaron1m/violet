import * as actionTypes from './action-types';

export function changeDrawerState() {
    return {
        type: actionTypes.CHANGE_DRAWER_STATE,
    };
}

export function openDialog(title, message) {
    return {
        type: actionTypes.OPEN_DIALOG,
        title,
        message,
    }
}

export function closeDialog() {
    return {
        type: actionTypes.CLOSE_DIALOG,
    }
}

export function changeLanguage(langCode, isRTL) {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        language: langCode,
        rtl: isRTL,
    };
}
