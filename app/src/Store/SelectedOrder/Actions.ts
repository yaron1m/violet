import {CLEAR_SELECTED_ORDER, SELECT_ORDER, SET_IS_SELECTED_ORDER, UPDATE_SELECTED_ORDER} from "./ActionTypes";
import {getSelectedOrder} from "./Selectors";
import {getNextOrderId, getOrderById} from "../Orders/Selectors";
import {isEmptyValue} from "../../Util/StringUtil";
import {selectPublicCourse} from "../SelectedPublicCourse/Actions";
import * as _ from "lodash";
import {sendDataToDatabase} from "../Firebase/Actions";
import {selectOrganization, sendSelectedOrganizationToDatabase} from "../SelectedOrganization/Actions";
import {hideRequiredFields, openDialog, openSnackbar} from "../Appearance/Actions";
import {getOrganizationById} from "../Organizations/Selectors";
import {getSelectedOrganization} from "../SelectedOrganization/Selectors";
import {getSelectedPublicCourse} from "../SelectedPublicCourse/Selectors";
import {IDispatch, IGetState, IState} from "../../Interfaces/ReduxInterfaces";
import {calculateDuration, calculateOrderStatus, ILectureTime, IPublicCourseParticipant, TabKey} from "@violet/common";
import * as firebase from "firebase";
import {updateObject} from "../../Util/ObjectUpdater";

export function selectOrder(orderId: number) {
    return function selectOrder(dispatch: IDispatch, getState: IGetState) {
        const order = getOrderById(getState(), orderId.toString());
        dispatch(selectOrganization(order.organizationId));

        if (!isEmptyValue(order, "publicCourseId")) {
            dispatch(selectPublicCourse(order.publicCourseId.toString()));
        }

        dispatch({
            type: SELECT_ORDER,
            payload: order
        });
    };
}

export function updateSelectedOrder(key: string, value: string | boolean | number | TabKey | ILectureTime[] | IPublicCourseParticipant[]) {
    return function updateSelectedOrder(dispatch: IDispatch, getState: IGetState) {
        let order = updateObject(getSelectedOrder(getState()), {
            [key]: value,
        });

        order.status = calculateOrderStatus(order, getSelectedPublicCourse(getState()));

        dispatch({
            type: UPDATE_SELECTED_ORDER,
            payload: order,
        });
    };
}

function getSelectedOrderLectureTimes(state: IState) {
    return _.cloneDeep(getSelectedOrder(state).lectureTimes);
}

function getSelectedOrderPublicCourseParticipants(state: IState) {
    return _.cloneDeep(getSelectedOrder(state).publicCourseParticipants);
}

export function updateLectureTime(key: string, value: string | boolean, lectureTimeIndex: number) {
    return function updateLectureTime(dispatch: IDispatch, getState: IGetState) {
        const allLectureTimes = getSelectedOrderLectureTimes(getState());
        const lectureTime = allLectureTimes[lectureTimeIndex];
        // @ts-ignore
        lectureTime[key] = value;
        lectureTime.duration = calculateDuration(allLectureTimes[lectureTimeIndex]);

        dispatch(updateSelectedOrder("lectureTimes", allLectureTimes));
    };
}

export function addNewLectureTime() {
    return function addNewLectureTime(dispatch: IDispatch, getState: IGetState) {
        const thisSelectedOrder = getSelectedOrder(getState());
        const lectureTimes = _.hasIn(thisSelectedOrder, "lectureTimes") ? getSelectedOrderLectureTimes(getState()) : [];
        lectureTimes.push({} as ILectureTime);

        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    };
}

export function deleteLectureTime(lectureTimeIndex: number) {
    return function addNewLectureTime(dispatch: IDispatch, getState: IGetState) {
        const lectureTimes = getSelectedOrderLectureTimes(getState());
        lectureTimes.splice(lectureTimeIndex, 1);

        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
    };
}

