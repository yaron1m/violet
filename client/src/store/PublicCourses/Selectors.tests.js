import Immutable from 'seamless-immutable';
import {
    getActivePublicCourses,
    getNextPublicCourseId,
    getPublicCourseById,
    getPublicCourseByOrder,
    getPublicCourses, getPublicCoursesSummary
} from "./Selectors";

const sampleState = Immutable({
    publicCourses: {
        1000: {
            courseName: "my course name",
            courseLocation: "My house",
            courseCity: "Ramat-Gan",
            distanceCost: "80",
            id: 1000,
            lectures: [
                {
                    active: true,
                    date: "2017-12-31",
                    startTime: "9:00",
                    endTime: "16:00",


                },
                {
                    active: true,
                    date: "2017-11-11",
                    startTime: "9:00",
                    endTime: "16:00",


                }

            ]
        },
        1001: {
            id: 1001,
            courseName: "Another course name",
            courseLocation: "not my house",
            lectures: [
                {
                    active: true,
                    date: "2999-01-01"
                }
            ]
        },
        1002: {
            id: 1002
        }
    },
});

describe('Public course selectors', () => {

    it('should return all public courses', () => {
        expect(getPublicCourses(sampleState))
            .toEqual(sampleState.publicCourses);
    });

    it('should return only active public courses', () => {
        expect(getActivePublicCourses(sampleState))
            .toEqual([sampleState.publicCourses[1001]]);
    });

    it('should return the next public course id', () => {
        expect(getNextPublicCourseId(sampleState))
            .toEqual(1003);
    });

    it('should return public course by id', () => {
        expect(getPublicCourseById(sampleState, 1000))
            .toEqual(sampleState.publicCourses[1000]);
    });

    it('should return public course by order', () => {
        const order = {
            publicCourseId: 1000
        };

        expect(getPublicCourseByOrder(sampleState, order))
            .toEqual(sampleState.publicCourses[1000]);
    });

    it('should return a summary of all public courses', () => {
        const expectedResult = [
                {
                    "id": 1002
                },
                {
                    "courseLocation": "not my house",
                    "courseName": "Another course name",
                    "date": "2999-01-01",
                    "id": 1001
                },
                {
                    "courseLocation": "My house",
                    "courseName": "my course name",
                    "date": "2017-11-11",
                    "id": 1000
                },
            ]
        ;

        expect(getPublicCoursesSummary(sampleState))
            .toEqual(expectedResult);
    });
});