import Immutable from 'seamless-immutable';
import {Selector} from 'redux-testkit';
import * as uut from '../reducer';

const sampleState = Immutable({
    organizations: {
        0: {
            "address" : "האחות חיה 4, רמת גן",
            "companyId" : "514815745",
            "contacts" : [ {
                "email" : "hanan@c-point.co.il",
                "fax" : "072-2244660",
                "firstName" : "חנן",
                "job" : "מנכ\"ל",
                "lastName" : "מלין",
                "phone1" : "052-2775072",
                "phone2" : "03-5354045",
                "phoneExtension" : 10
            }, {
                "email" : "yaron1m@gmail.com",
                "firstName" : "ירון",
                "job" : "מנכ\"ל",
                "lastName" : "מלין",
                "phone1" : "052-5415049"
            } ],
            "howReachedUs" : "מפה לאוזן",
            "id" : 0,
            "name" : "שיא האיכות בע\"מ"
        },
        1: {
            "address" : "נתניה",
            "companyId" : "0520520352",
            "id" : 1,
            "name" : "סלקום"
        },
        2: {
            "id" : 2,
            "name" : "תעשיה צבאית"
        }
    }
});

const emptyState = {
    organizations:{}
};

describe('store/organizations/selectors', () => {

    it('should get organizations', () => {
        Selector(uut.getOrganizations).expect(sampleState).toReturn(sampleState.organizations);
    });

    it('should get empty object', () => {
        Selector(uut.getOrganizations).expect(emptyState).toReturn({});
    });

    it('should get next organization id', () => {
        const result = 3;

        Selector(uut.getNextOrganizationId).expect(sampleState).toReturn(result);
    });

    it('should get null', () => {
        Selector(uut.getNextOrganizationId).expect(emptyState).toReturn(null);
    });

    it('should get organization by id', () => {
        Selector(uut.getOrganizationById).expect(sampleState, 0).toReturn(sampleState.organizations[0]);
        Selector(uut.getOrganizationById).expect(sampleState, 2).toReturn(sampleState.organizations[2]);
    });

    it('should get undefined', () => {
        Selector(uut.getOrganizationById).expect(sampleState, 999).toReturn(undefined);
    });
});