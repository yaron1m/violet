import target from "./Reducer";
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import * as actionTypes from './ActionTypes';

const value = "value";
const org = {
   A:"B"
};

describe('organizations reducer', () => {
    it('reducer - no action - initial state', () => {
        const result = target();

        expect(result).toEqual({});
    });

    it('should do nothing with no action', () => {

        const initialState = "initialState";

        const result = target(initialState);

        expect(result).toEqual(initialState);
    });

    it('should return received organizations', () => {
        const initialState = {
            key: value
        };

        const action = {
            type: actionTypes.RECEIVE_ORGANIZATIONS,
            payload: org
        };

        const result = target(initialState, action);

        expect(result).toEqual(org);
    });

    it('should clear selected public course when logged out', () => {

        const initialState = org;

        const action = {
            type: LOGGED_OUT,
        };

        const result = target(initialState, action);

        expect(result).toEqual({});
    });
});