import * as actionTypes from './ActionTypes';
import React from 'react';

export function openDialog(title: string, content: string, actions: React.ReactNode[] | null = null) {
    return {
        type: actionTypes.OPEN_DIALOG,
        title,
        content,
        actions,
    };
}

export function closeDialog() {
    return {
        type: actionTypes.CLOSE_DIALOG,
    };
}

export function openSnackbar(message: string) {
    return {
        type: actionTypes.OPEN_SNACKBAR,
        message,
    };
}

export function closeSnackbar() {
    return {
        type: actionTypes.CLOSE_SNACKBAR,
    };
}

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