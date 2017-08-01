import * as actionTypes from './action-types';
import * as Immutable from "seamless-immutable";

const initialState = Immutable({
    isOpen: false,
    rtl: true,
    language: "he",
    dialog: {
        isOpen: false,
        title: "",
        message: "",
    },
    snackbar:{
        isOpen: false,
        message: "",
    }
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.CHANGE_DRAWER_STATE:
            return Immutable.merge(state, {
                isOpen: !state.isOpen,
            });

        case actionTypes.CHANGE_LANGUAGE:
            return Immutable.merge(state, {
                rtl: action.rtl,
                language: action.language,
            });

        case actionTypes.OPEN_DIALOG:
            return Immutable.merge(state, {
                dialog: {
                    isOpen: true,
                    title: action.title,
                    message: action.message,
                }
            });

        case actionTypes.CLOSE_DIALOG:
            return Immutable.merge(state, {
                dialog: {
                    isOpen: false,
                    title: "",
                    message: "",
                }
            });

        case actionTypes.OPEN_SNACKBAR:
            return Immutable.merge(state, {
                snackbar: {
                    isOpen: true,
                    message: action.message,
                }
            });

        case actionTypes.CLOSE_SNACKBAR:
            return Immutable.merge(state, {
                snackbar: {
                    isOpen: false,
                    message: "",
                }
            });

        default:
            return state;
    }
}

export function isDrawerOpen(state) {
    return state.appearance.isOpen;
}

export function isRTL(state) {
    return state.appearance.rtl;
}

export function isDialogOpen(state) {
    return state.appearance.dialog.isOpen;
}

export function getDialogTitle(state) {
    return state.appearance.dialog.title;
}

export function getDialogMessage(state) {
    return state.appearance.dialog.message;
}

export function isSnackbarOpen(state) {
    return state.appearance.snackbar.isOpen;
}

export function getSnackbarMessage(state) {
    return state.appearance.snackbar.message;
}

export function getLanguage(state) {
    return state.appearance.language;
}