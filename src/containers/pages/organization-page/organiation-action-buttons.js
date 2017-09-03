import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import {
    clearSelected, sendSelectedOrganizationToDatabase, setIsSelectedOrganization
} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getNextOrganizationId} from "../../../store/organizations/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../../store/selected/reducer";
import {openDialog, openSnackbar} from "../../../store/appearance/actions";
import {ActionButtonsBox} from "../../../components/action-buttons-box";

class OrganizationPageTitle extends React.Component {

    saveExistingOrganization() {
        if (!this.props.isSelectedOrganization) {
            const dialogText = this.props.labels.dialog;
            this.props.dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogText.noOrganizationSelectedContent));
            return;
        }
        const promise = this.props.dispatch(sendSelectedOrganizationToDatabase());
        this.handleDatabasePromise(promise);
    }

    handleDatabasePromise(promise) {
        function success() {
            const snackbarMessage = this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.organizationName);
            this.props.dispatch(openSnackbar(snackbarMessage));
            this.props.dispatch(setIsSelectedOrganization());
        }

        function failure(error) {
            const dialogText = this.props.labels.dialog;
            this.props.dispatch(openDialog(dialogText.sendingToDatabaseFailedTitle, dialogText.sendingToDatabaseFailedContent));
            console.error(error);
        }

        promise.then(success.bind(this), failure.bind(this));
        return promise;
    }

    render() {
        return (
            <ActionButtonsBox>
                {/*save icon*/}
                <IconButton onClick={this.saveExistingOrganization.bind(this)}>
                    < SaveIcon/>
                </IconButton>

                {/*clear icon*/}
                <IconButton onClick={() => this.props.dispatch(clearSelected())}>
                    <RefreshIcon/>
                </IconButton>
            </ActionButtonsBox>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        nextOrganizationId: getNextOrganizationId(state),
    };
}

export default connect(mapStateToProps)(OrganizationPageTitle);
