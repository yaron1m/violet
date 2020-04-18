import {getSelectedOrder, isPublicCourseOrder, isSelectedOrder} from "./Selectors";
import {IState} from "../../Interfaces/ReduxInterfaces";
import {IOrder} from "@violet/common";

const sampleState = {
    selectedOrder: {
        order: {
            "actualPayDay": "Sat Jul 22 2017",
            "audienceType": "מהנדסים וטכנאים",
            "daySchedule": "יום כיף לעובדים",
            "expectedPayDay": "11.1.2017",
            "floor": "קרקע",
            "followUpDate": "Tue Jul 18 2017",
            "followUpDetails": "לבדוק אפשרות לצורך בהמשך טיפול",
            "followUpRequired": true,
            "id": 0,
            "location": "בניין ראשי",
            "microphone": false,
            "notes": "צריך לרשום כמה הערות",
            "orderApproved": false,
            "organizationId": 0,
            "parking": true,
            "paymentConditions": "שוטף + 50",
            "proformaInvoiceDate": "Tue Jul 25 2017",
            "proformaInvoiceNumber": "123",
            "projector": true,
            "room": "חדר 001",
            "sameAudience": false,
            "soundSystem": false,
            "status": "הצעת מחיר",
            "taxInvoiceDate": "Sat Jul 29 2017",
            "taxInvoiceNumber": "456"
        },
        isSelectedOrder: true
    }
} as unknown as IState;

const emptyState = {
    selectedOrder: {
        order: {},
        isSelectedOrder: false,
    }
} as IState;

describe("Store/selected/selectors", () => {
    it("should return selected order", () => {
        expect(getSelectedOrder(sampleState))
            .toEqual(sampleState.selectedOrder.order);
    });

    it("should return empty object", () => {
        expect(getSelectedOrder(emptyState))
            .toEqual({});
    });

    it("should return isSelectedOrder", () => {
        expect(isSelectedOrder(sampleState))
            .toBeTruthy();
    });

    it("should return isSelectedOrder", () => {
        expect(isSelectedOrder(emptyState))
            .toBeFalsy();
    });

    it("should return true since this is a public course order", () => {
        const order = {
            id: 123,
            lectureDetailsTabKey: "publicCourseTab"
        } as IOrder;

        expect(isPublicCourseOrder(order)).toBeTruthy();
    });

    it("should return false since this is an internal order", () => {
        const order = {
            id: 123,
            lectureDetailsTabKey: "internalTab"
        } as IOrder;

        expect(isPublicCourseOrder(order)).toBeFalsy();
    });

    it("should return false since this is a default order", () => {
        const order = {
            id: 123,
        } as IOrder;

        expect(isPublicCourseOrder(order)).toBeFalsy();
    });
});