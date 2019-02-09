import Immutable from 'seamless-immutable';
import {getSelectedOrganization, isSelectedOrganization} from "./Selectors";

const sampleState = Immutable({
    selectedOrganization: {
        organization: {
            "address": "האחות חיה 4, רמת גן",
            "companyId": "514815745",
            "howReachedUs": "מפה לאוזן",
            "id": 0,
            "name": "שיא האיכות בע\"מ"
        },
        isSelectedOrganization: true,
    }
});

const emptyState = Immutable({
    selectedOrganization: {
        organization: {},
        isSelectedOrganization: false,
    }
});

describe('Store/selected/selectors', () => {

    it('should return selected organization', () => {
        expect(getSelectedOrganization(sampleState))
            .toEqual(sampleState.selectedOrganization.organization);
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