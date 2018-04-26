import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import {
    sendSelectedOrganizationToDatabase, setIsSelectedOrganization
} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {getNextOrganizationId} from "../../../../store/organizations/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../../../store/selected/reducer";
import {openDialog, openSnackbar} from "../../../../store/appearance/actions";
import SaveIcon from 'material-ui-icons/Save';

function saveExistingOrganization(stateProps, dispatchProps) {
    if (!stateProps.isSelectedOrganization) {
        dispatchProps.openDialog(
            stateProps.dialogText.noOrganizationSelectedTitle,
            stateProps.dialogText.noOrganizationSelectedContent);
        return;
    }
    const promise = dispatchProps.sendSelectedOrganizationToDatabase();
    handleDatabasePromise(promise, stateProps, dispatchProps);
}

function  handleDatabasePromise(promise, stateProps, dispatchProps) {
    function success() {
        const snackbarMessage = stateProps.snackBarText.savedSuccessfully.replace("{0}", stateProps.selectedOrganizationName);
        dispatchProps.openSnackbar(snackbarMessage);
        dispatchProps.setIsSelectedOrganization();
    }

    function failure() {
        dispatchProps.openDialog(
            stateProps.dialogText.sendingToDatabaseFailedTitle,
            stateProps.dialogText.sendingToDatabaseFailedContent);
    }

    promise.then(success, failure);
    return promise;
}


function mapStateToProps(state) {
    return {
        dialogText: getLabels(state).pages.organizationPage.dialog,
        snackBarText: getLabels(state).pages.organizationPage.snackBar,
        selectedOrganizationName: getSelectedOrganization(state).organizationName,
        isSelectedOrganization: isSelectedOrganization(state),
        nextOrganizationId: getNextOrganizationId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: (title, content) => dispatch(openDialog(title, content)),
        openSnackbar: (message) => dispatch(openSnackbar(message)),
        setIsSelectedOrganization: () => dispatch(setIsSelectedOrganization()),
        sendSelectedOrganizationToDatabase: () => dispatch(sendSelectedOrganizationToDatabase()),
    };
}

function mergeProps(stateProps, dispatchProps) {
    return {
        onClick: () => saveExistingOrganization(stateProps, dispatchProps),
        children: <SaveIcon/>,
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IconButton);
