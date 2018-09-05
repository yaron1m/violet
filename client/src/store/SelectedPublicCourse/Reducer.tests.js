import target from "./Reducer";
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import * as actionTypes from './ActionTypes';

const value = "value";
const key = "key";
const payload = {
    a: 123
};

describe('selected actions - organization', () => {
    it('reducer - no action - initial state', () => {
        const result = target();

        expect(result).toEqual({
            publicCourse: {},
            isSelectedPublicCourse: false,
        });
    });

    it('should do nothing with no action', () => {

        const initialState = "initialState";

        const result = target(initialState);

        expect(result).toEqual(initialState);
    });

    it('should select public course', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: actionTypes.SELECT_PUBLIC_COURSE,
            payload: payload
        };

        const result = target(initialState, action);

        expect(result[key]).toEqual(value);
        expect(result.publicCourse).toEqual(payload);
        expect(result.isSelectedPublicCourse).toBeTruthy();
    });

    it('should update selected public course', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: actionTypes.UPDATE_SELECTED_PUBLIC_COURSE,
            payload: payload
        };

        const result = target(initialState, action);

        expect(result[key]).toEqual(value);
        expect(result.publicCourse).toEqual(payload);
    });

    it('set isSelectedPublicCourse', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: actionTypes.SET_IS_SELECTED_PUBLIC_COURSE,
            payload: payload
        };

        const result = target(initialState, action);

        expect(result.isSelectedPublicCourse).toBeTruthy();
    });


    it('should clear selected public course', () => {

        const initialState = {
            publicCourse: payload,
            isSelectedPublicCourse: true,
        };

        const action = {
            type: actionTypes.CLEAR_SELECTED_PUBLIC_COURSE,
        };

        const result = target(initialState, action);

        expect(result).toBeDefined();
        expect(result.publicCourse).toEqual({});
        expect(result.isSelectedPublicCourse).toBeFalsy();
    });

    it('should clear selected public course when logged out', () => {

        const initialState = {
            publicCourse: payload,
            isSelectedPublicCourse: true,
        };

        const action = {
            type: LOGGED_OUT,
        };

        const result = target(initialState, action);

        expect(result).toBeDefined();
        expect(result.publicCourse).toEqual({});
        expect(result.isSelectedPublicCourse).toBeFalsy();
    });
});