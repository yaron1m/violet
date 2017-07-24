import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'

const initialState = {};

const data = {
    "17025": true,
    "18001": false,
    "אופיין שרות": true,
    "אחריות הורית": false,
    "אחריות חברתית": true,
};

describe('store/offered-lectures/reducer', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    it('should store offered lectures in state', () => {
        const action = {type: actionTypes.RECEIVE_OFFERED_LECTURES, payload:data};
        Reducer(uut).expect(action).toReturnState({...initialState, ...data});
    });
});