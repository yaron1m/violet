import React from 'react';
import * as firebaseActions from "../../firebase/actions";
import {
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../ActionTypes";
import {
    selectOrganization,
    sendSelectedOrganizationToDatabase,
    setIsSelectedOrganization,
    updateSelectedOrganization
} from "../Actions";

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
        expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_SELECTED_ORGANIZATION);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('updateSelectedOrganization - update existing key - action', () => {
        const thunkFunction = updateSelectedOrganization(key, newValue);
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
                selected: {
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
});