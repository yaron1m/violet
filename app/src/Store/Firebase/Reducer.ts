import * as actionTypes from "./ActionTypes";
import {createImmutable, mergeImmutable} from "../../Util/ObjectUpdater";

const initialState = {
    loggedIn: undefined,
    userId: undefined,
    displayName: "",
    photoURL: "",
    isSuperUser: false,
};

export default function (state = createImmutable(initialState), action: any = {}) {
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
            return mergeImmutable(initialState, {
                loggedIn: false,
            });

        default:
            return state;
    }
}
