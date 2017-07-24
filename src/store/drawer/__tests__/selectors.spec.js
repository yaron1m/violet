import Immutable from 'seamless-immutable';
import {Selector} from 'redux-testkit';
import * as uut from '../reducer';


describe('store/drawer/selectors', () => {

    it('should get drawer- isOpen', () => {
        const existingState = {drawer: {isOpen: false}};
        Selector(uut.isDrawerOpen).expect(existingState).toReturn(false);
    });

    it('should get drawer- isOpen', () => {
        const existingState = {drawer: {isOpen: true}};
        Selector(uut.isDrawerOpen).expect(existingState).toReturn(true);
    });
});