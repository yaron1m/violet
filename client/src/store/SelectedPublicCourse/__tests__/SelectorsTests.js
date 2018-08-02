import Immutable from 'seamless-immutable';
import {
    getSelectedPublicCourse,
    getSelectedPublicCourseLectures,
    isSelectedPublicCourse,
    getSelectedCourseParticipantsAndOrders
} from "../Selectors";

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
            publicCourseId: 555,
            publicCourseParticipants: [
                {name: "Alpha"},
                {name: "Bravo"}
            ]
        },
        124: {
            id: 124,
            publicCourseId: 333,
            publicCourseParticipants: [
                {name: "Charlie"},
                {name: "Delta"}
            ]
        },
        125: {
            id: 125,
            publicCourseId: 555,
            publicCourseParticipants: [
                {name: "Echo"},
                {name: "Foxtrot"}
            ]
        },
    }
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
                {order: state.orders[123], participant: {name: "Alpha"}},
                {order: state.orders[123], participant: {name: "Bravo"}},
                {order: state.orders[125], participant: {name: "Echo"}},
                {order: state.orders[125], participant: {name: "Foxtrot"}},
            ]);
    });
});