import * as actionTypes from './action-types';
import * as Immutable from "seamless-immutable";

const initialState = Immutable({
    rtl: true,
    language: "he",
    dialog: {
        isOpen: false,
        title: "",
        content: "",
    },
    snackbar:{
        isOpen: false,
        message: "",
    }
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
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
                    content: action.content,
                }
            });

        case actionTypes.CLOSE_DIALOG:
            return Immutable.merge(state, {
                dialog: {
                    isOpen: false,
                    title: "",
                    content: "",
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

export function isRTL(state) {
    return state.appearance.rtl;
}

export function isDialogOpen(state) {
    return state.appearance.dialog.isOpen;
}

export function getDialogTitle(state) {
    return state.appearance.dialog.title;
}

export function getDialogContent(state) {
    return state.appearance.dialog.content;
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