export function updatePublicCourseParticipant(key: string, value: string | number[] | boolean, participantIndex: number) {
    return function updatePublicCourseParticipant(dispatch: IDispatch, getState: IGetState) {
        const publicCourseParticipants = getSelectedOrderPublicCourseParticipants(getState());
        // @ts-ignore
        publicCourseParticipants[participantIndex][key] = value;
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    };
}

export function updatePublicCourseLectureParticipating(lectureId: number, isAttending: boolean, participantIndex: number) {
    return function updatePublicCourseLectureParticipating(dispatch: IDispatch, getState: IGetState) {
        const publicCourseParticipants = getSelectedOrderPublicCourseParticipants(getState());
        const participant = publicCourseParticipants[participantIndex];
        let lecturesAttending = _.hasIn(participant, "lecturesAttending") ? participant.lecturesAttending : [];
        if (isAttending) {
            lecturesAttending.push(lectureId);
            lecturesAttending.sort((a, b) => a - b);
        } else {
            lecturesAttending = _.without(lecturesAttending, lectureId);
        }

        publicCourseParticipants[participantIndex].lecturesAttending = lecturesAttending;
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    };
}

export function removeParticipantsFromAllLectures() {
    return function removeParticipantsFromAllLectures(dispatch: IDispatch, getState: IGetState) {
        if (isEmptyValue(getSelectedOrder(getState()), "publicCourseParticipants"))
            return;

        const publicCourseParticipants = getSelectedOrderPublicCourseParticipants(getState());
        for (const participant in publicCourseParticipants) {
            if (publicCourseParticipants[participant].lecturesAttending)
                publicCourseParticipants[participant].lecturesAttending = [];
        }
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    };
}

export function removeParticipant(participantId: number) {
    return function removeParticipant(dispatch: IDispatch, getState: IGetState) {
        const publicCourseParticipants = getSelectedOrderPublicCourseParticipants(getState());
        publicCourseParticipants.splice(participantId, 1);
        dispatch(updateSelectedOrder("publicCourseParticipants", publicCourseParticipants));
    };
}

export function setIsSelectedOrder() {
    return {
        type: SET_IS_SELECTED_ORDER,
    };
}

export function sendSelectedOrderToDatabase() {
    return async function sendSelectedOrderToDatabase(dispatch: IDispatch, getState: IGetState) {
        await dispatch(updateSelectedOrder("changedDate", new Date().toJSON()));
        const selectedOrder = getSelectedOrder(getState());

        return sendDataToDatabase("/orders/" + selectedOrder.id, selectedOrder);
    };
}

export function clearSelectedOrder() {
    return {
        type: CLEAR_SELECTED_ORDER,
    };
}

export function fillNewOrderMissingFields() {
    return function fillNewOrderMissingFields(dispatch: IDispatch, getState: IGetState) {
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
    };
}

export function saveNewOrder() {
    return async function saveNewOrder(dispatch: IDispatch, getState: IGetState) {
        await dispatch(fillNewOrderMissingFields());

        function success() {
            const snackbarMessage = "הזמנה מספר {0} נשמרה בהצלחה".replace("{0}", getSelectedOrder(getState()).id.toString());
            dispatch(openSnackbar(snackbarMessage));
            dispatch(setIsSelectedOrder());
        }

        function failure(error: firebase.auth.Error) {
            dispatch(openDialog("שגיאה בשמירת הזמנה", "חלה שגיאה בשמירת ההזמנה בשרת"));
            // eslint-disable-next-line no-console
            console.error(error);
        }

        dispatch(sendSelectedOrderToDatabase()).then(success, failure);

        dispatch(hideRequiredFields());

        // Check if there are changes in organization
        const selectedOrganization = getSelectedOrganization(getState());
        const savedOrganization = getOrganizationById(getState(), getSelectedOrder(getState()).organizationId.toString());
        if (!_.isEqual(selectedOrganization, savedOrganization)) {
            dispatch(sendSelectedOrganizationToDatabase());
        }
    };
}