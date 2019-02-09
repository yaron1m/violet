import * as actionTypes from './ActionTypes';
import {createImmutable, mergeImmutable} from "../../Util/ObjectUpdater";

const initialState = createImmutable({
    loggedIn: undefined,
    userId: undefined,
    displayName: "",
    photoURL: "",
    isSuperUser: false,
});

export default function (state = initialState, action:any = {}) {
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return mergeImmutable(state, {
                loggedIn: true,
                userId: action.userId,
                displayName: action.displayName,
                photoURL: action.photoURL,
                isSuperUser: action.isSuperUser
            });

        case actionTypes.LOGGED_OUT:
            return mergeImmutable(state, {
                loggedIn: false,
                userId: undefined,
                displayName: "",
                photoURL: "",
                isSuperUser: false
            });

        default:
            return state;
    }
}

