import React from 'react';
import * as orderStatusUtil from '../../../util/OrderStatus/OrderStatusCalculator'
import * as firebaseActions from "../../Firebase/Actions";
import {CLEAR_SELECTED_ORDER, SELECT_ORDER, SET_IS_SELECTED_ORDER, UPDATE_SELECTED_ORDER} from "../ActionTypes";
import {
    addNewLectureTime, clearSelectedOrder, fillNewOrderMissingFields,
    removeParticipantsFromAllLectures, saveNewOrder,
    selectOrder,
    sendSelectedOrderToDatabase,
    setIsSelectedOrder,
    updateLectureTime, updatePublicCourseLectureParticipating,
    updatePublicCourseParticipant,
    updateSelectedOrder
} from "../Actions";
import {HIDE_REQUIRED_FIELDS} from "../../Appearance/ActionTypes";
import {sendSelectedOrganizationToDatabase} from "../../SelectedOrganization/Actions";

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
                }, selectedPublicCourse: {
                    publicCourse: {}
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
                }, selectedPublicCourse: {
                    publicCourse: {}
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
                }, selectedPublicCourse: {
                    publicCourse: {}
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
                }, selectedPublicCourse: {
                    publicCourse: {}
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
                }, selectedPublicCourse: {
                    publicCourse: {}
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
                }, selectedPublicCourse: {
                    publicCourse: {}
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

    it('should add lecture to public course participant when there are no lectures', () => {
        const thunkFunction = updatePublicCourseLectureParticipating(2, true, 1);
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
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0},
                {
                    id: 9,
                    lecturesAttending: [2],
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

    it('should add lecture to public course participant when there are lectures', () => {
        const thunkFunction = updatePublicCourseLectureParticipating(2, true, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        publicCourseParticipants: [
                            {id: 0},
                            {
                                id: 9,
                                lecturesAttending: [11, 30],
                            }
                        ]

                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0},
                {
                    id: 9,
                    lecturesAttending: [2, 11, 30],
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

    it('should remove lecture from public course participant', () => {
        const thunkFunction = updatePublicCourseLectureParticipating(5, false, 1);
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        publicCourseParticipants: [
                            {id: 0},
                            {
                                id: 9,
                                lecturesAttending: [2, 5, 16],
                            }
                        ]

                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0},
                {
                    id: 9,
                    lecturesAttending: [2, 16],
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
                                lecturesAttending: [2, 4, 6]
                            },
                            {id: 9}
                        ]

                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0, lecturesAttending: []},
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
                }, selectedPublicCourse: {
                    publicCourse: {}
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

    it('should fill new order missing fields when no field is missing', () => {
        const thunkFunction = fillNewOrderMissingFields();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    "1234": {
                        id: "1234"
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: "1234",
                    }
                },
                selectedOrder: {
                    order: {
                        id,
                        organizationId: "1234",
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it('should fill order id and created date', () => {
        const thunkFunction = fillNewOrderMissingFields();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                orders: {
                    "5555": {}
                },
                organizations: {
                    "1234": {
                        id: "1234"
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: "1234",
                    }
                },
                selectedOrder: {
                    order: {
                        organizationId: "1234",
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0].name).toEqual("updateSelectedOrder");
        dispatch.mock.calls[0][0](dispatch, getState);
        expect(dispatch.mock.calls[2][0].type).toEqual(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[2][0].payload.id).toEqual(5556);


        expect(dispatch.mock.calls[1][0].name).toEqual("updateSelectedOrder");
        dispatch.mock.calls[1][0](dispatch, getState);
        expect(dispatch.mock.calls[3][0].type).toEqual(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[3][0].payload.createdDate.substr(0, 10)).toEqual(new Date().toJSON().substr(0, 10));
    });

    it('should fill organization id', () => {
        const thunkFunction = fillNewOrderMissingFields();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                orders: {
                    "5555": {}
                },
                organizations: {
                    "1234": {
                        id: "1234"
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: "1234",
                    }
                },
                selectedOrder: {
                    order: {
                        id
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0].name).toEqual("updateSelectedOrder");
        dispatch.mock.calls[0][0](dispatch, getState);
        expect(dispatch.mock.calls[1][0].type).toEqual(UPDATE_SELECTED_ORDER);
        expect(dispatch.mock.calls[1][0].payload.organizationId).toEqual("1234");
    });

    it('should save new order', async () => {
        const thunkFunction = saveNewOrder();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    "1234": {
                        id: "1234"
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: "1234",
                    }
                },
                selectedOrder: {
                    order: {
                        id,
                        [key]: value,
                        organizationId: "1234",
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        dispatch.mockReturnValue(Promise.resolve());
        await thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0].name).toEqual("fillNewOrderMissingFields");
        expect(dispatch.mock.calls[1][0].name).toEqual("sendSelectedOrderToDatabase");
        expect(dispatch.mock.calls[2][0].type).toEqual(HIDE_REQUIRED_FIELDS);
    });

    it('should save new order and update organization', async () => {
        const thunkFunction = saveNewOrder();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    "1234": {
                        id: "1234"
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: "1234",
                        [key]: newValue
                    }
                },
                selectedOrder: {
                    order: {
                        id,
                        [key]: value,
                        organizationId: "1234",
                    }
                },
                selectedPublicCourse: {
                    publicCourse: {}
                }
            }
        };
        dispatch.mockReturnValue(Promise.resolve());
        await thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0].name).toEqual("fillNewOrderMissingFields");
        expect(dispatch.mock.calls[1][0].name).toEqual("sendSelectedOrderToDatabase");
        expect(dispatch.mock.calls[2][0].type).toEqual(HIDE_REQUIRED_FIELDS);
        expect(dispatch.mock.calls[3][0].name).toEqual("sendSelectedOrganizationToDatabase");
    });
});