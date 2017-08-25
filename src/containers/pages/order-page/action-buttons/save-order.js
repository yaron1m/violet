import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui/svg-icons/content/save';
import { sendSelectedOrderToDatabase, setIsSelectedOrder,
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
        const dialogText = this.props.labels.dialog;
        if (!this.props.isSelectedOrganization) {
            this.props.dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogText.noOrganizationSelectedContent));
            return;
        }
        if (!this.props.isSelectedOrder) {
            //Check if only data in order is id and organization:
            if (_.isEmpty(this.props.selectedOrder)) {
                this.props.dispatch(openDialog(dialogText.noDataTitle, dialogText.noDataContent));
                return;
            }
        }
        const missingFields = this.props.missingFields;

        const shouldSave = _.isEmpty(missingFields);

        if (shouldSave) {
            // Ready for saving
            if(!this.props.selectedOrder.hasOwnProperty("id"))
                await this.props.dispatch(updateSelectedOrder("id", this.props.nextOrderId));
            await this.props.dispatch(updateSelectedOrder("organizationId", this.props.selectedOrganization.id));
            const promise = this.props.dispatch(sendSelectedOrderToDatabase());
            this.handleDatabasePromise(promise);
            this.props.dispatch(hideRequiredFields());

        } else {
            //Not ready for saving - there are missing fields
            await this.props.dispatch(showRequiredFields());
            let dialogContent = dialogText.missingFieldsContent;
            for (let i = 0; i < missingFields.length; i++) {
                dialogContent += missingFields[i] + " ";
            }
            this.props.dispatch(openDialog(dialogText.missingFieldsTitle, dialogContent));
            return;
        }
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
