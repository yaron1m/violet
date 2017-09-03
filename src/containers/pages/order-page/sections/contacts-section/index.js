import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getSelectedOrder, isSelectedOrganization} from "../../../../../store/selected/reducer";
import Divider from "material-ui/Divider";
import IconButton from "material-ui/IconButton";
import PersonIcon from 'material-ui/svg-icons/social/person';
import ImportContactsDialog from './import-contacts-dialog';
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {openDialog} from "../../../../../store/appearance/actions";

class ContactsSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            isFinancialContacts: false,
        }
    }

    openContactImportDialog(isFinancialContact) {
        if (!this.props.isSelectedOrganization) {
            const dialogText = this.props.labels.importContactsDialog;
            this.props.dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogText.noOrganizationSelectedContent));
            return;
        }

        this.setState({
            dialogOpen:true,
            isFinancialContacts: isFinancialContact,
        });
    }

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        return (
            <CustomPaper title={this.props.labels.sectionName}>
                <ImportContactsDialog
                    dialogOpen={this.state.dialogOpen}
                    isFinancialContacts={this.state.isFinancialContacts}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                />

                <IconButton
                    onClick={() => this.openContactImportDialog.bind(this)(false)}
                    tooltip={this.props.labels.importContactsDialog.buttonTooltip}
                    style={{marginBottom: 10, marginRight: 10}}
                >
                    <PersonIcon/>
                </IconButton>

                <CustomText data={fieldData} name="contactFirstName" size="M"/>
                <CustomText data={fieldData} name="contactLastName" size="M"/>
                <CustomText data={fieldData} name="contactPhone1" size="M"/>
                <CustomText data={fieldData} name="contactEmail" size="XL"/>
                <CustomText data={fieldData} name="contactPhone2" size="M"/>
                <CustomText data={fieldData} name="contactPhoneExtension" size="M"/>
                <CustomText data={fieldData} name="contactFax" size="M"/>
                <CustomText data={fieldData} name="contactJob" size="M"/>

                <Divider style={{marginTop: 10, marginBottom: 10}}/>

                <div>{this.props.labels.financialContactTitle}</div>

                <IconButton
                    onClick={() => this.openContactImportDialog.bind(this)(true)}
                    tooltip={this.props.labels.importContactsDialog.buttonTooltip}
                    style={{marginBottom: 10, marginRight: 10}}
                >
                    <PersonIcon/>
                </IconButton>

                <CustomText data={fieldData} name="financialContactFirstName" size="M"/>
                <CustomText data={fieldData} name="financialContactLastName" size="M"/>
                <CustomText data={fieldData} name="financialContactPhone1" size="M"/>
                <CustomText data={fieldData} name="financialContactEmail" size="XL"/>
                <CustomText data={fieldData} name="financialContactPhone2" size="M"/>
                <CustomText data={fieldData} name="financialContactPhoneExtension" size="M"/>
                <CustomText data={fieldData} name="financialContactFax" size="M"/>
                <CustomText data={fieldData} name="financialContactJob" size="M"/>

            </CustomPaper>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.contactsSection,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrganization: isSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(ContactsSection);


