import {CLEAR_SELECTED_ORDER, SELECT_ORDER, SET_IS_SELECTED_ORDER, UPDATE_SELECTED_ORDER} from "./ActionTypes";
import {getSelectedOrder} from "./Selectors";
import {calculateDuration} from "../../util/TimeUtil";
import {getNextOrderId, getOrderById} from "../orders/selectors";
import {isEmptyValue} from "../../util/StringUtil";
import {selectPublicCourse} from "../SelectedPublicCourse/Actions";
import * as _ from "lodash";
import {mergeImmutable, toMutable} from "../../util/ObjectUpdater";
import calculateOrderStatus from "../../util/OrderStatus/OrderStatusCalculator";
import {sendDataToDatabase} from "../Firebase/Actions";
import {selectOrganization, sendSelectedOrganizationToDatabase} from "../SelectedOrganization/Actions";
import {hideRequiredFields, openDialog, openSnackbar} from "../Appearance/Actions";
import {getOrganizationById} from "../organizations/reducer";
import {getSelectedOrganization} from "../SelectedOrganization/Selectors";
import {getLabels} from "../Labels/Reducer";
import {getSelectedPublicCourse} from "../SelectedPublicCourse/Selectors";

export function selectOrder(orderId) {
    return function selectOrder(dispatch, getState) {
        const order = getOrderById(getState(), orderId);
        dispatch(selectOrganization(order.organizationId));

        if (!isEmptyValue(order, "publicCourseId")) {
            dispatch(selectPublicCourse(order.publicCourseId));
        }

        dispatch({
            type: SELECT_ORDER,
            payload: order
        });
    };
}

export function updateSelectedOrder(key, value) {
    return function updateSelectedOrder(dispatch, getState) {
        const status = calculateOrderStatus(getSelectedOrder(getState()), getSelectedPublicCourse(getState()));

        const order = mergeImmutable(getSelectedOrder(getState()), {
            [key]: value,
            status
        });

        dispatch({
            type: UPDATE_SELECTED_ORDER,
            payload: order,
        });
    }
}

export function updateLectureTime(key, value, lectureTimeIndex) {
    return function updateLectureTime(dispatch, getState) {
        const lectureTimes = toMutable(getSelectedOrder(getState()).lectureTimes);
        lectureTimes[lectureTimeIndex][key] = value;
        lectureTimes[lectureTimeIndex].duration = calculateDuration(lectureTimes[lectureTimeIndex]);
        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function addNewLectureTime() {
    return function addNewLectureTime(dispatch, getState) {
        const thisSelectedOrder = toMutable(getSelectedOrder(getState()));
        const lectureTimes = _.hasIn(thisSelectedOrder, 'lectureTimes') ? thisSelectedOrder.lectureTimes : [];
        lectureTimes.push({});

        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function deleteLectureTime(lectureTimeIndex) {
    return function addNewLectureTime(dispatch, getState) {
        const thisSelectedOrder = toMutable(getSelectedOrder(getState()));
        const lectureTimes = thisSelectedOrder.lectureTimes;
        lectureTimes.splice(lectureTimeIndex, 1);

        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    }
}

export function updatePublicCourseParticipant(key, value, participantIndex) {
    return function updatePublicCourseParticipant(dispatch, getState) {
        const publicCourseParticipants = toMutable(getSelectedOrder(getState()).publicCourseParticipants);
        publicCourseParticipants[participantIndex][key] = value;
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    }
}

export function updatePublicCourseLectureParticipating(lectureId, isAttending, participantIndex) {
    return function updatePublicCourseLectureParticipating(dispatch, getState) {
        const publicCourseParticipants = toMutable(getSelectedOrder(getState()).publicCourseParticipants);
        const participant = publicCourseParticipants[participantIndex];
        let lecturesAttending = _.hasIn(participant, 'lecturesAttending') ? participant.lecturesAttending : [];
        if (isAttending) {
            lecturesAttending.push(lectureId);
            lecturesAttending.sort((a, b) => a - b);
        }
        else {
            lecturesAttending = _.without(lecturesAttending, lectureId);
        }

        publicCourseParticipants[participantIndex].lecturesAttending = lecturesAttending;
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    }
}

export function removeParticipantsFromAllLectures() {
    return function removeParticipantsFromAllLectures(dispatch, getState) {
        if (isEmptyValue(getSelectedOrder(getState()), "publicCourseParticipants"))
            return;

        const publicCourseParticipants = toMutable(getSelectedOrder(getState()).publicCourseParticipants);
        for (const participant in publicCourseParticipants) {
            if (publicCourseParticipants[participant].lecturesAttending)
                publicCourseParticipants[participant].lecturesAttending = [];
        }
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    }
}

export function removeParticipant(participantId) {
    return function removeParticipant(dispatch, getState) {
        const publicCourseParticipants = toMutable(getSelectedOrder(getState()).publicCourseParticipants);
        publicCourseParticipants.splice(participantId, 1);
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    };
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

export function fillNewOrderMissingFields() {
    return function fillNewOrderMissingFields(dispatch, getState) {
        let idPromise;
        let createdPromise;
        let organizationIdPromise;
        if (!getSelectedOrder(getState()).hasOwnProperty("id")) {
            idPromise = dispatch(updateSelectedOrder("id", getNextOrderId(getState())));
            createdPromise = dispatch(updateSelectedOrder("createdDate", new Date().toJSON()));
        }

        if (!getSelectedOrder(getState()).hasOwnProperty("organizationId"))
            organizationIdPromise = dispatch(updateSelectedOrder("organizationId", getSelectedOrganization(getState()).id));

        return Promise.all([idPromise, organizationIdPromise, createdPromise]);
    }
}

export function saveNewOrder() {
    return async function saveNewOrder(dispatch, getState) {
        await dispatch(fillNewOrderMissingFields());

        function success() {
            const snackbarMessage = getLabels(getState()).pages.orderPage.snackBar.savedSuccessfully
                .replace("{0}", getSelectedOrder(getState()).id);
            dispatch(openSnackbar(snackbarMessage));
            dispatch(setIsSelectedOrder());
        }

        function failure(error) {
            const dialogText = getLabels(getState()).pages.orderPage.dialog;
            dispatch(openDialog(dialogText.sendingToDatabaseFailedTitle, dialogText.sendingToDatabaseFailedContent));
            // eslint-disable-next-line no-console
            console.error(error);
        }

        dispatch(sendSelectedOrderToDatabase()).then(success, failure);

        dispatch(hideRequiredFields());

        //Check if there are changes in organization
        if (!_.isEqual(getSelectedOrganization(getState()), getOrganizationById(getState(), getSelectedOrder(getState()).organizationId))) {
            dispatch(sendSelectedOrganizationToDatabase());
        }
    }
}