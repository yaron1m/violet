import * as actionTypes from './action-types';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    loggedIn: false,
    userId: undefined,
});

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_LOGIN_STATUS:
            let logged = !(action.payload === null);
            return state.merge({
                loggedIn: logged,
                userId: logged ? action.payload : undefined,
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