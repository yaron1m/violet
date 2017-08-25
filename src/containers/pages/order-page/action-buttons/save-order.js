import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import {
    sendSelectedOrderToDatabase, setIsSelectedOrder,
    updateSelectedOrder
} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {
    getSelectedOrder, getSelectedOrganization, isSelectedOrder,
    isSelectedOrganization
} from "../../../../store/selected/reducer";
import {getNextOrderId} from "../../../../store/orders/reducer";
import * as _ from "lodash";
import {openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {getOrderMissingFields} from "../../../../store/required-fields/reducer";
import {hideRequiredFields, showRequiredFields} from "../../../../store/required-fields/actions";

class SaveOrderButton extends React.Component {


    async saveOrder() {
        if (!this.shouldSave.bind(this)())
            return;

        await this.fillMissingFields.bind(this)();

        const promise = this.props.dispatch(sendSelectedOrderToDatabase());
        this.handleDatabasePromise(promise);
        this.props.dispatch(hideRequiredFields());

    }

    shouldSave() {
        const dialogText = this.props.labels.dialog;

        if (!this.props.isSelectedOrganization) {
            this.props.dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogText.noOrganizationSelectedContent));
            return false;
        }

        if (_.isEmpty(this.props.missingFields)) {
            return true;
        } else {
            //Not ready for saving - there are missing fields
            this.props.dispatch(showRequiredFields());
            this.props.dispatch(openDialog(dialogText.missingFieldsTitle, dialogText.missingFieldsContent));
            return false;
        }
    }

    async fillMissingFields() {
        let idPromise;
        let organizationIdPromise;
        if (!this.props.selectedOrder.hasOwnProperty("id"))
            idPromise = this.props.dispatch(updateSelectedOrder("id", this.props.nextOrderId));

        if (!this.props.selectedOrder.hasOwnProperty("organizationId"))
            organizationIdPromise = this.props.dispatch(updateSelectedOrder("organizationId", this.props.selectedOrganization.id));

        return Promise.all([idPromise, organizationIdPromise]);
    }

    handleDatabasePromise(promise) {
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

        promise.then(success.bind(this), failure.bind(this));
        return promise;
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
        labels: getLabels(state).orderPage,
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        nextOrderId: getNextOrderId(state),
        missingFields: getOrderMissingFields(state),
    };
}

export default connect(mapStateToProps)(SaveOrderButton);
