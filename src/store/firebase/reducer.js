import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    loggedIn: false,
    userId: undefined,
});

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SIGNED_IN:
            return Immutable.merge(state,{
                loggedIn: true,
                userId: action.userId,
            });

        case actionTypes.SIGNED_OUT:
            return Immutable.merge(state,{
                loggedIn: false,
                userId: action.undefined,
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