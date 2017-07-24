import Immutable from 'seamless-immutable';
import {Selector} from 'redux-testkit';
import * as uut from '../reducer';

const sampleState = Immutable({
    orders: {
        0: {
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
        1: {
            "id": 1,
            "location": "חדר האוכל",
            "organizationId": 1
        },
        2: {
            "id": 2,
            "location": "אולם כנסים",
            "organizationId": 0
        },
        3: {
            "id": 3,
            "location": "כניסה ראשית",
            "organizationId": 1
        }
    }
});

describe('store/orders/selectors', () => {

    it('should get orders', () => {
        Selector(uut.getOrders).expect(sampleState).toReturn(sampleState.orders);
    });

    it('should get orders of organization 1', () => {
        const result = [sampleState.orders[1], sampleState.orders[3]];
        const organizationId = 1;

        Selector(uut.getOrdersByOrganization).expect(sampleState, organizationId).toReturn(result);
    });

    it('should get empty array', () => {
        const result = [];
        const organizationId = 999;

        Selector(uut.getOrdersByOrganization).expect(sampleState, organizationId).toReturn(result);
    });
});