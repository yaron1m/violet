import React from 'react';
import target from "../Reducer";
import {LOGGED_OUT} from "../../firebase/action-types";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../../SelectedOrganization/ActionTypes";


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

    //TODO missing tests here

    //
    // it('reducer - CLEAR_SELECTED', () => {
    //
    //     const initialState = {
    //         organization: payload,
    //         order: payload,
    //         isSelectedOrganization: true,
    //         isSelectedOrder: true,
    //     };
    //
    //     const action = {
    //         type: CLEAR_SELECTED_ORGANIZATION,
    //     };
    //
    //     const result = target(initialState, action);
    //
    //     expect(result).toBeDefined();
    //     expect(result.organization).toEqual({});
    //     expect(result.order).toEqual({});
    //     expect(result.isSelectedOrganization).toBeFalsy();
    //     expect(result.isSelectedOrder).toBeFalsy();
    // });

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