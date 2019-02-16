import {IState} from '../../Interfaces/ReduxInterfaces';
import {toMutable} from '../../Util/ObjectUpdater';

function getAppearance(state: IState) {
    return toMutable(state.appearance);
}

export function isRTL(state: IState) {
    return getAppearance(state).rtl;
}

export function isDialogOpen(state: IState) {
    return getAppearance(state).dialog.isOpen;
}

export function getDialogTitle(state: IState) {
    return getAppearance(state).dialog.title;
}

export function getDialogContent(state: IState) {
    return getAppearance(state).dialog.content;
}

export function getDialogActions(state: IState) {
    return getAppearance(state).dialog.actions;
}

export function isSnackbarOpen(state: IState) {
    return getAppearance(state).snackbar.isOpen;
}

export function getSnackbarMessage(state: IState) {
    return getAppearance(state).snackbar.message;
}

export function shouldShowRequiredFields(state: IState) {
    return getAppearance(state).showRequiredFields;
}