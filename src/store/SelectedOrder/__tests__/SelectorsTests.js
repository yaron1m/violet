import Immutable from 'seamless-immutable';
import {getSelectedOrder, isSelectedOrder} from "../Selectors";

const sampleState = Immutable({
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
});

const emptyState = Immutable({
    selectedOrder: {
        order: {},
        isSelectedOrder: false,
    }
});

describe('store/selected/selectors', () => {
    it('should return selected order', () => {
        expect(getSelectedOrder(sampleState))
            .toEqual(sampleState.selectedOrder.order);
    });

    it('should return empty object', () => {
        expect(getSelectedOrder(emptyState))
            .toEqual({});
    });


    it('should return isSelectedOrder', () => {
        expect(isSelectedOrder(sampleState))
            .toBeTruthy();
    });

    it('should return isSelectedOrder', () => {
        expect(isSelectedOrder(emptyState))
            .toBeFalsy();
    });
});