import * as actionTypes from './action-types';
import {getOrganizationById} from "../organizations/reducer";
import {getOrderById} from "../orders/selectors";
import {getSelectedOrder, getSelectedOrganization, getSelectedPublicCourse} from "./reducer";
import {sendDataToDatabase} from "../firebase/actions";
import * as Immutable from "seamless-immutable";
import calculateOrderStatus from '../../util/order-status'
import {getPublicCourseById} from "../PublicCourses/reducer";
import {calculateDuration} from "../../util/time-util";
import * as _ from "lodash";

// Organizations:
export function selectOrganization(organizationId) {
    return function selectOrganization(dispatch, getState) {
        const organization = getOrganizationById(getState(), organizationId);
        dispatch({
            type: actionTypes.SELECT_ORGANIZATION,
            payload: organization
        })
    };
}

export function updateSelectedOrganization(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const currentOrganization = getSelectedOrganization(getState());
        const selectedOrganization = changeImmutable(currentOrganization, key, value);
        dispatch({
            type: actionTypes.UPDATE_SELECTED_ORGANIZATION,
            payload: selectedOrganization,
        });
    }
}

export function setIsSelectedOrganization() {
    return {
        type: actionTypes.SET_IS_SELECTED_ORGANIZATION,
    }
}

export function sendSelectedOrganizationToDatabase() {
    return async function sendSelectedOrganizationToDatabase(dispatch, getState) {
        await dispatch(updateSelectedOrganization("changedDate", new Date().toJSON()));
        const selectedOrganization = getSelectedOrganization(getState());

        return sendDataToDatabase('/organizations/' + selectedOrganization.id, selectedOrganization);
    }
}

// Orders:

export function selectOrder(orderId) {
    return async function selectOrder(dispatch, getState) {
        const order = getOrderById(getState(), orderId);
        dispatch(selectOrganization(order.organizationId));
        dispatch({
            type: actionTypes.SELECT_ORDER,
            payload: order
        });

    };
}

export function updateSelectedOrder(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const selectedOrder = changeImmutable(getSelectedOrder(getState()), key, value);
        const status = calculateOrderStatus(selectedOrder);
        const updatedOrder = Immutable.merge(selectedOrder, {
            status: status
        });

        dispatch({
            type: actionTypes.UPDATE_SELECTED_ORDER,
            payload: updatedOrder,
        });
    }
}

export function updateLectureTime(key, value, lectureTimeIndex) {
    return function updateLectureTime(dispatch, getState) {
        let lectureTimes = Immutable.asMutable(getSelectedOrder(getState()).lectureTimes, {deep: true});
        lectureTimes[lectureTimeIndex][key] = value;
        lectureTimes[lectureTimeIndex].duration = calculateDuration(lectureTimes[lectureTimeIndex]);
        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function updatePublicCourseParticipant(key, value, participantIndex) {
    return function updatePublicCourseParticipant(dispatch, getState) {
        let publicCourseParticipants = Immutable.asMutable(getSelectedOrder(getState()).publicCourseParticipants, {deep: true});
        publicCourseParticipants[participantIndex][key] = value;
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    }
}

export function setIsSelectedOrder() {
    return {
        type: actionTypes.SET_IS_SELECTED_ORDER,
    }
}

export function sendSelectedOrderToDatabase() {
    return async function sendSelectedOrderToDatabase(dispatch, getState) {
        await dispatch(updateSelectedOrder("changedDate", new Date().toJSON()));
        const selectedOrder = getSelectedOrder(getState());

        return sendDataToDatabase('/orders/' + selectedOrder.id, selectedOrder);
    }
}

// Public Courses:
export function selectPublicCourse(courseId) {
    return function selectPublicCourse(dispatch, getState) {
        const publicCourse = getPublicCourseById(getState(), courseId);
        dispatch(setIsSelectedPublicCourse());
        dispatch({
            type: actionTypes.SELECT_PUBLIC_COURSE,
            payload: publicCourse
        })
    };
}

export function updateSelectedPublicCourse(key, value) {
    return function updateSelectedPublicCourse(dispatch, getState) {
        const currentPublicCourse = getSelectedPublicCourse(getState());
        const selectedPublicCourse = changeImmutable(currentPublicCourse, key, value);
        dispatch({
            type: actionTypes.UPDATE_SELECTED_PUBLIC_COURSE,
            payload: selectedPublicCourse,
        });
    }
}

export function updatePublicCourseLecture(key, value, lectureId) {
    return function updatePublicCourseLecture(dispatch, getState) {
        let lectures = Immutable.asMutable(getSelectedPublicCourse(getState()).lectures, {deep: true});
        lectures[lectureId][key] = value;
        lectures[lectureId].duration = calculateDuration(lectures[lectureId]);
        dispatch(updateSelectedPublicCourse("lectures", lectures));
    }
}

export function addLectureToSelectedPublicCourse() {
    return function addLectureToSelectedPublicCourse(dispatch, getState) {
        let selectedPublicCourse = Immutable.asMutable(getSelectedPublicCourse(getState()), {deep: true});
        let lectures = _.hasIn(selectedPublicCourse, 'lectures') ? selectedPublicCourse.lectures : {};
        const nextId = "publicLecture" + _.keys(lectures).length;
        lectures[nextId] = {
            id: nextId,
            active: true,
        };

        dispatch(updateSelectedPublicCourse("lectures", lectures));
    }
}

export function setIsSelectedPublicCourse() {
    return {
        type: actionTypes.SET_IS_SELECTED_PUBLIC_COURSE,
    }
}

export function sendSelectedPublicCourseToDatabase() {
    return async function sendSelectedPublicCourseToDatabase(dispatch, getState) {
        await dispatch(updateSelectedPublicCourse("changedDate", new Date().toJSON()));
        const selectedPublicCourse = getSelectedPublicCourse(getState());

        return sendDataToDatabase('/publicCourses/' + selectedPublicCourse.id, selectedPublicCourse);
    }
}


// Clear

export function clearSelected() {
    return {
        type: actionTypes.CLEAR_SELECTED,
    }
}

export function clearSelectedOrder() {
    return {
        type: actionTypes.CLEAR_SELECTED_ORDER,
    }
}


// Helpers
function changeImmutable(obj, key, value) {
    return Immutable.merge(obj, {
        [key]: value
    });
}