import * as actionTypes from './action-types';

export function changeDrawerState() {
    return {
        type: actionTypes.CHANGE_DRAWER_STATE,
    };
}

export function openDialog(title, content) {
    return {
        type: actionTypes.OPEN_DIALOG,
        title,
        content,
    }
}

export function closeDialog() {
    return {
        type: actionTypes.CLOSE_DIALOG,
    }
}

export function openSnackbar(message) {
    return {
        type: actionTypes.OPEN_SNACKBAR,
        message,
    }
}

export function closeSnackbar() {
    return {
        type: actionTypes.CLOSE_SNACKBAR,
    }
}

export function changeLanguage(langCode, isRTL) {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        language: langCode,
        rtl: isRTL,
    };
}
