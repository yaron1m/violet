import target from "./Reducer";
import * as actionTypes from './ActionTypes';
import {updateObject} from "../../Util/ObjectUpdater";
import IAppearance from '../../Interfaces/IAppearance';

const initialState = {
        rtl: true,
        language: "he",
        dialog: {
            isOpen: false,
            title: "",
            content: "",
        },
        snackbar: {
            isOpen: false,
            message: "",
        },
        showRequiredFields: false,
} as IAppearance;

describe('Appearance reducer', () => {
    it('reducer - no action - initial state', () => {
        const result = target();

        expect(result).toEqual(initialState);
    });

    it('should do nothing with no action', () => {
        const initialState = "initialState" as unknown as IAppearance;

        const result = target(initialState);

        expect(result).toEqual(initialState);
    });

    it('should open the dialog and set its content', () => {
        const action = {
            type: actionTypes.OPEN_DIALOG,
            title: "myTitle",
            content: "myContent",
            actions: "myActions",
        };

        const result = target(initialState, action);

        expect(result).toEqual(updateObject(initialState, {
            dialog: {
                isOpen: true,
                title: "myTitle",
                content: "myContent",
                actions: "myActions",
            }
        }));
    });

    it('should close the dialog', () => {
        const thisState = updateObject(initialState, {
            dialog: {
                isOpen: true,
                title: "myTitle",
                content: "myContent",
                actions: "myActions",
            }
        });

        const action = {
            type: actionTypes.CLOSE_DIALOG,
        };

        const result = target(thisState, action);

        expect(result).toEqual(updateObject(thisState, {
            dialog: {
                isOpen: false,
                title: "",
                content: "",
                actions: null,
            }
        }));
    });

    it('should open the snackbar', () => {
        const action = {
            type: actionTypes.OPEN_SNACKBAR,
            message: "myMessage",
        };

        const result = target(initialState, action);

        expect(result).toEqual(updateObject(initialState, {
            snackbar: {
                isOpen: true,
                message: "myMessage",
            }
        }));
    });

    it('should close the snackbar', () => {
        const thisState = updateObject(initialState, {
            snackbar: {
                isOpen: true,
                message: "myMessage",
            }
        });

        const action = {
            type: actionTypes.CLOSE_SNACKBAR,
        };

        const result = target(thisState, action);

        expect(result).toEqual(updateObject(thisState, {
            snackbar: {
                isOpen: false,
                message: "",
            }
        }));
    });

    it('should show required fields', () => {
        const action = {
            type: actionTypes.SHOW_REQUIRED_FIELDS,
        };

        const result = target(initialState, action);

        expect(result).toEqual(updateObject(initialState, {
            showRequiredFields: true,
        }));
    });

    it('should show required fields', () => {
        const thisState = updateObject(initialState, {
            showRequiredFields: true,
        });

        const action = {
            type: actionTypes.HIDE_REQUIRED_FIELDS,
        };

        const result = target(thisState, action);

        expect(result).toEqual(updateObject(thisState, {
            showRequiredFields: false,
        }));
    });
});