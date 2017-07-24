import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'

const initialState = {
    isOpen: false
};

describe('store/offered-lectures/reducer', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    it('should switch isOpen with default state', () => {
        const action = {type: actionTypes.CHANGE_DRAWER_STATE};
        Reducer(uut).expect(action).toReturnState( {isOpen: true});
    });

    it('should switch isOpen with false state', () => {
        const action = {type: actionTypes.CHANGE_DRAWER_STATE};
        const existingState = {isOpen: false};

        Reducer(uut).withState(existingState).expect(action).toReturnState( {isOpen: true});
    });

    it('should switch isOpen with true sate', () => {
        const action = {type: actionTypes.CHANGE_DRAWER_STATE};
        const existingState = {isOpen: true};

        Reducer(uut).withState(existingState).expect(action).toReturnState( {isOpen: false});
    });
});