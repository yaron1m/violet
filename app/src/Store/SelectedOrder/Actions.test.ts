import * as orderStatusUtil from '../../Util/OrderStatus/OrderStatusCalculator';
import * as firebaseActions from '../Firebase/Actions';
import {CLEAR_SELECTED_ORDER, SELECT_ORDER, SET_IS_SELECTED_ORDER, UPDATE_SELECTED_ORDER} from './ActionTypes';
import {
    addNewLectureTime, clearSelectedOrder, fillNewOrderMissingFields, removeParticipant,
    removeParticipantsFromAllLectures, saveNewOrder,
    selectOrder,
    sendSelectedOrderToDatabase,
    setIsSelectedOrder,
    updateLectureTime, updatePublicCourseLectureParticipating,
    updatePublicCourseParticipant,
    updateSelectedOrder
} from './Actions';
import {HIDE_REQUIRED_FIELDS} from '../Appearance/ActionTypes';
import {sendSelectedOrganizationToDatabase} from '../SelectedOrganization/Actions';
import {getMockedDispatch} from '../../Util/TestUtils';
import {SELECT_ORGANIZATION} from '../SelectedOrganization/ActionTypes';
import {SELECT_PUBLIC_COURSE, SET_IS_SELECTED_PUBLIC_COURSE} from '../SelectedPublicCourse/ActionTypes';
import {progressiveStatuses as Status} from '../../Util/Constants/Status';
import {IState} from '../../Interfaces/ReduxInterfaces';

const id = 123456;
const orgId = 555;
const publicCourseId = 99;
const org = 'org';
const value = 'value';
const key = 'key';
const newValue = 'newValue';
const status = 'status';

