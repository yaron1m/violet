import {shouldSave} from '../SaveOrderContainer';
import {orderPageLabels} from "../../../../../store/labels/pages/order-page-labels";
import {SHOW_REQUIRED_FIELDS} from "../../../../../store/appearance/action-types";

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
        selected: {
            isSelectedOrganization: true,
            isSelectedOrder: false,
            order: {
                organizationId: "3",
                contactFirstName: "first",
                contactLastName: "last",
                contactEmail: "email",
            },
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

    it('shouldSave - organization not selected - false', () => {
        const state = getState();
        state.selected.isSelectedOrganization = false;

        expect(shouldSave(state, dispatch)).toBeFalsy();

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].title).toBe(orderPageLabels.dialog.noOrganizationSelectedTitle);
    });

    it('shouldSave - there are missing fields - false', () => {
        const state = getState();
        state.selected.isSelectedOrganization = true;

        expect(shouldSave(state, dispatch)).toBeFalsy();

        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[0][0].type).toBe(SHOW_REQUIRED_FIELDS);
        expect(dispatch.mock.calls[1][0].title).toBe(orderPageLabels.dialog.missingFieldsTitle);
    });

    it('shouldSave - all valid - true', () => {
        const state = getState();
        state.selected.isSelectedOrganization = true;
        state.selected.order.contactPhone1 = "Phone";

        expect(shouldSave(state, dispatch)).toBeTruthy();
    });
});