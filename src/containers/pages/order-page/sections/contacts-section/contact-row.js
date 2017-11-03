import React from 'react';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getSelectedOrder, isSelectedOrganization} from "../../../../../store/selected/reducer";
import PropTypes from 'prop-types';
import IconButton from "material-ui/IconButton";
import PersonAddIcon from 'material-ui-icons/PersonAdd';
import ImportContactsDialog from './import-contacts-dialog';
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {openDialog} from "../../../../../store/appearance/actions";
import _ from 'lodash';

class ContactRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }
    }

    openContactImportDialog() {
        if (!this.props.isSelectedOrganization) {
            const dialogText = this.props.labels.importContactsDialog;
            this.props.dispatch(openDialog(dialogText.noOrganizationSelectedTitle, dialogText.noOrganizationSelectedContent));
            return;
        }

        this.setState({
            dialogOpen: true,
        });
    }

    getKey = (key) => this.props.isFinancialContacts ? "financial" + _.upperFirst(key) : key;

    render() {
        const fieldData = {
            titles: this.props.labels.titles,
            values: this.props.selectedOrder,
            requiredFields: this.props.requiredFields,
            updateAction: function (key, value) {
                this.props.dispatch(updateSelectedOrder(key, value));
            }.bind(this)
        };

        const financial = this.props.isFinancialContacts;

        return (
            <div>
                <ImportContactsDialog
                    dialogOpen={this.state.dialogOpen}
                    isFinancialContacts={this.props.isFinancialContacts}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                />

                <IconButton
                    onClick={this.openContactImportDialog.bind(this)}
                    tooltip={this.props.labels.importContactsDialog.buttonTooltip}
                    style={{marginBottom: 10, marginRight: 10}}
                >
                    <PersonAddIcon/>
                </IconButton>

                <CustomText data={fieldData} name={this.getKey("contactFirstName", financial)} size="M"/>
                <CustomText data={fieldData} name={this.getKey("contactLastName", financial)} size="M"/>
                <CustomText data={fieldData} name={this.getKey("contactJob", financial)} size="M"/>
                <CustomText data={fieldData} name={this.getKey("contactPhone1", financial)} size="M"/>
                <CustomText data={fieldData} name={this.getKey("contactEmail", financial)} size="XL"/>
                <CustomText data={fieldData} name={this.getKey("contactPhone2", financial)} size="M"/>
                <CustomText data={fieldData} name={this.getKey("contactPhoneExtension", financial)} size="M"/>
                <CustomText data={fieldData} name={this.getKey("contactFax", financial)} size="M"/>
            </div>
        );
    }
}

ContactRow.propTypes = {
    isFinancialContacts: PropTypes.bool,
};


function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.contacts,
        selectedOrder: getSelectedOrder(state),
        isSelectedOrganization: isSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

export default connect(mapStateToProps)(ContactRow);


