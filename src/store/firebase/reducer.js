import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    loggedIn: undefined,
    userId: undefined,
    displayName: "",
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return Immutable.merge(state,{
                loggedIn: true,
                userId: action.userId,
                displayName: action.displayName,
            });

        case actionTypes.LOGGED_OUT:
            return Immutable.merge(state,{
                loggedIn: false,
                userId: undefined,
                displayName: ""
            });

        default:
            return state;
    }
}

export function isLoggedIn(state) {
    return state.firebase.loggedIn;
}

export function getUserId(state){
    return isLoggedIn(state) ? state.firebase.userId : undefined;
}

export function getDispalyName(state){
    return state.firebase.displayName;
}