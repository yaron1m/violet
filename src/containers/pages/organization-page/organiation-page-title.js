import React from 'react';
import PageTitle from '../../../components/page-title';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddIcon from 'material-ui/svg-icons/content/add';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import {
    clearSelected, sendSelectedOrganizationToDatabase, setIsSelectedOrganization, updateSelectedOrganization
} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {getNextOrganizationId} from "../../../store/organizations/reducer";
import {getOrdersByOrganization} from "../../../store/orders/reducer";
import {getSelectedOrganization, isSelectedOrganization} from "../../../store/selected/reducer";
import {openDialog, openSnackbar} from "../../../store/appearance/actions";
import * as _ from "lodash";

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

    async saveNewOrganization() {
        if (this.props.isSelectedOrganization) {
            const dialogText = this.props.labels.dialog;
            this.props.dispatch(openDialog(dialogText.organizationAlreadySelectedTitle, dialogText.organizationAlreadySelectedContent));
            return;
        }

        //Check if only data in order is id and organization:
        if (_.isEmpty(this.props.selectedOrganization)) {
            const dialogText = this.props.labels.dialog;
            this.props.dispatch(openDialog(dialogText.noDataTitle, dialogText.noDataContent));
            return;
        }

        const newOrganizationId = this.props.nextOrganizationId;
        await this.props.dispatch(updateSelectedOrganization("id", newOrganizationId));
        const promise = this.props.dispatch(sendSelectedOrganizationToDatabase());
        this.handleDatabasePromise(promise);
    }

    handleDatabasePromise(promise) {
        function success() {
            const snackbarMessage = this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrganization.name);
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
            <PageTitle
                title={this.props.labels.title}
            >
                {/*save icon*/}
                <IconButton onClick={this.saveExistingOrganization.bind(this)}>
                    < SaveIcon/>
                </IconButton>

                {/*add icon*/}
                <IconButton onClick={this.saveNewOrganization.bind(this)}>
                    <AddIcon/>
                </IconButton>

                {/*clear icon*/}
                <IconButton onClick={() => this.props.dispatch(clearSelected())}>
                    <ClearIcon/>
                </IconButton>
            </PageTitle>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).OrganizationPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        OrderOfSelectedOrganization: getOrdersByOrganization(state),
        nextOrganizationId: getNextOrganizationId(state),
    };
}

export default connect(mapStateToProps)(OrganizationPageTitle);
