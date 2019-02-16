import * as firebaseActions from '../Firebase/Actions';
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from './ActionTypes';
import {
    clearSelectedOrganization,
    saveNewOrganization,
    selectOrganization,
    sendSelectedOrganizationToDatabase,
    setIsSelectedOrganization,
    updateSelectedOrganization
} from './Actions';
import {CLOSE_DIALOG} from '../Appearance/ActionTypes';
import {getMockedDispatch} from '../../Util/TestUtils';
import {IState} from '../../Interfaces/ReduxInterfaces';

const id = 123456;
const value = 'value';
const key = 'key';
const newValue = 'newValue';

describe('selected actions - organization', () => {
    it('selectOrganization - valid - action', () => {
        const target = selectOrganization(id);

        const getState = () => {
            return {
                organizations: {
                    [id]: value
                }
            } as unknown as IState;
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
            } as unknown as IState;
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
            } as unknown as IState;
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
        // @ts-ignore
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
            } as unknown as IState;
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

    it('should save a new organization to database', async () => {
        // @ts-ignore
        firebaseActions.sendDataToDatabase = jest.fn();

        const target = saveNewOrganization();

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
            } as unknown as IState;
        };
        const expectedSelectedOrganization = {
            id: 102,
            [key]: value,
        };

        const mockedDispatch = getMockedDispatch(getState);

        await target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: expectedSelectedOrganization
        });

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: SET_IS_SELECTED_ORGANIZATION
        });

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: CLOSE_DIALOG
        });

        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
    });
});
