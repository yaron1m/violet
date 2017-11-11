import * as actionTypes from './action-types';
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {getOrders} from "../orders/selectors";
import {getOrganizations} from "../organizations/reducer";

const initialState = Immutable({
    loggedIn: undefined,
    userId: undefined,
    displayName: "",
    photoURL: "",
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return Immutable.merge(state,{
                loggedIn: true,
                userId: action.userId,
                displayName: action.displayName,
                photoURL: action.photoURL,
            });

        case actionTypes.LOGGED_OUT:
            return Immutable.merge(state,{
                loggedIn: false,
                userId: undefined,
                displayName: "",
                photoURL: "",
            });

        default:
            return state;
    }
}

export function isLoggedIn(state) {
    return state.firebase.loggedIn === true;
}

export function isFetching(state){
    const fetchedOrders = _.isEmpty(getOrders(state));
    const fetchedOrganizations = _.isEmpty(getOrganizations(state));

    return fetchedOrders || fetchedOrganizations;
}