import React from 'react';
import {connect} from 'react-redux';
import PageTitle from "../../../components/page-title";
import IconButton from "material-ui/IconButton";
import ClearIcon from 'material-ui/svg-icons/content/clear';
import PrintIcon from 'material-ui/svg-icons/action/print';
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

class OrderPageTitle extends React.Component {

    async saveOrder() {
        if (!this.props.isSelectedOrganization) {
            const dialogText = this.props.labels.dialog;
            this.props.dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogText.noOrganizationSelectedContent));
            return;
        }
        if (!this.props.isSelectedOrder) {
            //Check if only data in order is id and organization:
            if (_.isEmpty(this.props.selectedOrder)) {
                const dialogText = this.props.labels.dialog;
                this.props.dispatch(openDialog(dialogText.noDataTitle, dialogText.noDataContent));
                return;
            }
            await this.props.dispatch(updateSelectedOrder("id", this.props.nextOrderId));
            await this.props.dispatch(updateSelectedOrder("organizationId", this.props.selectedOrganization.id));
        }
        const promise = this.props.dispatch(sendSelectedOrderToDatabase());
        this.handleDatabasePromise(promise);
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
        const pageTitle = this.props.labels.title +
            (this.props.isSelectedOrder ? this.props.labels.orderNumberTitle + this.props.selectedOrder.id : this.props.labels.newOrderTitle);

        return (
            <PageTitle title={pageTitle}>

                <IconButton onClick={this.saveOrder.bind(this)}>
                    <SaveIcon/>
                </IconButton>

                <IconButton><PrintIcon/></IconButton>

                <IconButton>
                    <ClearIcon onClick={() => this.props.dispatch(clearSelectedOrder())}/>
                </IconButton>
            </PageTitle>
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
    };
}

export default connect(mapStateToProps)(OrderPageTitle);
