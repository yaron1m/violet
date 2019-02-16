import {AllOrdersTableContainerProps, getElements} from './AllOrdersTableContainer';
import labels from '../../Store/Labels/Reducer';
import {Status} from '../../Util/Constants/Status';
import {IState} from '../../Interfaces/ReduxInterfaces';

const state = {
    labels: labels(),
    organizations: {
        100: {
            organizationId: 100,
            organizationName: 'OrgA'
        },
        101: {
            organizationId: 101,
            organizationName: 'OrgB'
        }
    },
    orders: {
        '1000': {
            'id': 1000,
            'organizationId': 100,
            'lectureTimes': [{
                topic: 'lecture1',
                date: '1/1/17'
            }, {
                topic: 'other lecture',
                date: 'never'
            }],
            'status': Status.contact,
            followUpRequired: false,
        },
        '1001': {
            'id': 1001,
            'organizationId': 101,
            'lectureTimes': [],
            'status': Status.order,
            followUpRequired: false,
        },
        '1002': {
            'id': 1002,
            'organizationId': 100,
            'lectureTimes': [{
                topic: 'lecture2',
                date: '2/2/17'
            }],
            'status': Status.order,
            followUpRequired: true,
            followUpDate: 111,
            followUpDetails: 'bla',
            createdDate: 123,
        },
        '1003': {
            'id': 1003,
            'organizationId': 101,
            'status': Status.approvedOrder,
            followUpRequired: true,
            followUpDate: 222,
            followUpDetails: 'bla bla',
            createdDate: 456,
        },
    },
} as unknown as IState;

describe('AllOrdersTableContainer', () => {
    it('elements prop - no filter - show all orders in reverse order', () => {
        const props = {
            filterStatus: undefined,
            limit: 30,
        } as AllOrdersTableContainerProps;

        const orders = getElements(state, props);
        expect(orders).toHaveLength(4);
        expect(orders[0].orderId).toBe(1003);
        expect(orders[1].orderId).toBe(1002);
        expect(orders[2].orderId).toBe(1001);
        expect(orders[3].orderId).toBe(1000);
    });

    it('elements prop - no filter - show right organization name', () => {
        const props = {
            filterStatus: undefined,
            limit: 30,
        } as AllOrdersTableContainerProps;

        const orders = getElements(state, props);
        expect(orders).toHaveLength(4);
        expect(orders[0].organizationName).toEqual('OrgB');
        expect(orders[1].organizationName).toEqual('OrgA');
        expect(orders[2].organizationName).toEqual('OrgB');
        expect(orders[3].organizationName).toEqual('OrgA');
    });

    it('elements prop - no filter - show right status', () => {
        const props = {
            filterStatus: undefined,
            limit: 30,
        } as AllOrdersTableContainerProps;

        const orders = getElements(state, props);
        expect(orders).toHaveLength(4);
        expect(orders[0].status).toEqual('הזמנה מאושרת + המשך טיפול');
        expect(orders[1].status).toEqual('הזמנה + המשך טיפול');
        expect(orders[2].status).toEqual('הזמנה');
        expect(orders[3].status).toEqual('פנייה');
    });

    it('elements prop - no filter - show right lecture details', () => {
        const props = {
            filterStatus: undefined,
            limit: 30,
        } as AllOrdersTableContainerProps;

        const orders = getElements(state, props);
        expect(orders).toHaveLength(4);
        expect(orders[0].topic).toEqual('');
        expect(orders[0].date).toEqual('');
        expect(orders[1].topic).toEqual('lecture2');
        expect(orders[1].date).toEqual('2/2/17');
        expect(orders[2].topic).toEqual('');
        expect(orders[2].date).toEqual('');
        expect(orders[3].topic).toEqual('lecture1');
        expect(orders[3].date).toEqual('1/1/17');
    });

    it('elements prop - filter - show filtered orders', () => {
        const props = {
            filterStatus: Status.order,
            limit: 30,
        };

        const orders = getElements(state, props);
        expect(orders).toHaveLength(2);
        expect(orders[0].orderId).toBe(1002);
        expect(orders[1].orderId).toBe(1001);
    });
});
