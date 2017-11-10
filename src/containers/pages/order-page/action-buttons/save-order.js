import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import SaveIcon from 'material-ui-icons/Save';
import {
    sendSelectedOrderToDatabase, sendSelectedOrganizationToDatabase, setIsSelectedOrder, setIsSelectedOrganization,
    updateSelectedOrder, updateSelectedOrganization
} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {
    getSelectedOrder, getSelectedOrganization, isSelectedOrder,
    isSelectedOrganization
} from "../../../../store/selected/reducer";
import {getNextOrderId} from "../../../../store/orders/selectors";
import * as _ from "lodash";
import {closeDialog, openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {getOrderMissingFields} from "../../../../store/required-fields/reducer";
import {hideRequiredFields, showRequiredFields} from "../../../../store/required-fields/actions";
import {getNextOrganizationId, getOrganizations} from "../../../../store/organizations/reducer";
import {isEmptyValue} from "../../../../util/string-util";

export class SaveOrderButton extends React.Component {

    async saveOrder() {
        if (!this.shouldSave.bind(this)())
            return;

        await this.fillMissingFields.bind(this)();

        function success() {
            const snackbarMessage = this.props.labels.snackBar.savedSuccessfully.replace("{0}", this.props.selectedOrder.id);
            this.props.dispatch(openSnackbar(snackbarMessage));
            this.props.dispatch(setIsSelectedOrder());
        }

        function failure(error) {
            const dialogText = this.props.labels.dialog;
            this.props.dispatch(openDialog(dialogText.sendingToDatabaseFailedTitle, dialogText.sendingToDatabaseFailedContent));
            console.error(error);
        }

        this.props.dispatch(sendSelectedOrderToDatabase())
            .then(success.bind(this), failure.bind(this));

        this.props.dispatch(hideRequiredFields());

        //Check if there are changes in organization
        if (!_.isEqual(this.props.selectedOrganization, this.props.organizations[this.props.selectedOrder.organizationId])) {
            this.props.dispatch(sendSelectedOrganizationToDatabase());
        }
    }

    shouldSave() {
        const dialogText = this.props.labels.dialog;

        if (!this.props.isSelectedOrganization) {
            const dialogContent = isEmptyValue(this.props.selectedOrganization, "organizationName") ?
                dialogText.noOrganizationSelectedContent :
                dialogText.unrecognizedOrganization.replace("{0}", this.props.selectedOrganization.organizationName);
            this.props.dispatch(
                openDialog(dialogText.noOrganizationSelectedTitle, dialogContent, this.getOrganizationDialogActions.bind(this)()));
            return false;
        }

        if (_.isEmpty(this.props.orderMissingFields)) {
            return true;
        } else {
            //Not ready for saving - there are missing fields
            this.props.dispatch(showRequiredFields());
            this.props.dispatch(openDialog(dialogText.missingFieldsTitle, dialogText.missingFieldsContent));
            return false;
        }
    }

    getOrganizationDialogActions() {
        if (isEmptyValue(this.props.selectedOrganization, "organizationName"))
            return null;

        return [
            <FlatButton
                label={this.props.labels.dialog.newOrganization}
                primary={true}
                onTouchTap={() => {
                    this.saveNewOrganization.bind(this)()
                }}
            />,
            <FlatButton
                label={this.props.labels.dialog.existingOrganization}
                primary={true}
                onTouchTap={() => {
                    this.props.dispatch(closeDialog());
                }}
            />,
        ];
    }

    async fillMissingFields() {
        let idPromise;
        let createdPromise;
        let organizationIdPromise;
        if (!this.props.selectedOrder.hasOwnProperty("id")) {
            idPromise = this.props.dispatch(updateSelectedOrder("id", this.props.nextOrderId));
            createdPromise = this.props.dispatch(updateSelectedOrder("createdDate", new Date().toJSON()));
        }

        if (!this.props.selectedOrder.hasOwnProperty("organizationId"))
            organizationIdPromise = this.props.dispatch(updateSelectedOrder("organizationId", this.props.selectedOrganization.id));

        return Promise.all([idPromise, organizationIdPromise, createdPromise]);
    }

    async saveNewOrganization() {
        const newOrganizationId = this.props.nextOrganizationId;
        await this.props.dispatch(updateSelectedOrganization("id", newOrganizationId));

        async function successSave() {
            await this.props.dispatch(setIsSelectedOrganization());
            this.saveOrder.bind(this)();
            this.props.dispatch(closeDialog());
        }

        this.props.dispatch(sendSelectedOrganizationToDatabase())
            .then(successSave.bind(this))
            .catch((e) => console.error("error saving new organization - " + e)); //TODO prompt message to users
    }

    render() {
        return (
            <IconButton onClick={this.saveOrder.bind(this)} tooltip={this.props.labels.actionButtons.save}>
                <SaveIcon/>
            </IconButton>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage,
        organizations: getOrganizations(state),
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        nextOrderId: getNextOrderId(state),
        nextOrganizationId: getNextOrganizationId(state),
        orderMissingFields: getOrderMissingFields(state),
    };
}

export default connect(mapStateToProps)(SaveOrderButton);
