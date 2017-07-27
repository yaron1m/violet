import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    loggedIn: undefined,
    userId: undefined,
});

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case actionTypes.LOGGED_IN:
            return Immutable.merge(state,{
                loggedIn: true,
                userId: action.userId,
            });

        case actionTypes.LOGGED_OUT:
            return Immutable.merge(state,{
                loggedIn: false,
                userId: undefined,
            });

        default:
            return state;
    }
}

export function isLoggedIn(state) {
    return state.firebase.loggedIn;
}

export function getUserId(state){
    return state.firebase.userId;
}