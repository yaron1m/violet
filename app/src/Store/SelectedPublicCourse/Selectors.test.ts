import {
    getLecturesDetails,
    getSelectedCourseParticipantsAndOrders,
    getSelectedPublicCourse,
    getSelectedPublicCourseLectures,
    getSelectedPublicCourseParticipants,
    isSelectedPublicCourse
} from './Selectors';
import * as labelSelectors from '../Labels/Selectors';
import {IState} from '../../Interfaces/ReduxInterfaces';

function getParticipant(id: number) {
    return {
        participantFirstName: 'first' + id,
        participantLastName: 'last' + id,
        lecturesAttending: [0, 1],
        participantCost: id * 100,
    };
}

const state = {
    selectedPublicCourse: {
        publicCourse: {
            id: 555,
            lectures: [
                {
                    id: 0,
                    date: '2018-07-01',
                    active: true,
                    topic: 'T1',
                    price: '1000',
                },
                {
                    id: 1,
                    date: '2018-08-01',
                    active: true,
                    topic: 'T2',
                    price: '2000',
                },
                {
                    id: 2,
                    date: '2018-06-01',
                    active: false,
                    topic: 'T3',
                    price: '3000',
                },
                {
                    id: 3,
                    date: '2018-05-01',
                    active: true,
                    topic: 'T4',
                    price: '4000',
                },
            ]
        },
        isSelectedPublicCourse: true
    },
    orders: {
        123: {
            id: 123,
            organizationId: 10,
            publicCourseId: 555,
            publicCourseParticipants: [
                getParticipant(1),
                getParticipant(2),
            ],
            proformaInvoiceNumber: '1122',
        },
        124: {
            id: 124,
            organizationId: 10,
            publicCourseId: 333,
            publicCourseParticipants: [
                getParticipant(3),
                getParticipant(4),
            ]
        },
        125: {
            id: 125,
            organizationId: 11,
            publicCourseId: 555,
            publicCourseParticipants: [
                getParticipant(5),
                getParticipant(6),
            ]
        },
    },
    organizations: {
        10: {organizationName: 'OrgA'},
        11: {organizationName: 'OrgB'}
    },
    labels: {currencyIcon: 'X'}
} as unknown as IState;

const emptyState = {
    selectedPublicCourse: {
        publicCourse: {},
        isSelectedPublicCourse: false,
    }
}as unknown as IState;

describe('Store/selected/selectors', () => {
    it('should return selected public course', () => {
        expect(getSelectedPublicCourse(state))
            .toEqual(state.selectedPublicCourse.publicCourse);
    });

    it('should return empty object', () => {
        expect(getSelectedPublicCourse(emptyState))
            .toEqual({});
    });

    it('should return isSelectedPublicCourse', () => {
        expect(isSelectedPublicCourse(state))
            .toBeTruthy();
    });

    it('should return isSelectedPublicCourse', () => {
        expect(isSelectedPublicCourse(emptyState))
            .toBeFalsy();
    });

    it('should return empty array', () => {
        expect(getSelectedPublicCourseLectures(emptyState))
            .toEqual([]);
    });

    it('should return lectures sorted by date', () => {
        expect(getSelectedPublicCourseLectures(state))
            .toEqual([
                state.selectedPublicCourse.publicCourse.lectures[3],
                state.selectedPublicCourse.publicCourse.lectures[0],
                state.selectedPublicCourse.publicCourse.lectures[1],
            ]);
    });

    it('should return tuples of orders and participants of matching course', () => {
        expect(getSelectedCourseParticipantsAndOrders(state))
            .toEqual([
                {order: state.orders[123], participant: state.orders[123].publicCourseParticipants[0]},
                {order: state.orders[123], participant: state.orders[123].publicCourseParticipants[1]},
                {order: state.orders[125], participant: state.orders[125].publicCourseParticipants[0]},
                {order: state.orders[125], participant: state.orders[125].publicCourseParticipants[1]},
            ]);
    });

    it('should return summary of participants of matching course', () => {
        // @ts-ignore
        labelSelectors.getStatusLabel = jest.fn();
        const result = getSelectedPublicCourseParticipants(state);

        expect(result).toHaveLength(4);

        expect(result[0]).toEqual({
            participantFirstName: 'first1',
            participantLastName: 'last1',
            numberOfLecturesAttending: 2,
            participantCost: '100.00 X',
            orderId: 123,
            status: undefined,
            organizationName: 'OrgA',
            proformaInvoiceNumber: '1122',
        });
        expect(result[1]).toEqual({
            participantFirstName: 'first2',
            participantLastName: 'last2',
            numberOfLecturesAttending: 2,
            participantCost: '200.00 X',
            orderId: 123,
            status: undefined,
            organizationName: 'OrgA',
            proformaInvoiceNumber: '1122',
        });
        expect(result[2]).toEqual({
            participantFirstName: 'first5',
            participantLastName: 'last5',
            numberOfLecturesAttending: 2,
            participantCost: '500.00 X',
            orderId: 125,
            status: undefined,
            organizationName: 'OrgB',
        });
        expect(result[3]).toEqual({
            participantFirstName: 'first6',
            participantLastName: 'last6',
            numberOfLecturesAttending: 2,
            participantCost: '600.00 X',
            orderId: 125,
            status: undefined,
            organizationName: 'OrgB',
        });
    });

    it('should return summary of lectures of matching course', () => {
        const result = getLecturesDetails(state);

        expect(result).toHaveLength(3);

        expect(result[0]).toEqual({
            date: '2018-05-01',
            topic: 'T4',
            participantsCount: 0,
            price: '4000',
            income: 0,
        });
        expect(result[1]).toEqual({
            date: '2018-07-01',
            topic: 'T1',
            participantsCount: 4,
            price: '1000',
            income: 4000,
        });
        expect(result[2]).toEqual({
            date: '2018-08-01',
            topic: 'T2',
            participantsCount: 4,
            price: '2000',
            income: 8000,
        });
    });
});