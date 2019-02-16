import {getNextOrganizationId, getOrganizationById, getOrganizations} from './Selectors';
import {IState} from '../../Interfaces/ReduxInterfaces';
import _ from 'lodash';

const sampleState = {
    organizations: {
        0: {
            'address': 'האחות חיה 4, רמת גן',
            'companyId': '514815745',
            'contacts': [{
                'email': 'hanan@c-point.co.il',
                'fax': '072-2244660',
                'firstName': 'חנן',
                'job': 'מנכ"ל',
                'lastName': 'מלין',
                'phone1': '052-2775072',
                'phone2': '03-5354045',
                'phoneExtension': 10
            }, {
                'email': 'yaron1m@gmail.com',
                'firstName': 'ירון',
                'job': 'מנכ"ל',
                'lastName': 'מלין',
                'phone1': '052-5415049'
            }],
            'howReachedUs': 'מפה לאוזן',
            'id': 0,
            'name': 'שיא האיכות בע"מ'
        },
        1: {
            'address': 'נתניה',
            'companyId': '0520520352',
            'id': 1,
            'name': 'סלקום'
        },
        2: {
            'id': 2,
            'name': 'תעשיה צבאית'
        }
    }
} as unknown as IState;

const emptyState = {
    organizations: {}
} as IState;

describe('Organizations selectors', () => {

    it('getOrganizations - valid', () => {
        expect(getOrganizations(sampleState))
            .toEqual(_.values(sampleState.organizations));
    });

    it('getOrganizations - empty state', () => {
        expect(getOrganizations(emptyState))
            .toEqual([]);
    });

    it('getNextOrganizationId - valid', () => {
        expect(getNextOrganizationId(sampleState))
            .toEqual(3);
    });

    it('getNextOrganizationId - empty state - return null', () => {
        expect(getNextOrganizationId(emptyState))
            .toEqual(1000);
    });

    it('getOrganizationById - valid', () => {
        expect(getOrganizationById(sampleState, '0'))
            .toEqual(sampleState.organizations[0]);
    });

    it('getOrganizationById - no such organization - return undefined', () => {
        expect(getOrganizationById(sampleState, '999'))
            .toBeUndefined();
    });

    it('getOrganizationById - empty state - return undefined', () => {
        expect(getOrganizationById(emptyState, '0'))
            .toBeUndefined();
    });
});