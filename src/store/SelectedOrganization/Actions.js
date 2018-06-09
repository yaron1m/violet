import {getSelectedOrganization} from "./Selectors";
import {changeImmutable} from "../../util/ObjectUpdater";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "./ActionTypes";
import {getNextOrganizationId, getOrganizationById} from "../organizations/reducer";
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

//TODO missing test
export function saveNewOrganization() {
    return async function saveNewOrganization(dispatch, getState) {
        const newOrganizationId = getNextOrganizationId(getState());
        await dispatch(updateSelectedOrganization("id", newOrganizationId));

        async function successSave() {
            dispatch(setIsSelectedOrganization());
            dispatch(closeDialog());
        }

        dispatch(sendSelectedOrganizationToDatabase())
            .then(successSave)
            // eslint-disable-next-line no-console
            .catch((e) => console.error("error saving new organization - " + e)); //TODO prompt message to users
    }
}