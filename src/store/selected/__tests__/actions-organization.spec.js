import React from 'react';
import * as actions from "../actions";
import * as actionTypes from "../action-types";

const id = 123456;
const value = "value";
const key = "key";
const newValue = "newValue";

let dispatch;

describe('selected actions - organization', () => {
    beforeEach(() => {
        dispatch = jest.fn();
    });

    it('selectOrganization - valid - action', () => {
        const thunkFunction = actions.selectOrganization(id);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    [id]: value
                }
            }
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.SELECT_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toBe(value);
    });

    it('updateSelectedOrganization - update new key - action', () => {
        const thunkFunction = actions.updateSelectedOrganization(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    organization: {
                        [id]: value
                    }
                }
            }
        };
        const expectedOrganization = {
            [id]: value,
            [key]: newValue,
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('updateSelectedOrganization - update existing key - action', () => {
        const thunkFunction = actions.updateSelectedOrganization(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    organization: {
                        [key]: value
                    }
                }
            }
        };
        const expectedOrganization = {
            [key]: newValue,
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('setIsSelectedOrganization - valid - action', () => {
        expect(actions.setIsSelectedOrganization().type).toBe(actionTypes.SET_IS_SELECTED_ORGANIZATION);
    });

    it('sendSelectedOrganizationToDatabase - valid - action', () => {
        //TODO test is not full
        const thunkFunction = actions.sendSelectedOrganizationToDatabase();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    organization: {
                        id,
                        [key]: value
                    }
                }
            }
        };
        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
    });
});