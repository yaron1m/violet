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

export function getDialogActions(state) {
    return state.appearance.dialog.actions;
}

export function isSnackbarOpen(state) {
    return state.appearance.snackbar.isOpen;
}

export function getSnackbarMessage(state) {
    return state.appearance.snackbar.message;
}

export function shouldShowRequiredFields(state) {
    return state.appearance.showRequiredFields;
}