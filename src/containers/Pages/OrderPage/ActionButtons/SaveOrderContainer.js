/*eslint no-console: ["error", { allow: ["error"] }] */

import React from 'react';
import {connect} from 'react-redux';
import FlatButton from "material-ui/FlatButton";
import {
    sendSelectedOrderToDatabase, sendSelectedOrganizationToDatabase, setIsSelectedOrder, setIsSelectedOrganization,
    updateSelectedOrder, updateSelectedOrganization
} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization, isSelectedOrganization} from "../../../../store/selected/reducer";
import {getNextOrderId} from "../../../../store/orders/selectors";
import * as _ from "lodash";
import {closeDialog, openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {isOrderMissingFields} from "../../../../store/appearance/RequiredFields/RequiredFieldsSelectors";
import {hideRequiredFields, showRequiredFields} from "../../../../store/appearance/actions";
import {getNextOrganizationId, getOrganizationById} from "../../../../store/organizations/reducer";
import {isEmptyValue} from "../../../../util/string-util";
import {SaveActionButton} from "../../../../components/ActionButtons/SaveActionButton";

export async function saveOrder(state, dispatch) {
    if (!shouldSave(state, dispatch))
        return;

    await fillMissingFields(state, dispatch);

    function success() {
        const snackbarMessage = getLabels(state).pages.orderPage.snackBar.savedSuccessfully.replace("{0}", getSelectedOrder(state).id);
        dispatch(openSnackbar(snackbarMessage));
        dispatch(setIsSelectedOrder());
    }

    function failure(error) {
        const dialogText = getLabels(state).pages.orderPage.dialog;
        dispatch(openDialog(dialogText.sendingToDatabaseFailedTitle, dialogText.sendingToDatabaseFailedContent));
        console.error(error);
    }

    dispatch(sendSelectedOrderToDatabase()).then(success, failure);

    dispatch(hideRequiredFields());

    //Check if there are changes in organization
    if (!_.isEqual(getSelectedOrganization(state), getOrganizationById(state, getSelectedOrder(state).organizationId))) {
        dispatch(sendSelectedOrganizationToDatabase());
    }
}

export function shouldSave(state, dispatch) {
    const dialogText = getLabels(state).pages.orderPage.dialog;

    if (!isSelectedOrganization(state)) {
        const dialogContent = isEmptyValue(getSelectedOrganization(state), "organizationName") ?
            dialogText.noOrganizationSelectedContent :
            dialogText.unrecognizedOrganization.replace("{0}", getSelectedOrganization(state).organizationName);
        dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogContent, getOrganizationDialogActions(state, dispatch)));
        return false;
    }

    if (isOrderMissingFields(state)) {
        //Not ready for saving - there are missing fields
        dispatch(showRequiredFields());
        dispatch(openDialog(dialogText.missingFieldsTitle, dialogText.missingFieldsContent));
        return false;
    }

    return true;
}

function getOrganizationDialogActions(state, dispatch) {
    if (isEmptyValue(getSelectedOrganization(state), "organizationName"))
        return null;

    const dialogLabels = getLabels(state).pages.orderPage.dialog;

    return [
        <FlatButton
            key={dialogLabels.newOrganization}
            label={dialogLabels.newOrganization}
            primary={true}
            onClick={() => saveNewOrganization(state, dispatch)}
        />,
        <FlatButton
            key={dialogLabels.existingOrganization}
            label={dialogLabels.existingOrganization}
            primary={true}
            onClick={() => dispatch(closeDialog())}
        />,
    ];
}

async function fillMissingFields(state, dispatch) {
    let idPromise;
    let createdPromise;
    let organizationIdPromise;
    if (!getSelectedOrder(state).hasOwnProperty("id")) {
        idPromise = dispatch(updateSelectedOrder("id", getNextOrderId(state)));
        createdPromise = dispatch(updateSelectedOrder("createdDate", new Date().toJSON()));
    }

    if (!getSelectedOrder(state).hasOwnProperty("organizationId"))
        organizationIdPromise = dispatch(updateSelectedOrder("organizationId", getSelectedOrganization(state).id));

    return Promise.all([idPromise, organizationIdPromise, createdPromise]);
}

async function saveNewOrganization(state, dispatch) {
    const newOrganizationId = getNextOrganizationId(state);
    await dispatch(updateSelectedOrganization("id", newOrganizationId));

    async function successSave() {
        await dispatch(setIsSelectedOrganization());
        await saveOrder(state, dispatch);
        dispatch(closeDialog());
    }

    dispatch(sendSelectedOrganizationToDatabase())
        .then(successSave)
        .catch((e) => console.error("error saving new organization - " + e)); //TODO prompt message to users
}


function mapStateToProps(state) {
    return {
        tooltip: getLabels(state).pages.orderPage.actionButtons.save,
        state, //TODO - avoid passing state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: (title, content) => dispatch(openDialog(title, content)),
        dispatch,
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        tooltip: stateProps.tooltip,
        onClick: () => saveOrder(stateProps.state, dispatchProps.dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
