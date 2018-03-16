import {saveOrder, shouldSave} from '../SaveOrderContainer';
import {orderPageLabels} from "../../../../../store/labels/pages/order-page-labels";
import {SHOW_REQUIRED_FIELDS} from "../../../../../store/required-fields/action-types";
import * as RequiredFieldsReducer from "../../../../../store/required-fields/reducer"
import * as SelectedActions from "../../../../../store/selected/actions"

function getState() {
    return {
        labels: {
            pages: {
                orderPage: orderPageLabels
            }
        },
        selected: {
            isSelectedOrganization: true,
            isSelectedOrder: false,
            order: {
                organizationId: "3",
            }
        }
    };
}

let dispatch;

// TODO need MANY more tests here, testing other save order functions

describe('save order button', () => {

    beforeEach(() => {
        dispatch = jest.fn();
    });

    it('shouldSave - organization not selected - false', () => {
        const state = getState();
        state.selected.isSelectedOrganization = false;
        RequiredFieldsReducer.getOrderMissingFields = jest.fn(() => []);

        expect(shouldSave(state, dispatch)).toBeFalsy();

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].title).toBe(orderPageLabels.dialog.noOrganizationSelectedTitle);
    });

    it('shouldSave - there are missing fields - false', () => {
        const state = getState();
        state.selected.isSelectedOrganization = true;
        RequiredFieldsReducer.getOrderMissingFields = jest.fn((state) => ["field"]);

        expect(shouldSave(state, dispatch)).toBeFalsy();


        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[0][0].type).toBe(SHOW_REQUIRED_FIELDS);
        expect(dispatch.mock.calls[1][0].title).toBe(orderPageLabels.dialog.missingFieldsTitle);
    });

    it('shouldSave - all valid - true', () => {
        const state = getState();
        state.selected.isSelectedOrganization = true;
        RequiredFieldsReducer.getOrderMissingFields = jest.fn(() => []);

        expect(shouldSave(state, dispatch)).toBeTruthy();
    });
});