import * as actionTypes from './ActionTypes';
import {createImmutable, mergeImmutable} from "../../Util/ObjectUpdater";
import {LOGGED_OUT} from '../Firebase/ActionTypes';
import IAppearance from '../../Interfaces/IAppearance';

const initialState : IAppearance= {
    rtl: true,
    language: "he",
    dialog: {
        isOpen: false,
        title: "",
        content: "",
        actions: undefined,
    },
    snackbar: {
        isOpen: false,
        message: "",
    },
    showRequiredFields: false,
};

export default function (state = createImmutable(initialState), action: any = {}) {
    switch (action.type) {
        case actionTypes.CHANGE_LANGUAGE:
            return mergeImmutable(state, {
                rtl: action.rtl,
                language: action.language,
            });

        case actionTypes.OPEN_DIALOG:
            return mergeImmutable(state, {
                dialog: {
                    isOpen: true,
                    title: action.title,
                    content: action.content,
                    actions: action.actions,
                }
            });

        case actionTypes.CLOSE_DIALOG:
            return mergeImmutable(state, {
                dialog: {
                    isOpen: false,
                    title: "",
                    content: "",
                    actions: null,
                }
            });

        case actionTypes.OPEN_SNACKBAR:
            return mergeImmutable(state, {
                snackbar: {
                    isOpen: true,
                    message: action.message,
                }
            });

        case actionTypes.CLOSE_SNACKBAR:
            return mergeImmutable(state, {
                snackbar: {
                    isOpen: false,
                    message: "",
                }
            });

        case actionTypes.SHOW_REQUIRED_FIELDS:
            return mergeImmutable(state, {
                showRequiredFields: true,
            });

        case actionTypes.HIDE_REQUIRED_FIELDS:
            return mergeImmutable(state, {
                showRequiredFields: false,
            });

        case LOGGED_OUT:
            return createImmutable(initialState);

        default:
            return state;
    }
}

