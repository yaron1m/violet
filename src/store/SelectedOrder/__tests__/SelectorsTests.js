import {getSelectedOrder, isSelectedOrder} from "../Selectors";

const sampleState = {
    selected: {
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
            "lectureTimes": [{
                "audienceSize": 25,
                "date": "01/01/01",
                "duration": "02:00",
                "endTime": "13:00",
                "id": 0,
                "startTime": "11:00",
                "tie": "כבשים",
                "topic": "חשיבה יצירתית"
            }, {
                "audienceSize": 40,
                "date": "02/02/02",
                "duration": "05:20",
                "endTime": "15:30",
                "id": 1,
                "startTime": "10:10",
                "tie": "עכבר",
                "topic": "מודעות לאיכות"
            }],
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
};

const emptyState = {
    selected: {
        order: {},
        isSelectedOrder: false,
    }
};

describe('store/selected/selectors', () => {
    it('should return selected order', () => {
        expect(getSelectedOrder(sampleState))
            .toEqual(sampleState.selected.order);
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