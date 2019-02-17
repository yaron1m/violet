import {connect} from "react-redux";
import {
    sendSelectedOrganizationToDatabase
} from "../../../Store/SelectedOrganization/Actions";
import {getLabels} from "../../../Store/Labels/Selectors";
import {getNextOrganizationId} from "../../../Store/Organizations/Selectors";
import {openDialog, openSnackbar} from "../../../Store/Appearance/Actions";
import SaveActionButton from "../../../Components/ActionButtons/SaveActionButton";
import {getSelectedOrganization, isSelectedOrganization} from "../../../Store/SelectedOrganization/Selectors";
import {setIsSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import {IDispatch, IState} from "../../../Interfaces/ReduxInterfaces";
import {IStringObject} from "../../../Interfaces/IOrder";

function saveExistingOrganization(
    dialogText: IStringObject,
    snackBarText: IStringObject,
    selectedOrganizationName: string,
    isSelectedOrganization: boolean,
    nextOrganizationId: number,
    openDialog: (title: string, content: string) => void,
    openSnackbar: (message: string) => void,
    setIsSelectedOrganization: () => void,
    sendSelectedOrganizationToDatabase: () => Promise<void>
) {
    if (!isSelectedOrganization) {
        openDialog(
            dialogText.noOrganizationSelectedTitle,
            dialogText.noOrganizationSelectedContent);
        return;
    }
    const promise = sendSelectedOrganizationToDatabase();
    handleDatabasePromise(promise, dialogText, snackBarText, selectedOrganizationName, openDialog, openSnackbar, setIsSelectedOrganization);
}

function handleDatabasePromise(
    promise: Promise<void>,
    dialogText: IStringObject,
    snackBarText: IStringObject,
    selectedOrganizationName: string,
    openDialog: (title: string, content: string) => void,
    openSnackbar: (message: string) => void,
    setIsSelectedOrganization: () => void
) {
    promise.then(() => {
        const snackbarMessage = snackBarText.savedSuccessfully.replace("{0}", selectedOrganizationName);
        openSnackbar(snackbarMessage);
        setIsSelectedOrganization();
    }).catch(() => {
        openDialog(
            dialogText.sendingToDatabaseFailedTitle,
            dialogText.sendingToDatabaseFailedContent);
    });
}

function mapStateToProps(state: IState) {
    return {
        tooltip: getLabels(state).pages.organizationPage.actionButtons.save as string,
        dialogText: getLabels(state).pages.organizationPage.dialog as IStringObject,
        snackBarText: getLabels(state).pages.organizationPage.snackBar,
        selectedOrganizationName: getSelectedOrganization(state).organizationName,
        isSelectedOrganization: isSelectedOrganization(state),
        nextOrganizationId: getNextOrganizationId(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        openDialog: (title: string, content: string) => dispatch(openDialog(title, content)),
        openSnackbar: (message: string) => dispatch(openSnackbar(message)),
        setIsSelectedOrganization: () => dispatch(setIsSelectedOrganization()),
        sendSelectedOrganizationToDatabase: () => dispatch(sendSelectedOrganizationToDatabase()),
    };
}

function mergeProps(stateProps: {
    tooltip: string;
    dialogText: IStringObject;
    snackBarText: IStringObject;
    selectedOrganizationName: string;
    isSelectedOrganization: boolean;
    nextOrganizationId: number;
}, dispatchProps: {
    openDialog: (title: string, content: string) => void;
    openSnackbar: (message: string) => void;
    setIsSelectedOrganization: () => void;
    sendSelectedOrganizationToDatabase: () => Promise<void>;
}) {
    return {
        tooltip: stateProps.tooltip,
        onClick: () => saveExistingOrganization(
            stateProps.dialogText,
            stateProps.snackBarText,
            stateProps.selectedOrganizationName,
            stateProps.isSelectedOrganization,
            stateProps.nextOrganizationId,
            dispatchProps.openDialog,
            dispatchProps.openSnackbar,
            dispatchProps.setIsSelectedOrganization,
            dispatchProps.sendSelectedOrganizationToDatabase
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
