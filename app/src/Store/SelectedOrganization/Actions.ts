import {getSelectedOrganization} from "./Selectors";
import {
    CLEAR_SELECTED_ORGANIZATION,
    SELECT_ORGANIZATION,
    SET_IS_SELECTED_ORGANIZATION,
    UPDATE_SELECTED_ORGANIZATION
} from "./ActionTypes";
import {getNextOrganizationId, getOrganizationById} from "../Organizations/Selectors";
import {sendDataToDatabase} from "../Firebase/Actions";
import {closeDialog} from "../Appearance/Actions";
import {IDispatch, IGetState} from "../../Interfaces/ReduxInterfaces";
import {updateObject} from "../../Util/ObjectUpdater";

export function selectOrganization(organizationId: number) {
    return function selectOrganization(dispatch: IDispatch, getState: IGetState) {
        const organization = getOrganizationById(getState(), organizationId.toString());
        dispatch({
            type: SELECT_ORGANIZATION,
            payload: organization
        });
    };
}

export function updateSelectedOrganization(key: string, value: string | number | boolean) {
    return function updateSelectedOrganization(dispatch: IDispatch, getState: IGetState) {
        let selectedOrganization = updateObject(getSelectedOrganization(getState()), {
            [key]: value
        });
        dispatch({
            type: UPDATE_SELECTED_ORGANIZATION,
            payload: selectedOrganization,
        });
    };
}

export function setIsSelectedOrganization() {
    return {
        type: SET_IS_SELECTED_ORGANIZATION,
    };
}

export function sendSelectedOrganizationToDatabase() {
    return function sendSelectedOrganizationToDatabase(dispatch: IDispatch, getState: IGetState) {
        dispatch(updateSelectedOrganization("changedDate", new Date().toJSON()));
        const selectedOrganization = getSelectedOrganization(getState());

        return sendDataToDatabase("/organizations/" + selectedOrganization.id, selectedOrganization);
    };
}

export function clearSelectedOrganization() {
    return {
        type: CLEAR_SELECTED_ORGANIZATION,
    };
}

export function saveNewOrganization() {
    return async function saveNewOrganization(dispatch: IDispatch, getState: IGetState) {
        const newOrganizationId = getNextOrganizationId(getState());
        await dispatch(updateSelectedOrganization("id", newOrganizationId));

        await dispatch(sendSelectedOrganizationToDatabase());
        dispatch(setIsSelectedOrganization());
        dispatch(closeDialog());
    };
}