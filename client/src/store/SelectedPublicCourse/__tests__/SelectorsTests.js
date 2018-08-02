import Immutable from 'seamless-immutable';
import {
    getSelectedPublicCourse,
    getSelectedPublicCourseLectures,
    isSelectedPublicCourse,
    getSelectedCourseParticipantsAndOrders, getSelectedPublicCourseParticipants
} from "../Selectors";
import * as lableReducers from "../../Labels/Reducer";

function getParticipant(id) {
    return {
        participantFirstName: "first" + id,
        participantLastName: "last" + id,
        lecturesAttending: [id, id + 1, id + 2],
        participantCost: id * 100,
    }
}

const state = Immutable({
    selectedPublicCourse: {
        publicCourse: {
            id: 555,
            lectures: [
                {id: 0, date: "2018-07-01"},
                {id: 1, date: "2018-08-01"},
                {id: 2, date: "2018-06-01"},
                {id: 3, date: "2018-05-01"},
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
            ]
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
        10: {organizationName: "OrgA"},
        11: {organizationName: "OrgB"}
    },
    labels: {currencyIcon: "X"}
});

const emptyState = Immutable({
    selectedPublicCourse: {
        publicCourse: {},
        isSelectedPublicCourse: false,
    }
});

describe('store/selected/selectors', () => {
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
                {id: 3, date: "2018-05-01"},
                {id: 2, date: "2018-06-01"},
                {id: 0, date: "2018-07-01"},
                {id: 1, date: "2018-08-01"},
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

    it('should return tuples of orders and participants of matching course', () => {
        lableReducers.getStatusLabel = jest.fn();
        const result = getSelectedPublicCourseParticipants(state);

        expect(result).toHaveLength(4);

        expect(result[0]).toEqual({
            participantFirstName: "first1",
            participantLastName: "last1",
            numberOfLecturesAttending: 3,
            participantCost: "100.00 X",
            orderId: 123,
            status: undefined,
            organizationName: "OrgA",
        });
        expect(result[1]).toEqual({
            participantFirstName: "first2",
            participantLastName: "last2",
            numberOfLecturesAttending: 3,
            participantCost: "200.00 X",
            orderId: 123,
            status: undefined,
            organizationName: "OrgA",
        });
        expect(result[2]).toEqual({
            participantFirstName: "first5",
            participantLastName: "last5",
            numberOfLecturesAttending: 3,
            participantCost: "500.00 X",
            orderId: 125,
            status: undefined,
            organizationName: "OrgB",
        });
        expect(result[3]).toEqual({
            participantFirstName: "first6",
            participantLastName: "last6",
            numberOfLecturesAttending: 3,
            participantCost: "600.00 X",
            orderId: 125,
            status: undefined,
            organizationName: "OrgB",
        });

    });
});