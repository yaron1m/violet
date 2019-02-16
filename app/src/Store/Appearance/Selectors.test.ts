import * as target from './Selectors';
import {IState} from '../../Interfaces/ReduxInterfaces';

const state = {
    appearance: {
        rtl: 'rtl',
        language: 'he',
        dialog: {
            isOpen: 'isDialogOpen',
            title: 'dialogTitle',
            content: 'dialogContent',
            actions: 'dialogActions',
        },
        snackbar: {
            isOpen: 'isSnackbarOpen',
            message: 'snackbarMessage',
        },
        showRequiredFields: 'showRequiredFields',
    }
} as unknown as IState;

describe('Appearance Selectors', () => {
    it('should return isRTL', () => {
        expect(target.isRTL(state)).toEqual('rtl');
    });

    it('should return isDialogOpen', () => {
        expect(target.isDialogOpen(state)).toEqual('isDialogOpen');
    });

    it('should return dialog title', () => {
        expect(target.getDialogTitle(state)).toEqual('dialogTitle');
    });

    it('should return isRTL', () => {
        expect(target.getDialogContent(state)).toEqual('dialogContent');
    });

    it('should return dialogActions', () => {
        expect(target.getDialogActions(state)).toEqual('dialogActions');
    });

    it('should return isSnackbarOpen', () => {
        expect(target.isSnackbarOpen(state)).toEqual('isSnackbarOpen');
    });

    it('should return snackbarMessage', () => {
        expect(target.getSnackbarMessage(state)).toEqual('snackbarMessage');
    });

    it('should return shouldShowRequiredFields', () => {
        expect(target.shouldShowRequiredFields(state)).toEqual('showRequiredFields');
    });
});