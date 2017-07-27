import Immutable from 'seamless-immutable';
import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'
import {LOGGED_OUT} from "../../firebase/action-types";

const initialState = Immutable({
    loggedIn: undefined,
    userId: undefined,
});

const sampleState = Immutable({
        firebase:{
            loggedIn: true,
            userId: 18
        }
});

describe('store/firebase/reducer', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    it('should store userId and toggle loggedIn', () => {
        const action = {type: actionTypes.LOGGED_IN, userId: 12};

        Reducer(uut).expect(action).toChangeInState({
            loggedIn: true,
            userId: 12,
        });
    });

    it('should set user as logged out', () => {
        const action = {type: actionTypes.LOGGED_OUT};

        Reducer(uut).withState(sampleState).expect(action).toChangeInState({
            loggedIn: false,
            userId: undefined,
        });
    });
});