import React from 'react';
import reducer from "../Reducer";
import {LOGGED_OUT} from "../../firebase/action-types";
import {
    CLEAR_SELECTED_ORDER,
    SELECT_ORDER,
    SET_IS_SELECTED_ORDER,
    UPDATE_SELECTED_ORDER
} from "../../SelectedOrder/ActionTypes";
import {CLEAR_SELECTED} from "../../selected/action-types";

const value = "value";
const key = "key";
const payload = {
    a: 123
};

let dispatch;

describe('selected actions - organization', () => {
    beforeEach(() => {
        dispatch = jest.fn();
    });

    it('should return initial state', () => {
        const result = reducer();

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it('ignore unfamiliar action and return state', () => {

        const initialState = "initialState";

        const result = reducer(initialState);

        expect(result).toBe(initialState);
    });

    it('should copy order to state', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: SELECT_ORDER,
            payload: payload
        };

        const result = reducer(initialState, action);

        expect(result[key]).toEqual(value);
        expect(result.order).toEqual(payload);
        expect(result.isSelectedOrder).toBeTruthy();
    });

    it('should update selected order', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: UPDATE_SELECTED_ORDER,
            payload: payload
        };

        const result = reducer(initialState, action);

        expect(result[key]).toEqual(value);
        expect(result.order).toEqual(payload);
    });

    it('set is selected order to true', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: SET_IS_SELECTED_ORDER,
            payload: payload
        };

        const result = reducer(initialState, action);

        expect(result.isSelectedOrder).toBeTruthy();
    });

    it('should return initial state', () => {

        const initialState = {
            order: payload,
            isSelectedOrder: true,
        };

        const action = {
            type: CLEAR_SELECTED,
        };

        const result = reducer(initialState, action);

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it('should return initial state', () => {

        const initialState = {
            order: payload,
            isSelectedOrder: true,
        };

        const action = {
            type: LOGGED_OUT,
        };

        const result = reducer(initialState, action);

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it('should return initial state', () => {

        const initialState = {
            order: payload,
            isSelectedOrder: true,
        };

        const action = {
            type: CLEAR_SELECTED_ORDER,
        };

        const result = reducer(initialState, action);

        expect(result).toBeDefined();
        expect(result.order).toEqual({});
        expect(result.isSelectedOrder).toBeFalsy();
    });
});