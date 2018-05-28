import {getSelectedOrganization, isSelectedOrganization} from "../Selectors";

const sampleState = {
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
        isSelectedOrganization: true,
    }
};

const emptyState = {
    selected: {
        organization: {},
        isSelectedOrganization: false,
    }
};

describe('store/selected/selectors', () => {

    it('should return selected organization', () => {
        expect(getSelectedOrganization(sampleState))
            .toEqual(sampleState.selected.organization);
    });

    it('should return empty object', () => {
        expect(getSelectedOrganization(emptyState))
            .toEqual({});
    });

    it('should return isSelectedOrganization', () => {
        expect(isSelectedOrganization(sampleState))
            .toBeTruthy();
    });

    it('should return isSelectedOrganization', () => {
        expect(isSelectedOrganization(emptyState))
            .toBeFalsy();
    });
});