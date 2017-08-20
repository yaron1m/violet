import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import CleanIcon from 'material-ui/svg-icons/action/autorenew';
import SendIcon from 'material-ui/svg-icons/content/drafts';
import SaveIcon from 'material-ui/svg-icons/content/save';
import {
    clearSelectedOrder, sendSelectedOrderToDatabase, setIsSelectedOrder,
    updateSelectedOrder
} from "../../../store/selected/actions";
import {getLabels} from "../../../store/labels/reducer";
import {
    getSelectedOrder, getSelectedOrganization, isSelectedOrder,
    isSelectedOrganization
} from "../../../store/selected/reducer";
import {getNextOrderId} from "../../../store/orders/reducer";
import * as _ from "lodash";
import {openDialog, openSnackbar} from "../../../store/appearance/actions";
import {ActionButtonsBox} from "../../../components/action-buttons-box";
import {getOrderMissingFields} from "../../../store/required-fields/reducer";
import {hideRequiredFields, showRequiredFields} from "../../../store/required-fields/actions";

class OrderActionButtons extends React.Component {

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
            await this.props.dispatch(updateSelectedOrder("id", this.props.nextOrderId));
            await this.props.dispatch(updateSelectedOrder("organizationId", this.props.selectedOrganization.id));
        }
        const missingFields = this.props.missingFields;

        if (_.isEmpty(missingFields)) {
            const promise = this.props.dispatch(sendSelectedOrderToDatabase());
            this.handleDatabasePromise(promise);
            await this.props.dispatch(hideRequiredFields());
        } else {
            await this.props.dispatch(showRequiredFields());
            let dialogContent = dialogText.missingFieldsContent;
            for (let i = 0; i < missingFields.length; i++) {
                dialogContent += missingFields[i] + " ";
            }
            this.props.dispatch(openDialog(dialogText.missingFieldsTitle, dialogContent));
            return;
        }

    }

    orderEmailHref() {
        let href = "violet:";
        href += OrderActionButtons.parameter("id", this.props.selectedOrder.id, true);
        href += OrderActionButtons.parameter("topic", OrderActionButtons.arrayToParameterValue(["ISO-14001", "חשיבה יצירתית"])); //TODO get info
        href += OrderActionButtons.parameter("email", this.props.selectedOrder.contactEmail);
        href += OrderActionButtons.parameter("organizationName", this.props.selectedOrganization.organizationName);
        href += OrderActionButtons.parameter("contactFirstName", this.props.selectedOrder.contactFirstName);
        href += OrderActionButtons.parameter("contactLastName", this.props.selectedOrder.contactLastName);
        href += OrderActionButtons.parameter("contactPhone1", this.props.selectedOrder.contactPhone1);
        href += OrderActionButtons.parameter("contactPhone2", this.props.selectedOrder.contactPhone2);
        href += OrderActionButtons.parameter("orderCreationDate", new Date().toJSON());
        return href;
    }

    static parameter(key, value, first = false) {
        if (value === undefined || value === null)
            return "";
        return (first ? "" : "&") + key + "=" + value;
    }

    static arrayToParameterValue(array) {
        let res = "";
        for (let index in array) {
            res += array[index] + "#";
        }

        return res.substr(0, res.length - 1);
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

        const emailHref = this.props.isSelectedOrder ? this.orderEmailHref.bind(this)() : null;

        return (
            <ActionButtonsBox>
                <IconButton onClick={this.saveOrder.bind(this)}>
                    <SaveIcon/>
                </IconButton>

                <IconButton>
                    <a href={emailHref}>
                        <SendIcon/>
                    </a>
                </IconButton>

                <IconButton onClick={() => this.props.dispatch(clearSelectedOrder())}>
                    <CleanIcon/>
                </IconButton>
            </ActionButtonsBox>

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

export default connect(mapStateToProps)(OrderActionButtons);
