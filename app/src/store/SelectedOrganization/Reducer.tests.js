import target from "./Reducer";
import {LOGGED_OUT} from "../Firebase/ActionTypes";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "./ActionTypes";


const value = "value";
const key = "key";
const payload = {
    a: 123
};

describe('selected actions - organization', () => {
    it('reducer - no action - initial state', () => {
        const result = target();

        expect(result).toBeDefined();
        expect(result.organization).toEqual({});
        expect(result.isSelectedOrganization).toBeFalsy();
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


    it('reducer - CLEAR_SELECTED_ORGANIZATION', () => {

        const initialState = {
            organization: payload,
            isSelectedOrganization: true,
        };

        const action = {
            type: CLEAR_SELECTED_ORGANIZATION,
        };

        const result = target(initialState, action);

        expect(result).toBeDefined();
        expect(result.organization).toEqual({});
        expect(result.isSelectedOrganization).toBeFalsy();
    });

    it('reducer - LOGGED_OUT', () => {

        const initialState = {
            organization: payload,
            isSelectedOrganization: true,
        };

        const action = {
            type: LOGGED_OUT,
        };

        const result = target(initialState, action);

        expect(result).toBeDefined();
        expect(result.organization).toEqual({});
        expect(result.isSelectedOrganization).toBeFalsy();
    });
});