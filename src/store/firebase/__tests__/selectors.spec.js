import Immutable from 'seamless-immutable';
import {Selector} from 'redux-testkit';
import * as uut from '../reducer';

const initialState = Immutable({
    firebase: {
        loggedIn: undefined,
        userId: undefined,
    }
});

const loggedInState = Immutable({
    firebase:{
        loggedIn: true,
        userId: 18
    }
});

const loggedOutState = Immutable({
    firebase:{
        loggedIn: false,
        userId: 13,
    }
});

describe('store/selected/selectors', () => {

    it('should return undefined', () => {
        Selector(uut.isLoggedIn).expect(initialState).toReturn(undefined);
    });

    it('should return logged in', () => {
        Selector(uut.isLoggedIn).expect(loggedInState).toReturn(true);
    });

    it('should return logged out', () => {
        Selector(uut.isLoggedIn).expect(loggedOutState).toReturn(false);
    });

    it('should get undefined', () => {
        Selector(uut.getUserId).expect(initialState).toReturn(undefined);
    });

    it('should get user id', () => {
        Selector(uut.getUserId).expect(loggedInState).toReturn(loggedInState.firebase.userId);
    });

    it('should get undefined', () => {
        Selector(uut.getUserId).expect(loggedOutState).toReturn(undefined);
    });

});