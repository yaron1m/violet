import * as HistoryUtil from "../../../Util/HistoryUtil";
import * as Target from "./SearchBoxContainer";
import * as SelectedOrganizationActions from "../../../Store/SelectedOrganization/Actions";
import * as _ from "lodash";
import * as SelectedOrderActions from "../../../Store/SelectedOrder/Actions";

let dispatch;

describe('SearchBoxContainer', () => {
    beforeEach(() => {
        HistoryUtil.redirect = jest.fn();
        dispatch = jest.fn();
        SelectedOrganizationActions.selectOrganization = jest.fn();
        SelectedOrderActions.selectOrder = jest.fn();
    });

    it('handleRequest - choose organization - load organization action', () => {
        const chosenRequest = {
            text: null,
            info: {
                type: 0,
                organizationId: 123,
            },
            value: null,
        };
        Target.handleRequest(chosenRequest, dispatch);

        expect(SelectedOrganizationActions.selectOrganization.mock.calls).toHaveLength(1);
        expect(SelectedOrganizationActions.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls).toHaveLength(1);
        expect(HistoryUtil.redirect.mock.calls[0][0]).toBe("/org");
    });

    it('handleRequest - choose order - load order action', () => {
        const chosenRequest = {
            text: null,
            info: {
                type: 1,
                orderId: "orderId",
                organizationId: "organizationId"
            },
            value: null,
        };

        Target.handleRequest(chosenRequest, dispatch);

        expect(SelectedOrderActions.selectOrder.mock.calls).toHaveLength(1);
        expect(SelectedOrderActions.selectOrder.mock.calls[0][0]).toBe(chosenRequest.info.orderId);

        expect(SelectedOrganizationActions.selectOrganization.mock.calls).toHaveLength(1);
        expect(SelectedOrganizationActions.selectOrganization.mock.calls[0][0]).toBe(chosenRequest.info.organizationId);

        expect(HistoryUtil.redirect.mock.calls).toHaveLength(1);
        expect(HistoryUtil.redirect.mock.calls[0][0]).toBe("/order");
    });

    it('getSuggestions - has order and organization - data is correct', () => {
        const state = {
            organizations: {
                "orgId5": {
                    organizationName: "orgName5",
                    id: "orgId5",
                },
            },
            orders: {
                "1000": {
                    "id": 1000,
                    "organizationId": "orgId5",
                },
            },
        };

        const result = Target.getSuggestions(state.organizations, state.orders);

        expect(result).toHaveLength(2);

        const organizationObjects = _.filter(result, x => x.info.type === 0);
        expect(organizationObjects).toHaveLength(1);
        expect(organizationObjects[0].label).toEqual("orgName5");
        expect(organizationObjects[0].info.organizationId).toEqual("orgId5");
        //expect(organizationObjects[0].value.props.primaryText).toEqual("orgName5"); TODO check this

        const orderObjects = _.filter(result, x => x.info.type === 1);
        expect(orderObjects).toHaveLength(1);
        expect(orderObjects[0].label).toEqual("1000 - orgName5");
        expect(orderObjects[0].info.organizationId).toEqual("orgId5");
        //expect(orderObjects[0].value.props.primaryText).toEqual("1000 - orgName5");
    });

    it('getSuggestions - no orders - load organization', () => {
        const state = {
            organizations: {
                "orgId5": {
                    organizationName: "orgName5",
                    id: "orgId5",
                },
            },
        };

        const result = Target.getSuggestions(state.organizations);

        expect(result).toHaveLength(1);
        expect(result[0].info.type).toBe(0);
    });

    it('getSuggestions - no organization - empty array', () => {
        const state = {
            orders: {
                "1000": {
                    "id": 1000,
                    "organizationId": "orgId5",
                },
            },
        };

        const result = Target.getSuggestions(state.organizations, state.orders);

        expect(result).toHaveLength(0);
    });
});