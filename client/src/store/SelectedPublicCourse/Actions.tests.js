import * as actions from "./Actions";
import {clearSelectedPublicCourse} from "./Actions";
import * as firebaseActions from "../Firebase/Actions";
import {
    CLEAR_SELECTED_PUBLIC_COURSE,
    SELECT_PUBLIC_COURSE,
    SET_IS_SELECTED_PUBLIC_COURSE,
    UPDATE_SELECTED_PUBLIC_COURSE
} from "./ActionTypes";
import {getMockedDispatch} from '../../util/TestUtils';


const id = 123456;
const org = "org";
const value = "value";
const key = "key";
const newValue = "newValue";

let dispatch;

describe('Selected public course actions', () => {
    test('right action is fired when selecting a public course', () => {
        const target = actions.selectPublicCourse(id);

        const getState = () => {
            return {
                publicCourses: {
                    [id]: value
                }
            }
        };

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: SET_IS_SELECTED_PUBLIC_COURSE,
        });

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: SELECT_PUBLIC_COURSE,
            payload: value
        });
    });

    it('should dispatch action with updated public course', () => {
        const target = actions.updateSelectedPublicCourse(key, newValue);

        const getState = () => {
            return {
                selectedPublicCourse: {
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

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: expectedCourse
        });
    });

    it('should dispatch action with updated order with the same key', () => {
        const target = actions.updateSelectedPublicCourse(key, newValue);

        const getState = () => {
            return {
                selectedPublicCourse: {
                    publicCourse: {
                        [key]: value
                    }
                }
            }
        };
        const expectedCourse = {
            [key]: newValue,
        };
        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: expectedCourse
        });
    });

    it('should dispatch action with updated lectures', () => {
        const target = actions.updatePublicCourseLecture(key, value, 1);

        const getState = () => {
            return {
                selectedPublicCourse: {
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

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: expectedCourse
        });
    });

    it('should add empty lecture to selected public course when there are other lectures', () => {
        const target = actions.addLectureToSelectedPublicCourse();

        const getState = () => {
            return {
                selectedPublicCourse: {
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

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toHaveBeenCalledWith({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: expectedCourse
        });
    });

    it('should add empty lecture to selected public course when there are no other lectures', () => {
        const target = actions.addLectureToSelectedPublicCourse();

        const getState = () => {
            return {
                selectedPublicCourse: {
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

        const mockedDispatch = getMockedDispatch(getState);

        target(mockedDispatch, getState);

        expect(mockedDispatch).toBeCalledWith({
            type: UPDATE_SELECTED_PUBLIC_COURSE,
            payload: expectedCourse
        });
    });

    it('should return set is selected public course action', () => {
        expect(actions.setIsSelectedPublicCourse()).toEqual({
            type: SET_IS_SELECTED_PUBLIC_COURSE
        });
    });

    it('should dispatch action to send order to database', async () => {
        firebaseActions.sendDataToDatabase = jest.fn();

        const target = actions.sendSelectedPublicCourseToDatabase();

        const getState = () => {
            return {
                selectedPublicCourse: {
                    publicCourse: {
                        id,
                        [key]: value
                    }
                }
            }
        };

        const expectedCourse = {
            id,
            [key]: value
        };

        const mockedDispatch = getMockedDispatch(getState);

        await target(mockedDispatch, getState);

        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledTimes(1);
        expect(firebaseActions.sendDataToDatabase).toHaveBeenCalledWith('/publicCourses/' + id, expectedCourse);
    });

    it('should return clear selected public course action', () => {
        expect(clearSelectedPublicCourse()).toEqual({
            type: CLEAR_SELECTED_PUBLIC_COURSE
        });
    });
});