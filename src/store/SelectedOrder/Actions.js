import {CLEAR_SELECTED_ORDER, SELECT_ORDER, SET_IS_SELECTED_ORDER, UPDATE_SELECTED_ORDER} from "./ActionTypes";
import * as Immutable from "seamless-immutable";
import {getSelectedOrder} from "./Selectors";
import {calculateDuration} from "../../util/time-util";
import {getOrderById} from "../orders/selectors";
import {isEmptyValue} from "../../util/string-util";
import {selectOrganization, selectPublicCourse} from "../selected/actions";
import * as _ from "lodash";
import {changeImmutable, mergeImmutable} from "../../util/ObjectUpdater";
import calculateOrderStatus from "../../util/order-status";
import {sendDataToDatabase} from "../firebase/actions";

export function selectOrder(orderId) {
    return function selectOrder(dispatch, getState) {
        const order = getOrderById(getState(), orderId);
        dispatch(selectOrganization(order.organizationId));
        if (!isEmptyValue(order, "publicCourseId"))
            dispatch(selectPublicCourse(order.publicCourseId));

        dispatch({
            type: SELECT_ORDER,
            payload: order
        });
    };
}

export function updateSelectedOrder(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const status = calculateOrderStatus(getSelectedOrder(getState()));

        const order = mergeImmutable(getSelectedOrder(getState()),{
            [key]: value,
            "status": status
        });

        dispatch({
            type: UPDATE_SELECTED_ORDER,
            payload: order,
        });
    }
}

export function updateLectureTime(key, value, lectureTimeIndex) {
    return function updateLectureTime(dispatch, getState) {
        const lectureTimes = Immutable.asMutable(getSelectedOrder(getState()).lectureTimes, {deep: true});
        lectureTimes[lectureTimeIndex][key] = value;
        lectureTimes[lectureTimeIndex].duration = calculateDuration(lectureTimes[lectureTimeIndex]);
        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function addNewLectureTime() {
    return function addNewLectureTime(dispatch, getState) {
        const thisSelectedOrder = Immutable.asMutable(getSelectedOrder(getState()), {deep: true});
        const lectureTimes = _.hasIn(thisSelectedOrder, 'lectureTimes') ? thisSelectedOrder.lectureTimes : [];
        lectureTimes.push({});

        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function deleteLectureTime(lectureTimeIndex) {
    return function addNewLectureTime(dispatch, getState) {
        const thisSelectedOrder = Immutable.asMutable(getSelectedOrder(getState()), {deep: true});
        const lectureTimes = Immutable.asMutable(thisSelectedOrder.lectureTimes);
        lectureTimes.splice(lectureTimeIndex, 1);

        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function updatePublicCourseParticipant(key, value, participantIndex) {
    return function updatePublicCourseParticipant(dispatch, getState) {
        const publicCourseParticipants = Immutable.asMutable(getSelectedOrder(getState()).publicCourseParticipants, {deep: true});
        publicCourseParticipants[participantIndex][key] = value;
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    }
}

export function removeParticipantsFromAllLectures() {
    return function removeParticipantsFromAllLectures(dispatch, getState) {
        if (isEmptyValue(getSelectedOrder(getState()), "publicCourseParticipants"))
            return;

        const publicCourseParticipants = Immutable.asMutable(getSelectedOrder(getState()).publicCourseParticipants, {deep: true});
        for (const participant in publicCourseParticipants) {
            publicCourseParticipants[participant] = _.omitBy(publicCourseParticipants[participant], (value, key) => _.startsWith(key, "attendingLecture"));
        }
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    }
}

export function setIsSelectedOrder() {
    return {
        type: SET_IS_SELECTED_ORDER,
    }
}

export function sendSelectedOrderToDatabase() {
    return async function sendSelectedOrderToDatabase(dispatch, getState) {
        await dispatch(updateSelectedOrder("changedDate", new Date().toJSON()));
        const selectedOrder = getSelectedOrder(getState());

        return sendDataToDatabase('/orders/' + selectedOrder.id, selectedOrder);
    }
}

export function clearSelectedOrder() {
    return {
        type: CLEAR_SELECTED_ORDER,
    }
}