describe('Selected order actions', () => {
    beforeEach(() => {
        // @ts-ignore
        orderStatusUtil.default = jest.fn();
        // @ts-ignore
        orderStatusUtil.default.mockReturnValue(status);
    });

    it('should dispatch action with selected order and organization', () => {
        const target = selectOrder(id);
        const getState = () => {
            return {
                organizations: {
                    [orgId]: org
                },
                orders: {
                    [id]: {
                        [key]: value,
                        organizationId: orgId,
                    },
                }
            } as unknown as IState;
        };

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: SELECT_ORGANIZATION,
            payload: org
        });

        expect(mockedDispatch).toBeCalledWith({
            type: SELECT_ORDER,
            payload: {
                [key]: value,
                organizationId: orgId,
            },
        });
    });

    it('should dispatch action with public course id, when has one', () => {
        const target = selectOrder(id);
        const getState = () => {
            return {
                organizations: {
                    [orgId]: org
                },
                orders: {
                    [id]: {
                        [key]: value,
                        organizationId: orgId,
                        publicCourseId: publicCourseId
                    },
                },
                publicCourses: {
                    [publicCourseId]: {
                        a: 'b'
                    }
                }
            } as unknown as IState;
        };

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: SET_IS_SELECTED_PUBLIC_COURSE,
        });

        expect(mockedDispatch).toBeCalledWith({
            type: SELECT_PUBLIC_COURSE,
            payload: {
                a: 'b'
            }
        });
    });

    it('should dispatch action with updated order', () => {
        const target = updateSelectedOrder(key, newValue);
        const getState = () => {

            return {
                selectedOrder: {
                    order: {
                        [id]: value
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };

        const mockedDispatch = getMockedDispatch(getState);

        const expectedOrder = {
            [id]: value,
            [key]: newValue,
            status
        };

        target(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should dispatch action with updated order with the same key', () => {
        const target = updateSelectedOrder(key, newValue);

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        [key]: value
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };
        const mockedDispatch = getMockedDispatch(getState);

        const expectedOrder = {
            [key]: newValue,
            status
        };

        target(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should dispatch action with updated lecture times', () => {
        const thunkFunction = updateLectureTime(key, value, 1);

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        lectureTimes: [
                            {id: 0},
                            {
                                id: 9,
                                startTime: '12:00',
                                endTime: '13:00',
                            }
                        ]

                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };
        const expectedOrder = {
            lectureTimes: [
                {id: 0},
                {
                    id: 9,
                    [key]: value,
                    startTime: '12:00',
                    endTime: '13:00',
                    duration: '01:00'
                }
            ],
            status
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should add lecture time when has none', () => {
        const thunkFunction = addNewLectureTime();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {}
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };
        const expectedOrder = {
            lectureTimes: [
                {},
            ],
            status
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should add lecture time when has other', () => {
        const thunkFunction = addNewLectureTime();

        const getState = () => {
            return {
                selectedOrder: {
                    order: {
                        lectureTimes: [{key}, {value}]
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };
        const expectedOrder = {
            lectureTimes: [
                {key}, {value}, {}
            ],
            status
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should update public course participant', () => {
        const thunkFunction = updatePublicCourseParticipant(key, value, 1);

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
            } as unknown as IState;
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

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
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
            } as unknown as IState;
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

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
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
            } as unknown as IState;
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

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
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
            } as unknown as IState;
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

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
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
            } as unknown as IState;
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0, lecturesAttending: []},
                {id: 9}
            ],
            status
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should remove participant from order', () => {
        const thunkFunction = removeParticipant(1);
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
                            },
                            {id: 13}
                        ]

                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };
        const expectedOrder = {
            publicCourseParticipants: [
                {id: 0},
                {id: 13},
            ],
            status
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });

    it('should return set is selected action', () => {
        expect(setIsSelectedOrder()).toEqual({
            type: SET_IS_SELECTED_ORDER
        });
    });

    it('should dispatch action to send order to database', async () => {
        // @ts-ignore
        firebaseActions.sendDataToDatabase = jest.fn();

        const target = sendSelectedOrderToDatabase();

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
            } as unknown as IState;
        };
        const mockedDispatch = getMockedDispatch(getState);

        await target(mockedDispatch, getState);

        const expectedOrder = {
            id,
            [key]: value,
        };

        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledWith('/orders/' + id, expectedOrder);
    });

    it('should return clear selected order action', () => {
        expect(clearSelectedOrder()).toEqual({
            type: CLEAR_SELECTED_ORDER
        });
    });

    it('should fill new order missing fields when no field is missing', () => {
        const thunkFunction = fillNewOrderMissingFields();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    '1234': {
                        id: '1234'
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: '1234',
                    }
                },
                selectedOrder: {
                    order: {
                        id,
                        organizationId: '1234',
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledTimes(0);
    });

    it('should fill order id and created date', () => {
        const thunkFunction = fillNewOrderMissingFields();
        const now = new Date();
        // @ts-ignore
        global.Date = jest.fn(() => now);

        const getState = () => {
            return {
                orders: {
                    '5555': {}
                },
                organizations: {
                    '1234': {
                        id: '1234'
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: '1234',
                    }
                },
                selectedOrder: {
                    order: {
                        [key]: value,
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };

        const mockedDispatch = getMockedDispatch(getState);
        thunkFunction(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: {
                id: 5556,
                status: 'status',
                [key]: value,
            },
        });

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: {
                createdDate: now.toJSON(),
                status: 'status',
                [key]: value,
            },
        });

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: {
                organizationId: '1234',
                status: 'status',
                [key]: value,
            },
        });
    });

    it('should save new order', async () => {
        const thunkFunction = saveNewOrder();

        const getState = () => {
            return {
                organizations: {
                    '1234': {
                        id: '1234'
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: '1234',
                    }
                },
                selectedOrder: {
                    order: {
                        id,
                        [key]: value,
                        organizationId: '1234',
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };

        const dispatch = jest.fn();
        // thunkFunction(dispatch, getState);

        dispatch.mockReturnValue(Promise.resolve());
        await thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0].name).toEqual('fillNewOrderMissingFields');
        expect(dispatch.mock.calls[1][0].name).toEqual('sendSelectedOrderToDatabase');
        expect(dispatch.mock.calls[2][0].type).toEqual(HIDE_REQUIRED_FIELDS);
    });

    it('should save new order and update organization', async () => {
        const thunkFunction = saveNewOrder();
        expect(thunkFunction).toBeDefined();

        const getState = () => {
            return {
                organizations: {
                    '1234': {
                        id: '1234'
                    }
                },
                selectedOrganization: {
                    organization: {
                        id: '1234',
                        [key]: newValue
                    }
                },
                selectedOrder: {
                    order: {
                        id,
                        [key]: value,
                        organizationId: '1234',
                    }
                },
                selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };
        const dispatch = jest.fn();

        dispatch.mockReturnValue(Promise.resolve());
        await thunkFunction(dispatch, getState);

        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch.mock.calls[0][0].name).toEqual('fillNewOrderMissingFields');
        expect(dispatch.mock.calls[1][0].name).toEqual('sendSelectedOrderToDatabase');
        expect(dispatch.mock.calls[2][0].type).toEqual(HIDE_REQUIRED_FIELDS);
        expect(dispatch.mock.calls[3][0].name).toEqual('sendSelectedOrganizationToDatabase');
    });

    it('should calculate status after updating the order', () => {
        // @ts-ignore
        orderStatusUtil.default = jest.fn(order => {
            if (order.orderApproved)
                return Status.approvedOrder;

            return Status.contact;
        });

        const target = updateSelectedOrder('orderApproved', true);
        const getState = () => {

            return {
                selectedOrder: {
                    order: {
                        [id]: value
                    }
                }, selectedPublicCourse: {
                    publicCourse: {}
                }
            } as unknown as IState;
        };

        const mockedDispatch = getMockedDispatch(getState);

        const expectedOrder = {
            [id]: value,
            orderApproved: true,
            status: Status.approvedOrder
        };

        target(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_ORDER,
            payload: expectedOrder,
        });
    });
});