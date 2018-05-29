import React from 'react';
import * as orderStatusUtil from '../../../util/order-status'
import * as firebaseActions from "../../firebase/actions";
import {CLEAR_SELECTED_ORDER, SELECT_ORDER, SET_IS_SELECTED_ORDER, UPDATE_SELECTED_ORDER} from "../ActionTypes";
import {
    addNewLectureTime, clearSelectedOrder,
    removeParticipantsFromAllLectures,
    selectOrder,
    sendSelectedOrderToDatabase,
    setIsSelectedOrder,
    updateLectureTime,
    updatePublicCourseParticipant,
    updateSelectedOrder
} from "../Actions";


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
        const thunkFunction = selectOrder(id);
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
        expect(dispatch.mock.calls[1][0].type).toBe(SELECT_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toBe(value);
    });

    it('should dispatch action with updated order', () => {
        const thunkFunction = updateSelectedOrder(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
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
        expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrder);
    });

    it('should dispatch action with updated order with the same key', () => {
        const thunkFunction = updateSelectedOrder(key, newValue);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
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
        expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[0][0].payload).toEqual(expectedOrder);
    });

    it('should dispatch action with updated lecture times', () => {
        const thunkFunction = updateLectureTime(key, value, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
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
        expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);
    });

    it('should add lecture time when has none', () => {
        const thunkFunction = addNewLectureTime();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {}
                }
            }
        };
        const expectedOrder = {
            lectureTimes: [
                {},
            ],
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);
    });

    it('should add lecture time when has other', () => {
        const thunkFunction = addNewLectureTime();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        lectureTimes: [{key}, {value}]
                    }
                }
            }
        };
        const expectedOrder = {
            lectureTimes: [
                {key}, {value}, {}
            ],
            status
        };

        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);

        // Call updateSelectedOrder action
        dispatch.mock.calls[0][0](dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);
    });

    it('should update public course participant', () => {
        const thunkFunction = updatePublicCourseParticipant(key, value, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
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
        expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);

    });

    it('should update remove participants from all lectures', () => {
        const thunkFunction = removeParticipantsFromAllLectures();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
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
        expect(dispatch.mock.calls[1][0].type).toBe(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload).toEqual(expectedOrder);

    });

    it('should return set is selected action', () => {
        expect(setIsSelectedOrder().type).toBe(SET_IS_SELECTED_ORDER);
    });

    it('should dispatch action to send order to database', async () => {
        firebaseActions.sendDataToDatabase = jest.fn();

        const thunkFunction = sendSelectedOrderToDatabase();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        id,
                        [key]: value
                    }
                }
            }
        };
        await thunkFunction(dispatch, getState);

        const expectedOrder = {
            id,
            [key]: value,
        };

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledWith('/orders/' + id, expectedOrder);
    });

    it('should return clear selected order action', () => {
        expect(clearSelectedOrder().type).toBe(CLEAR_SELECTED_ORDER);
    });
});