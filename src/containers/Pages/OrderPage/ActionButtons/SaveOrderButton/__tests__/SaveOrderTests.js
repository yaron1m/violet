import {shouldSaveOrder} from '../OrderSaver';
import {orderPageLabels} from "../../../../../../store/Labels/Pages/OrderPageLabels";
import {SHOW_REQUIRED_FIELDS} from "../../../../../../store/Appearance/ActionTypes";

function getState() {
    return {
        appearance: {
            showRequiredFields: false,
        },
        labels: {
            pages: {
                orderPage: orderPageLabels
            }
        },
        selectedOrder: {
            isSelectedOrder: false,
            order: {
                organizationId: "3",
                contactFirstName: "first",
                contactLastName: "last",
                contactEmail: "email",
            },
        },
        selectedOrganization: {
            isSelectedOrganization: true,
            organization: {
                organizationName: "Name",
            },
        },
    };
}

let dispatch;

// TODO need MANY more tests here, testing other save order functions

describe('save order button', () => {

    beforeEach(() => {
        dispatch = jest.fn();
    });
    //
    // it('shouldSaveOrder - organization not selected - false', () => {
    //     const state = getState();
    //     state.selectedOrganization.isSelectedOrganization = false;
    //
    //     expect(shouldSaveOrder(state, dispatch)).toBeFalsy();
    //
    //     expect(dispatch.mock.calls.length).toBe(1);
    //     expect(dispatch.mock.calls[0][0].title).toBe(orderPageLabels.dialog.noOrganizationSelectedTitle);
    // });
    //
    // it('shouldSaveOrder - there are missing fields - false', () => {
    //     const state = getState();
    //     state.selectedOrganization.isSelectedOrganization = true;
    //
    //     expect(shouldSaveOrder(state, dispatch)).toBeFalsy();
    //
    //     expect(dispatch.mock.calls.length).toBe(2);
    //     expect(dispatch.mock.calls[0][0].type).toBe(SHOW_REQUIRED_FIELDS);
    //     expect(dispatch.mock.calls[1][0].title).toBe(orderPageLabels.dialog.missingFieldsTitle);
    // });

    it('shouldSaveOrder - all valid - true', () => {
        const state = getState();
        state.selectedOrganization.isSelectedOrganization = true;
        state.selectedOrder.order.contactPhone1 = "Phone";

        expect(shouldSaveOrder(state, dispatch)).toBeTruthy();
    });
});