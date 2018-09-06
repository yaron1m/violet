import React from 'react';
import * as firebaseActions from "../../Firebase/Actions";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "../ActionTypes";
import {
    clearSelectedOrganization,
    saveNewOrganization,
    selectOrganization,
    sendSelectedOrganizationToDatabase,
    setIsSelectedOrganization,
    updateSelectedOrganization
} from "../Actions";
import {CLOSE_DIALOG} from "../../Appearance/ActionTypes";
import {getMockedDispatch} from "../../../util/TestUtils";

const id = 123456;
const value = "value";
const key = "key";
const newValue = "newValue";

describe('selected actions - organization', () => {
    it('selectOrganization - valid - action', () => {
        const target = selectOrganization(id);

        const getState = () => {
            return {
                organizations: {
                    [id]: value
                }
            }
        };

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: SELECT_ORGANIZATION,
            payload: value
        });
    });

    it('updateSelectedOrganization - update new key - action', () => {
        const target = updateSelectedOrganization(key, newValue);

        const getState = () => {
            return {
                selectedOrganization: {
                    organization: {
                        [id]: value
                    }
                }
            }
        };

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: {
                [id]: value,
                [key]: newValue,
            }
        });
    });

    it('updateSelectedOrganization - update existing key - action', () => {
        const target = updateSelectedOrganization(key, newValue);

        const getState = () => {
            return {
                selectedOrganization: {
                    organization: {
                        [key]: value
                    }
                }
            }
        };

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: {
                [key]: newValue,
            }
        });
    });

    it('setIsSelectedOrganization - valid - action', () => {
        expect(setIsSelectedOrganization()).toEqual({
            type: SET_IS_SELECTED_ORGANIZATION
        });
    });

    it('should dispatch action to send order to database', async () => {
        firebaseActions.sendDataToDatabase = jest.fn();

        const target = sendSelectedOrganizationToDatabase();

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
        const mockedDispatch = getMockedDispatch(getState);

        await target(mockedDispatch, getState);

        const expectedOrganization = {
            id,
            [key]: value,
        };

        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledWith('/organizations/' + id, expectedOrganization);
    });

    it('should return clear selected organization action', () => {
        expect(clearSelectedOrganization()).toEqual({
            type: CLEAR_SELECTED_ORGANIZATION
        });
    });

    it('should save a new organization', async () => {
        const thunkFunction = saveNewOrganization();
        const dispatch = jest.fn();

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

        expect(dispatch.mock.calls).toHaveLength(4);

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