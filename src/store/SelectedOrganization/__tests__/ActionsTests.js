import React from 'react';
import * as firebaseActions from "../../Firebase/Actions";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../ActionTypes";
import {
    clearSelectedOrganization, saveNewOrganization,
    selectOrganization,
    sendSelectedOrganizationToDatabase,
    setIsSelectedOrganization,
    updateSelectedOrganization
} from "../Actions";
import {CLOSE_DIALOG} from "../../Appearance/ActionTypes";

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
        const thunkFunction = selectOrganization(id);
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
        expect(dispatch.mock.calls[0][0].type).toBe(SELECT_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toBe(value);
    });

    it('updateSelectedOrganization - update new key - action', () => {
        const thunkFunction = updateSelectedOrganization(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrganization: {
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
        expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('updateSelectedOrganization - update existing key - action', () => {
        const thunkFunction = updateSelectedOrganization(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrganization: {
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
        expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('setIsSelectedOrganization - valid - action', () => {
        expect(setIsSelectedOrganization().type).toBe(SET_IS_SELECTED_ORGANIZATION);
    });

    it('should dispatch action to send order to database', async () => {
        firebaseActions.sendDataToDatabase = jest.fn();

        const thunkFunction = sendSelectedOrganizationToDatabase();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrganization: {
                    organization: {
                        id,
                        [key]: value
                    }
                }
            }
        };
        await thunkFunction(dispatch, getState);

        const expectedOrganization = {
            id,
            [key]: value,
        };

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledWith('/organizations/' + id, expectedOrganization);
    });

    it('should return clear selected organization action', () => {
        expect(clearSelectedOrganization().type).toBe(CLEAR_SELECTED_ORGANIZATION);
    });

    it('should save a new organization', async () => {
        const thunkFunction = saveNewOrganization();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    100: {},
                    101: {},
                },

                selectedOrganization: {
                    organization: {
                        [key]: value
                    }
                }
            }
        };
        const expectedSelectedOrganization = {
            id: 102,
            [key]: value,
        };

        dispatch.mockReturnValue(Promise.resolve("aa"));
        await thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(4);

        // Call updateSelectedOrganization
        dispatch.mock.calls[0][0](dispatch, getState);
        // Call sendSelectedOrganizationToDatabase
        dispatch.mock.calls[1][0](dispatch, getState);

        expect(dispatch.mock.calls[2][0].type).toBe(SET_IS_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[3][0].type).toBe(CLOSE_DIALOG);

        expect(dispatch.mock.calls[4][0].type).toBe(UPDATE_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[4][0].payload).toEqual(expectedSelectedOrganization);

        // Call updateSelectedOrganization in sendSelectedOrganizationToDatabase
        dispatch.mock.calls[5][0](dispatch, getState);

        expect(dispatch.mock.calls[6][0].type).toBe(UPDATE_SELECTED_ORGANIZATION);
    });

});