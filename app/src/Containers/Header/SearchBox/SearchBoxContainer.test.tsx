import * as HistoryUtil from "../../../Util/HistoryUtil";
import * as Target from "./SearchBoxContainer";
import {SearchSuggestion} from "./SearchBoxContainer";
import * as SelectedOrganizationActions from "../../../Store/SelectedOrganization/Actions";
import * as _ from "lodash";
import * as SelectedOrderActions from "../../../Store/SelectedOrder/Actions";
import {IDispatch} from "../../../Interfaces/ReduxInterfaces";
import {EntityType} from "../../../Util/Constants/EntityType";
import IOrganization from "../../../Interfaces/IOrganization";
import IOrder from "../../../Interfaces/IOrder";

let dispatch: IDispatch;

const orderId = 999;
const organizationId = 111;

describe("SearchBoxContainer", () => {
    beforeEach(() => {
        // @ts-ignore
        HistoryUtil.redirect = jest.fn();
        dispatch = jest.fn();
        // @ts-ignore
        SelectedOrganizationActions.selectOrganization = jest.fn();
        // @ts-ignore
        SelectedOrderActions.selectOrder = jest.fn();
    });

    it("handleRequest - choose organization - load organization action", () => {
        const chosenRequest: SearchSuggestion = {
            entityType: EntityType.organization,
            organizationId: 123,
            label: "",
        };
        Target.handleRequest(chosenRequest, dispatch);

        expect(SelectedOrganizationActions.selectOrganization).toHaveBeenCalledTimes(1);
        expect(SelectedOrganizationActions.selectOrganization).toHaveBeenCalledWith(chosenRequest.organizationId);

        expect(HistoryUtil.redirect).toHaveBeenCalledTimes(1);
        expect(HistoryUtil.redirect).toHaveBeenCalledWith("/org");
    });

    it("handleRequest - choose order - load order action", () => {
        const chosenRequest: SearchSuggestion = {
            orderId,
            organizationId,
            entityType: EntityType.order,
            label: ""
        };

        Target.handleRequest(chosenRequest, dispatch);

        expect(SelectedOrderActions.selectOrder).toHaveBeenCalledTimes(1);
        expect(SelectedOrderActions.selectOrder).toHaveBeenCalledWith(chosenRequest.orderId);

        expect(SelectedOrganizationActions.selectOrganization).toHaveBeenCalledTimes(1);
        expect(SelectedOrganizationActions.selectOrganization).toHaveBeenCalledWith(chosenRequest.organizationId);

        expect(HistoryUtil.redirect).toHaveBeenCalledTimes(1);
        expect(HistoryUtil.redirect).toHaveBeenCalledWith("/order");
    });

    it("getSuggestions - has order and organization - data is correct", () => {
        const organizations = [{
            organizationName: "orgName5",
            id: organizationId,
        } as IOrganization
        ];

        const orders = [{
            "id": 1000,
            "organizationId": organizationId,
        } as IOrder
        ];

        const result = Target.getSuggestions(organizations, orders, [], (id: string) => "orgId:" + id + "");

        expect(result).toHaveLength(2);

        const organizationObjects = _.filter(result, x => x.entityType === EntityType.organization);
        expect(organizationObjects).toHaveLength(1);
        expect(organizationObjects[0].label).toEqual("orgName5");
        expect(organizationObjects[0].organizationId).toEqual(organizationId);

        const orderObjects = _.filter(result, x => x.entityType === EntityType.order);
        expect(orderObjects).toHaveLength(1);
        expect(orderObjects[0].label).toEqual("1000 - orgId:" + organizationId);
        expect(orderObjects[0].organizationId).toEqual(organizationId);
    });

    it("getSuggestions - no orders - load organization", () => {
        const organizations = [{
            organizationName: "orgName5",
            id: organizationId,
        } as IOrganization
        ];

        const result = Target.getSuggestions(organizations, [], [], (id: string) => "orgId:" + id + "");

        expect(result).toHaveLength(1);
        expect(result[0].entityType).toBe(EntityType.organization);
    });

    // TODO TEST - add tests for public course participants results in search suggestions

    it("getSuggestions - no organization - empty array", () => {
        const orders = [{
            "id": 1000,
            "organizationId": organizationId,
        } as IOrder
        ];

        const result = Target.getSuggestions([], orders, [], (id: string) => "orgId:" + id + "");

        expect(result).toHaveLength(0);
    });
});