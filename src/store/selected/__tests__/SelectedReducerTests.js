import React from 'react';
import target from "../reducer";
import * as actionTypes from "../action-types";
import {LOGGED_OUT} from "../../firebase/action-types";
import {
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../../SelectedOrganization/ActionTypes";
import {
    CLEAR_SELECTED_ORDER,
    SELECT_ORDER,
    SET_IS_SELECTED_ORDER,
    UPDATE_SELECTED_ORDER
} from "../../SelectedOrder/ActionTypes";

const id = 123456;
const value = "value";
const key = "key";
const newValue = "newValue";
const payload = {
    a: 123
};

let dispatch;

describe('selected actions - organization', () => {
    beforeEach(() => {
        dispatch = jest.fn();
    });

    it('reducer - no action - initial state', () => {
        const result = target();

        expect(result).toBeDefined();
        expect(result.organization).toEqual({});
        expect(result.order).toEqual({});
        expect(result.isSelectedOrganization).toBeFalsy();
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it('reducer - no action with state - return state', () => {

        const initialState = "initialState";

        const result = target(initialState);

        expect(result).toBe(initialState);
    });

    it('reducer - SELECT_ORGANIZATION', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: SELECT_ORGANIZATION,
            payload: payload
        };

        const result = target(initialState, action);

        expect(result[key]).toEqual(value);
        expect(result.organization).toEqual(payload);
        expect(result.isSelectedOrganization).toBeTruthy();
    });

    it('reducer - UPDATE_SELECTED_ORGANIZATION', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: payload
        };

        const result = target(initialState, action);

        expect(result[key]).toEqual(value);
        expect(result.organization).toEqual(payload);
    });

    it('reducer - SET_IS_SELECTED_ORGANIZATION', () => {

        const initialState = {
            key: value
        };

        const action = {
            type: SET_IS_SELECTED_ORGANIZATION,
            payload: payload
        };

        const result = target(initialState, action);

        expect(result.isSelectedOrganization).toBeTruthy();
    });


    it('reducer - CLEAR_SELECTED', () => {

        const initialState = {
            organization: payload,
            order: payload,
            isSelectedOrganization: true,
            isSelectedOrder: true,
        };

        const action = {
            type: actionTypes.CLEAR_SELECTED,
        };

        const result = target(initialState, action);

        expect(result).toBeDefined();
        expect(result.organization).toEqual({});
        expect(result.order).toEqual({});
        expect(result.isSelectedOrganization).toBeFalsy();
        expect(result.isSelectedOrder).toBeFalsy();
    });

    it('reducer - LOGGED_OUT', () => {

        const initialState = {
            organization: payload,
            order: payload,
            isSelectedOrganization: true,
            isSelectedOrder: true,
        };

        const action = {
            type: LOGGED_OUT,
        };

        const result = target(initialState, action);

        expect(result).toBeDefined();
        expect(result.organization).toEqual({});
        expect(result.order).toEqual({});
        expect(result.isSelectedOrganization).toBeFalsy();
        expect(result.isSelectedOrder).toBeFalsy();
    });

});