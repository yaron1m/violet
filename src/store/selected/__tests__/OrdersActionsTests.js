import React from 'react';
import * as actions from "../actions";
import * as actionTypes from "../action-types";
import * as orderStatusUtil from '../../../util/order-status'


const id = 123456;
const orgId = 555;
const org = "org";
const value = "value";
const key = "key";
const newValue = "newValue";
const status = "status";

let dispatch;

describe('Selected order actions', () => {
    beforeEach(() => {
        dispatch = jest.fn();
        orderStatusUtil.default = jest.fn();
        orderStatusUtil.default.mockReturnValue(status);
    });

    it('should dispatch action with selected order', () => {
        const thunkFunction = actions.selectOrder(id);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    [orgId]: org
                },
                orders: {
                    [id]: value
                }
            }
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.SELECT_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toBe(value);
    });

    it('should dispatch action with updated order', () => {
        const thunkFunction = actions.updateSelectedOrder(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order: {
                        [id]: value
                    }
                }
            }
        };
        const expectedOrder = {
            [id]: value,
            [key]: newValue,
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrder);
    });

    it('should dispatch action with updated order with the same key', () => {
        const thunkFunction = actions.updateSelectedOrder(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order: {
                        [key]: value
                    }
                }
            }
        };
        const expectedOrder = {
            [key]: newValue,
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrder);
    });

    it('should dispatch action with updated lecture times', () => {
        const thunkFunction = actions.updateLectureTime(key, value, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order: {
                        lectureTimes: [
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
        const expectedOrder = {
            lectureTimes: [
                {id: 0},
                {
                    id: 9,
                    [key]: value,
                    startTime: "12:00",
                    endTime: "13:00",
                    duration: "01:00"
                }
            ],
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);

    });

    it('should update public course participant', () => {
        const thunkFunction = actions.updatePublicCourseParticipant(key, value, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order: {
                        publicCourseParticipants: [
                            {id: 0},
                            {
                                id: 9,
                            }
                        ]

                    }
                }
            }
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0},
                {
                    id: 9,
                    [key]: value,
                }
            ],
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);

    });

    it('should update remove participants from all lectures', () => {
        const thunkFunction = actions.removeParticipantsFromAllLectures();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    order: {
                        publicCourseParticipants: [
                            {
                                id: 0,
                                attendingLecture2: true,
                                attendingLecture3: false,
                                attendingLecture5: true
                            },
                            {
                                id: 9,
                                attendingLecture5: true,
                                attendingLecture7: false,
                            }
                        ]

                    }
                }
            }
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0},
                {id: 9}
            ],
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(actionTypes.UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);

    });

    it('should return set is selected action', () => {
        expect(actions.setIsSelectedOrder().type).toBe(actionTypes.SET_IS_SELECTED_ORDER);
    });

    it('should dispatch action to send order to database', () => {
        //TODO test is not full
        const thunkFunction = actions.sendSelectedOrganizationToDatabase();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selected: {
                    organization: {
                        id,
                        [key]: value
                    }
                }
            }
        };
        thunkFunction(dispatch, getState);

        expect(dispatch.mock.calls.length).toBe(1);
    });
});