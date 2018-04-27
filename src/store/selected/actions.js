import * as actionTypes from './action-types';
import {getOrganizationById} from "../organizations/reducer";
import {getOrderById} from "../orders/selectors";
import {getSelectedOrder, getSelectedOrganization} from "./reducer";
import {sendDataToDatabase} from "../firebase/actions";
import * as Immutable from "seamless-immutable";
import calculateOrderStatus from '../../util/order-status'
import {calculateDuration} from "../../util/time-util";

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
        const lectureTimes = Immutable.asMutable(getSelectedOrder(getState()).lectureTimes, {deep: true});
        lectureTimes[lectureTimeIndex][key] = value;
        lectureTimes[lectureTimeIndex].duration = calculateDuration(lectureTimes[lectureTimeIndex]);
        dispatch(updateSelectedOrder("lectureTimes", lectureTimes));
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