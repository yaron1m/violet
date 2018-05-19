import React from 'react';
import * as actions from "../actions";
import * as actionTypes from "../action-types";
import * as firebaseActions from "../../firebase/actions";


const id = 123456;
const org = "org";
const value = "value";
const key = "key";
const newValue = "newValue";

let dispatch;

describe('Selected public course actions', () => {
    beforeEach(() => {
        dispatch = jest.fn();
    });

    it('should dispatch action with selected public course', () => {
        const thunkFunction = actions.selectPublicCourse(id);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                publicCourses: {
                    [id]: value
                }
            }
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.SELECT_PUBLIC_COURSE);
        expect(dispatch.mock.calls[1][0].payload).toBe(value);
    });

    it('should dispatch action with updated public course', () => {
        const thunkFunction = actions.updateSelectedPublicCourse(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    publicCourse: {
                        [id]: value
                    }
                }
            }
        };
        const expectedCourse = {
            [id]: value,
            [key]: newValue,
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_PUBLIC_COURSE);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedCourse);
    });

    it('should dispatch action with updated order with the same key', () => {
        const thunkFunction = actions.updateSelectedPublicCourse(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    publicCourse: {
                        [key]: value
                    }
                }
            }
        };
        const expectedCourse = {
            [key]: newValue,
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_PUBLIC_COURSE);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedCourse);
    });

    it('should dispatch action with updated lectures', () => {
        const thunkFunction = actions.updatePublicCourseLecture(key, value, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    publicCourse: {
                        lectures: [
                            {id: 0},
                            {
                                id: 9,
                                startTime: "12:00",
                                endTime: "13:00",
                            }
                        ]

                    }
                }
            }
        };
        const expectedCourse = {
            lectures: [
                {id: 0},
                {
                    id: 9,
                    [key]: value,
                    startTime: "12:00",
                    endTime: "13:00",
                    duration: "01:00"
                }
            ],
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.UPDATE_SELECTED_PUBLIC_COURSE);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedCourse);

    });

    it('should add empty lecture to selected public course when there are other lectures', () => {
        const thunkFunction = actions.addLectureToSelectedPublicCourse();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    publicCourse: {
                        lectures: [
                            {id: 0},
                            {
                                id: 9,
                                startTime: "12:00",
                            }
                        ]

                    }
                }
            }
        };
        const expectedCourse = {
            lectures: [
                {id: 0},
                {
                    id: 9,
                    startTime: "12:00",
                },
                {
                    id: 2,
                    active: true
                }
            ],
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.UPDATE_SELECTED_PUBLIC_COURSE);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedCourse);

    });

    it('should add empty lecture to selected public course when there are no other lectures', () => {
        const thunkFunction = actions.addLectureToSelectedPublicCourse();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    publicCourse: {}
                }
            }
        };
        const expectedCourse = {
            lectures: [
                {
                    id: 0,
                    active: true
                }
            ],
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.UPDATE_SELECTED_PUBLIC_COURSE);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedCourse);

    });

    it('should return set is selected public course action', () => {
        expect(actions.setIsSelectedPublicCourse().type).toBe(actionTypes.SET_IS_SELECTED_PUBLIC_COURSE);
    });

    it('should dispatch action to send order to database', async () => {
        firebaseActions.sendDataToDatabase = jest.fn();

        const thunkFunction = actions.sendSelectedPublicCourseToDatabase();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    publicCourse: {
                        id,
                        [key]: value
                    }
                }
            }
        };

        await thunkFunction(dispatch, getState);

        const expectedCourse = {
            id,
            [key]: value
        };
        expect(dispatch.mock.calls.length).toBe(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledWith('/publicCourses/' + id, expectedCourse);
    });
});