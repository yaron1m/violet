import {getSelectedOrganization} from "./Selectors";
import {changeImmutable} from "../../util/ObjectUpdater";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "./ActionTypes";
import {getNextOrganizationId, getOrganizationById} from "../organizations/Reducer";
import {sendDataToDatabase} from "../Firebase/Actions";
import {closeDialog} from "../Appearance/Actions";

export function selectOrganization(organizationId) {
    return function selectOrganization(dispatch, getState) {
        const organization = getOrganizationById(getState(), organizationId);
        dispatch({
            type: SELECT_ORGANIZATION,
            payload: organization
        })
    };
}

export function updateSelectedOrganization(key, value) {
    return function updateSelectedOrganization(dispatch, getState) {
        const selectedOrganization = changeImmutable(getSelectedOrganization(getState()), key, value);
        dispatch({
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: selectedOrganization,
        });
    }
}

export function setIsSelectedOrganization() {
    return {
        type: SET_IS_SELECTED_ORGANIZATION,
    }
}

export function sendSelectedOrganizationToDatabase() {
    return async function sendSelectedOrganizationToDatabase(dispatch, getState) {
        await dispatch(updateSelectedOrganization("changedDate", new Date().toJSON()));
        const selectedOrganization = getSelectedOrganization(getState());

        return sendDataToDatabase('/organizations/' + selectedOrganization.id, selectedOrganization);
    }
}

export function clearSelectedOrganization() {
    return {
        type: CLEAR_SELECTED_ORGANIZATION,
    }
}

export function saveNewOrganization() {
    return async function saveNewOrganization(dispatch, getState) {
        const newOrganizationId = getNextOrganizationId(getState());
        await dispatch(updateSelectedOrganization("id", newOrganizationId));

        await dispatch(sendSelectedOrganizationToDatabase())
        // eslint-disable-next-line no-console
        dispatch(setIsSelectedOrganization());
        dispatch(closeDialog());
    }
}