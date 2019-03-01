import {connect} from "react-redux";
import {sendSelectedOrganizationToDatabase, setIsSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import {getNextOrganizationId} from "../../../Store/Organizations/Selectors";
import {openDialog, openSnackbar} from "../../../Store/Appearance/Actions";
import SaveActionButton from "../../../Components/ActionButtons/SaveActionButton";
import {getSelectedOrganization, isSelectedOrganization} from "../../../Store/SelectedOrganization/Selectors";
import {IDispatch, IState} from "../../../Interfaces/ReduxInterfaces";

function saveExistingOrganization(
    selectedOrganizationName: string,
    isSelectedOrganization: boolean,
    nextOrganizationId: number,
    openDialog: (title: string, content: string) => void,
    openSnackbar: (message: string) => void,
    setIsSelectedOrganization: () => void,
    sendSelectedOrganizationToDatabase: () => Promise<void>
) {
    if (!isSelectedOrganization) {
        openDialog("לא נבחר ארגון", "עדכון פרטי ארגון אפשרי רק עבור ארגונים קיימים, נסה לשמור ארגון חדש");
        return;
    }
    const promise = sendSelectedOrganizationToDatabase();
    handleDatabasePromise(promise, selectedOrganizationName, openDialog, openSnackbar, setIsSelectedOrganization);
}

function handleDatabasePromise(
    promise: Promise<void>,
    selectedOrganizationName: string,
    openDialog: (title: string, content: string) => void,
    openSnackbar: (message: string) => void,
    setIsSelectedOrganization: () => void
) {
    promise.then(() => {
        const snackbarMessage = `ארגון "${selectedOrganizationName}" נשמר בהצלחה`;
        openSnackbar(snackbarMessage);
        setIsSelectedOrganization();
    }).catch(() => {
        openDialog("שגיאה בשמירת פרטי ארגון", "חלה שגיאה בשמירת פרטי הארגון בשרת");
    });
}

function mapStateToProps(state: IState) {
    return {
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
        tooltip: "שמור ארגון",
        onClick: () => saveExistingOrganization(
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
