import * as actionTypes from './action-types';
import {getOrganizationById} from "../organizations/reducer";
import {getOrderById} from "../orders/reducer";
import {getSelectedOrder, getSelectedOrganization} from "./reducer";
import {sendDataToDatabase} from "../firebase/actions";
import * as Immutable from "seamless-immutable";

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
        const selectedOrganization = Immutable.merge(getSelectedOrganization(getState()), {
            [key]: value
        });
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
        const selectedOrganization = getSelectedOrganization(getState());

        return sendDataToDatabase('/organizations/' + selectedOrganization.id, selectedOrganization);
    }
}

// Orders:

export function selectOrder(orderId) {
    return async function selectOrganization(dispatch, getState) {
        const order = getOrderById(getState(), orderId);
        dispatch({
            type: actionTypes.SELECT_ORDER,
            payload: order
        })
    };
}

export function updateSelectedOrder(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const selectedOrder = Immutable.merge(getSelectedOrder(getState()), {
            [key]: value
        });
        dispatch({
            type: actionTypes.UPDATE_SELECTED_ORDER,
            payload: selectedOrder,
        });
    }
}

export function getUpdateSelectedLectureTimeAction(lectureTimeIndex) {
    return function updateSelectedOrder(key, value) {
        return function updateSelectedOrganization(dispatch, getState) {
            const selectedOrder = getSelectedOrder(getState());
            const selectedOrderLectureTimesArray = Immutable.asMutable(selectedOrder.lectureTimes, {deep:true});
            selectedOrderLectureTimesArray[lectureTimeIndex][key] = value;
            const updatedSelectedOrder = Immutable.merge(selectedOrder, {
                lectureTimes: selectedOrderLectureTimesArray
            });
            dispatch({
                type: actionTypes.UPDATE_SELECTED_ORDER,
                payload: updatedSelectedOrder,
            });
        }
    }
}

export function setIsSelectedOrder() {
    return {
        type: actionTypes.SET_IS_SELECTED_ORDER,
    }
}

export function sendSelectedOrderToDatabase() {
    return async function sendSelectedOrderToDatabase(dispatch, getState) {
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