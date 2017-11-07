import * as actionTypes from './action-types';

export function openDialog(title, content, actions = null) {
    return {
        type: actionTypes.OPEN_DIALOG,
        title,
        content,
        actions,
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
