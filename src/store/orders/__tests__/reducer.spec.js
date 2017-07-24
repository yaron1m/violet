import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'

const initialState = {};

describe('store/orders/reducer', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    it('should store orders in state', () => {
        const data = {0:{}, 1:{}};
        const action = {type: actionTypes.RECEIVE_ORDERS, payload:data};

        Reducer(uut).expect(action).toReturnState({...initialState, ...data});
    });
});