import Immutable from 'seamless-immutable';
import {getSelectedOrder, getSelectedOrganization, isSelectedOrder, isSelectedOrganization} from "../reducer";

const sampleState = Immutable({
    selected: {
        organization: {
            "address": "האחות חיה 4, רמת גן",
            "companyId": "514815745",
            "contacts": [{
                "email": "hanan@c-point.co.il",
                "fax": "072-2244660",
                "firstName": "חנן",
                "job": "מנכ\"ל",
                "lastName": "מלין",
                "phone1": "052-2775072",
                "phone2": "03-5354045",
                "phoneExtension": 10
            }, {
                "email": "yaron1m@gmail.com",
                "firstName": "ירון",
                "job": "מנכ\"ל",
                "lastName": "מלין",
                "phone1": "052-5415049"
            }],
            "howReachedUs": "מפה לאוזן",
            "id": 0,
            "name": "שיא האיכות בע\"מ"
        },
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
                "shirtColor": "כחול",
                "startTime": "11:00",
                "tie": "כבשים",
                "topic": "חשיבה יצירתית"
            }, {
                "audienceSize": 40,
                "date": "02/02/02",
                "duration": "05:20",
                "endTime": "15:30",
                "id": 1,
                "shirtColor": "אדום",
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
        isSelectedOrganization: true,
        isSelectedOrder: true
    }
});

const emptyState = Immutable({
    selected: {
        organization: {},
        order: {},
        isSelectedOrganization: false,
        isSelectedOrder: false,
    }
});

describe('store/selected/selectors', () => {

    it('getSelectedOrganization - valid', () => {
        expect(getSelectedOrganization(sampleState))
            .toEqual(sampleState.selected.organization);
    });

    it('getSelectedOrganization - empty state - empty object', () => {
        expect(getSelectedOrganization(emptyState))
            .toEqual({});
    });

    it('isSelectedOrganization - selected - true', () => {
        expect(isSelectedOrganization(sampleState))
            .toBeTruthy();
    });

    it('isSelectedOrganization - empty state - false', () => {
        expect(isSelectedOrganization(emptyState))
            .toBeFalsy();
    });

    it('getSelectedOrganization - valid', () => {
        expect(getSelectedOrder(sampleState))
            .toEqual(sampleState.selected.order);
    });

    it('getSelectedOrganization - empty state - empty object', () => {
        expect(getSelectedOrder(emptyState))
            .toEqual({});
    });


    it('isSelectedOrder - selected - true', () => {
        expect(isSelectedOrder(sampleState))
            .toBeTruthy();
    });

    it('isSelectedOrder - empty state - false', () => {
        expect(isSelectedOrder(emptyState))
            .toBeFalsy();
    });
});