import React from 'react';
import * as actions from "../actions";
import * as actionTypes from "../action-types";
import * as orderStatusUtil from '../../../util/order-status'


const id = 123456;
const orgId = 555;
const org = "org";
const value = "value";
const key = "key";
const newValue = "newValue";
const status = "status";

let dispatch;

describe('selected actions - orders', () => {
    beforeEach(() => {
        dispatch = jest.fn();
    });

    it('selectOrder - valid - action', () => {
        const thunkFunction = actions.selectOrder(id);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    [orgId]: org
                },
                orders:{
                    [id]: value
                }
            }
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.SELECT_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toBe(value);
    });

    it('updateSelectedOrder - update new key - action', () => {
        orderStatusUtil.default = jest.fn();
        orderStatusUtil.default.mockReturnValue(status);

        const thunkFunction = actions.updateSelectedOrder(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order:{
                        [id]: value
                    }
                }
            }
        };
        const expectedOrganization = {
            [id]: value,
            [key]: newValue,
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('updateSelectedOrder - update existing key - action', () => {
        orderStatusUtil.default = jest.fn();
        orderStatusUtil.default.mockReturnValue(status);

        const thunkFunction = actions.updateSelectedOrder(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order: {
                        [key]: value
                    }
                }
            }
        };
        const expectedOrganization = {
            [key]: newValue,
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrganization);
    });

    it('setIsSelectedOrder - valid - action', () => {
        expect(actions.setIsSelectedOrder().type).toBe(actionTypes.SET_IS_SELECTED_ORDER);
    });

    it('sendSelectedOrderToDatabase - valid - action', () => {
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