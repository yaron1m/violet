import * as actionTypes from './ActionTypes';
import _ from 'lodash';
import {getOrganizations} from "../organizations/Selectors";
import {createImmutable, mergeImmutable} from "../../util/ObjectUpdater";
import {getOrders} from "../orders/selectors";

const initialState = createImmutable({
    loggedIn: undefined,
    userId: undefined,
    displayName: "",
    photoURL: "",
    isSuperUser: false,
});

export default function (state = initialState, action = {}) {
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

export function isLoggedIn(state) {
    return state.firebase.loggedIn;
}

export function isFetching(state) {
    const fetchedOrders = _.isEmpty(getOrders(state));
    const fetchedOrganizations = _.isEmpty(getOrganizations(state));

    return fetchedOrders || fetchedOrganizations;
}

export function isSuperUser(state){
    return state.firebase.isSuperUser;
}