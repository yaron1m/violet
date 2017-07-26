import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'
import {SIGNED_OUT} from "../../firebase/action-types";

const initialState = {};
const sampleState = {0:{}, 1:{}};

describe('store/orders/reducer', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    it('should store orders in state', () => {
        const action = {type: actionTypes.RECEIVE_ORDERS, payload:sampleState};

        Reducer(uut).expect(action).toReturnState(sampleState);
    });

    it('should clear all orders', () => {
        const action = {type: SIGNED_OUT};

        Reducer(uut).withState(sampleState).expect(action).toReturnState(initialState);
    });
});