import Immutable from 'seamless-immutable';
import {Reducer} from 'redux-testkit';
import uut from '../reducer';
import * as actionTypes from '../action-types'

const initialState = Immutable({
    organization: {},
    order: {},
    isSelectedOrganization: false,
});

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
function sampleOrganization2() {
    return {
        "address" : "נתניה",
        "companyId" : "0520520352",
        "id" : 1,
        "name" : "סלקום"
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

function sampleState(){
    return {
        selected:{
            organization: sampleOrganization(),
            isSelectedOrganization: true,
            order:{id:1}
        }
    };
}

describe('store/selected/reducer/general', () => {

    it('should have initial state', () => {
        expect(uut()).toEqual(initialState);
    });

    it('should not affect state', () => {
        Reducer(uut).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });
});

describe('store/selected/reducer/organization', () => {
    it('should store new organization in selected with initial state', () => {
        const action = {type: actionTypes.SELECT_ORGANIZATION, payload:sampleOrganization()};

        Reducer(uut).expect(action).toChangeInState({
            organization: sampleOrganization(),
            isSelectedOrganization: true,
        });
    });

    it('should store new organization in selected with existing state', () => {
        const action = {type: actionTypes.SELECT_ORGANIZATION, payload:sampleOrganization2()};

        Reducer(uut).withState(sampleState()).expect(action).toChangeInState({
            organization: sampleOrganization2(),
            isSelectedOrganization: true,
        });
    });

    it('should change isSelectedOrganization to true', () => {
        const action = {type: actionTypes.SET_IS_SELECTED_ORGANIZATION};

        Reducer(uut).expect(action).toChangeInState({
            isSelectedOrganization: true,
        });

        Reducer(uut).withState(sampleState()).expect(action).toChangeInState({
            isSelectedOrganization: true,
        });
    });
});

describe('store/selected/reducer/orders', () => {

    it('should store new order in selected with initial state', () => {
        const action = {type: actionTypes.SELECT_ORDER, payload:sampleOrder()};

        Reducer(uut).expect(action).toChangeInState({
            order: sampleOrder(),
        });
    });

    it('should store new order in selected with existing state', () => {
        const action = {type: actionTypes.SELECT_ORGANIZATION, payload:sampleOrder()};

        Reducer(uut).withState(sampleState()).expect(action).toChangeInState({
            organization: sampleOrder(),
            isSelectedOrganization: true,
        });
    });
});

describe('store/selected/reducer/clear', () => {

    it('should clear all selected', () => {
        const action = {type: actionTypes.CLEAR_SELECTED};

        Reducer(uut).withState(sampleState()).expect(action).toReturnState(initialState);
    });
});