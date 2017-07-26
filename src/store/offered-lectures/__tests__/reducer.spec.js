import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'
import {SIGNED_OUT} from "../../firebase/action-types";

const initialState = {};

const sampleState = {
    offeredLectures: {
        "17025": true,
        "18001": false,
        "אופיין שרות": true,
        "אחריות הורית": false,
        "אחריות חברתית": true,
    }
};

describe('store/offered-lectures/reducer', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    it('should store offered lectures in state', () => {
        const action = {type: actionTypes.RECEIVE_OFFERED_LECTURES, payload: sampleState};
        Reducer(uut).expect(action).toReturnState(sampleState);
    });

    it('should clear all offered lectures', () => {
        const action = {type: SIGNED_OUT};

        Reducer(uut).withState(sampleState).expect(action).toReturnState(initialState);
    });
});