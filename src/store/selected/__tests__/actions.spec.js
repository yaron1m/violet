import * as actions from '../actions'
import * as actionTypes from '../action-types'
import * as uut from '../actions';
import {Thunk} from 'redux-testkit';
import * as selectedSelectors from '../reducer';
import * as ordersSelectors from '../../orders/reducer';
import * as organizationsSelectors from '../../organizations/reducer';
jest.mock('../reducer');
jest.mock('../../orders/reducer');
jest.mock('../../organizations/reducer');


function sampleOrganization() {
    return {
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
    }
}
function sampleOrder() {
    return {
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
    }
}

describe('store/selected/actions/organizations', () => {

    it('should create an action of selected organization', async () => {
        organizationsSelectors.getOrganizationById.mockReturnValueOnce(sampleOrganization());

        const expectedAction = {
            type: actionTypes.SELECT_ORGANIZATION,
            payload: sampleOrganization()
        };

        const dispatches = await Thunk(uut.selectOrganization).execute();

        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual(expectedAction);
    });

    it('should create an action with updated organization', async () => {
        selectedSelectors.getSelectedOrganization.mockReturnValueOnce(sampleOrganization());
        const key = "name";
        const value = "new name";

        const expectedOrganization = sampleOrganization();
        expectedOrganization[key] = value;
        const expectedAction = {
            type: actionTypes.SELECT_ORGANIZATION,
            payload: expectedOrganization,
        };

        const dispatches = await Thunk(uut.updateSelectedOrganization).execute(key, value);

        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual(expectedAction);
    });

    it('should create an action', () => {
        expect(actions.setIsSelectedOrganization()).toEqual({
            type: actionTypes.SET_IS_SELECTED_ORGANIZATION,
        });
    });
});

describe('store/selected/actions/orders', () => {

    it('should create an action of selected order', async () => {
        ordersSelectors.getOrderById.mockReturnValueOnce(sampleOrder());

        const expectedAction = {
            type: actionTypes.SELECT_ORDER,
            payload: sampleOrder()
        };

        const dispatches = await Thunk(uut.selectOrder).execute();

        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual(expectedAction);
    });

    it('should create an action with updated order', async () => {
        selectedSelectors.getSelectedOrder.mockReturnValueOnce(sampleOrder());
        const key = "room";
        const value = "new room";

        const expectedOrder = sampleOrder();
        expectedOrder[key] = value;
        const expectedAction = {
            type: actionTypes.UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        };

        const dispatches = await Thunk(uut.updateSelectedOrder).execute(key, value);

        expect(dispatches.length).toBe(1);
        expect(dispatches[0].getAction()).toEqual(expectedAction);
    });
});

describe('store/selected/actions/clear', () => {

    it('should create an action', () => {
        expect(actions.clearSelected()).toEqual({
            type: actionTypes.CLEAR_SELECTED,
        });
    });

    it('should create an action', () => {
        expect(actions.clearSelectedOrder()).toEqual({
            type: actionTypes.CLEAR_SELECTED_ORDER,
        });
    });
});