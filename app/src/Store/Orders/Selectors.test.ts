import * as Selectors from "./Selectors";
import {Status} from "../../Util/Constants/Status";
import * as organizationSelectors from "../Organizations/Selectors";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {EntityType} from "../../Util/Constants/EntityType";
import _ from "lodash";

const state = {
    "orders": {
        "1000": {
            "id": 1000,
            "organizationId": 100,
            "lectureTimes": [{
                topic: "lecture"
            }],
            "status": Status.contact,
            followUpRequired: false,
        },
        "1001": {
            "id": 1001,
            "organizationId": 101,
            "lectureTimes": [],
            "status": Status.order,
            followUpRequired: false,
        },
        "1002": {
            "id": 1002,
            "organizationId": 100,
            "lectureTimes": [{
                topic: "topic",
            }],
            "status": Status.order,
            followUpRequired: true,
            followUpDate: 111,
            followUpDetails: "bla",
            createdDate: 123,
        },
        "1003": {
            "id": 1003,
            "organizationId": 101,
            "status": Status.approvedOrder,
            followUpRequired: true,
            followUpDate: 222,
            followUpDetails: "bla bla",
            createdDate: 456,
        },
    },
    selectedOrganization: {
        isSelectedOrganization: true,
        organization: {
            id: 100,
        }
    }
} as unknown as IState;

describe("Store/Orders/selectors", () => {

    beforeAll(() => {
        const orgDetails = {organizationName: "orgName"};
        // @ts-ignore
        organizationSelectors.getOrganizationById = jest.fn(() => orgDetails);
    });

    it("getOrders - get all orders", () => {
        expect(Selectors.getOrders(state)).toEqual(_.values(state.orders));
    });

    it("getOrders - filtered by status", () => {
        expect(Selectors.getOrders(state, [Status.order]))
            .toEqual([state.orders[1001], state.orders[1002]]);
    });

    it("getOrders - filtered by status", () => {
        expect(Selectors.getOrders(state, [Status.contact, Status.approvedOrder]))
            .toEqual([state.orders[1000], state.orders[1003]]);
    });

    it("getOrders - no order with such status exists - empty array", () => {
        expect(Selectors.getOrders(state, [Status.cancelled]))
            .toEqual([]);
    });

    it("getOrderById - valid - order returned", () => {
        expect(Selectors.getOrderById(state, "1001"))
            .toEqual(state.orders[1001]);
    });

    it("getOrderById - no such id - undefined", () => {
        expect(Selectors.getOrderById(state, "9999"))
            .toBeUndefined();
    });

    it("getNextOrderId - valid state", () => {
        expect(Selectors.getNextOrderId(state))
            .toBe(1004);
    });

    it("getNextOrderId - no orders", () => {
        const noOrdersState = {orders: {}} as IState;
        expect(Selectors.getNextOrderId(noOrdersState))
            .toBe(5000);
    });

    it("getOrdersByOrganization - valid", () => {
        expect(Selectors.getOrdersByOrganization(state))
            .toEqual([state.orders[1000], state.orders[1002]]);
    });

    it("getOrdersByOrganization - no organization selected - null", () => {
        expect(Selectors.getOrdersByOrganization({
            selectedOrganization: {isSelectedOrganization: false}
        } as IState)).toEqual([]);
    });

    it("getFollowUpOrdersSummary - valid", () => {
        expect(Selectors.getFollowUpOrdersSummary(state))
            .toEqual([
                {
                    orderId: 1002,
                    organizationName: "orgName",
                    topic: "topic",
                    status: "הזמנה + המשך טיפול",
                    followUpDate: 111,
                    followUpDetails: "bla",
                    createdDate: 123,
                }, {
                    orderId: 1003,
                    organizationName: "orgName",
                    status: "הזמנה מאושרת + המשך טיפול",
                    followUpDate: 222,
                    followUpDetails: "bla bla",
                    createdDate: 456,
                    topic: "",
                }
            ]);
    });

    it("getFollowUpOrdersSummary - no orders - empty array", () => {
        const noOrdersState = {orders: {}} as IState;
        expect(Selectors.getFollowUpOrdersSummary(noOrdersState))
            .toEqual([]);
    });

    it("getAllLectureTimes - valid", () => {
        expect(Selectors.getAllLectureTimes(state))
            .toEqual([
                {
                    entityId: 1000,
                    entityType: EntityType.order,
                    orderId: "1000",
                    topic: "lecture",
                    organizationName: "orgName",
                }, {
                    entityId: 1002,
                    entityType: EntityType.order,
                    orderId: "1002",
                    topic: "topic",
                    organizationName: "orgName",
                }
            ]);
    });

    it("getAllLectureTimes - filtered by status", () => {
        expect(Selectors.getAllLectureTimes(state, Status.contact))
            .toEqual([
                {
                    entityId: 1000,
                    entityType: EntityType.order,
                    orderId: "1000",
                    topic: "lecture",
                    organizationName: "orgName",
                }
            ]);
    });
});