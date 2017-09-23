import React from 'react';
import {connect} from 'react-redux';
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import CustomDialog from '../../../../components/custom-components/custom-dialog'
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
import {getNextOrderId} from "../../../../store/orders/reducer";
import * as _ from "lodash";
import {openDialog, openSnackbar} from "../../../../store/appearance/actions";
import {getOrderMissingFields} from "../../../../store/required-fields/reducer";
import {hideRequiredFields, showRequiredFields} from "../../../../store/required-fields/actions";
import {getNextOrganizationId, getOrganizations} from "../../../../store/organizations/reducer";

class SaveOrderButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }
    }

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
        if(!_.isEqual(this.props.selectedOrganization, this.props.organizations[this.props.selectedOrder.organizationId])){
            this.props.dispatch(sendSelectedOrganizationToDatabase());
        }

    }

    shouldSave() {
        const dialogText = this.props.labels.dialog;

        if (!this.props.isSelectedOrganization) {
            this.setState({dialogOpen: true});
            return false;
        }

        if (_.isEmpty(this.props.missingFields)) {
            return true;
        } else {
            //Not ready for saving - there are missing fields
            console.log(this.props.missingFields); //TODO remove later
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

    async saveNewOrganization() {
        const newOrganizationId = this.props.nextOrganizationId;
        await this.props.dispatch(updateSelectedOrganization("id", newOrganizationId));

        async function successSave(){
            await this.props.dispatch(setIsSelectedOrganization());
            this.saveOrder.bind(this)();
            this.setState({dialogOpen: false})
        }


        this.props.dispatch(sendSelectedOrganizationToDatabase())
            .then(successSave.bind(this))
            .catch((e) => console.error("error saving new organization - " + e)); //TODO prompt message to users
    }


    render() {
        const dialogText = this.props.labels.dialog;

        let actions = null;
        if(this.props.selectedOrganization.organizationName !== undefined){
            actions = [
                <FlatButton
                    label={dialogText.newOrganization}
                    primary={true}
                    onTouchTap={this.saveNewOrganization.bind(this)}
                />,
                <FlatButton
                    label={dialogText.existingOrganization}
                    primary={true}
                    onTouchTap={() => {
                        this.setState({dialogOpen: false});
                    }}
                />,
            ];
        }

        return (
            <IconButton onClick={this.saveOrder.bind(this)} tooltip={this.props.labels.actionButtons.save}>
                <SaveIcon/>


                <CustomDialog
                    open={this.state.dialogOpen}
                    title={dialogText.noOrganizationSelectedTitle}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                    actions={actions}
                >
                    {this.props.selectedOrganization.organizationName === undefined ?
                        dialogText.noOrganizationSelectedContent :
                        dialogText.unrecognizedOrganization.replace("{0}", this.props.selectedOrganization.organizationName)}

                </CustomDialog>
            </IconButton>
        );
    }
}


function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage,
        organizations: getOrganizations(state),
        selectedOrganization: getSelectedOrganization(state),
        isSelectedOrganization: isSelectedOrganization(state),
        selectedOrder: getSelectedOrder(state),
        isSelectedOrder: isSelectedOrder(state),
        nextOrderId: getNextOrderId(state),
        nextOrganizationId: getNextOrganizationId(state),
        missingFields: getOrderMissingFields(state),
    };
}

export default connect(mapStateToProps)(SaveOrderButton);
