import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import CustomDialog from "../../../../../components/custom-components/custom-dialog";
import CustomTable from "../../../../../components/custom-components/custom-table";
import * as _ from 'lodash';
import CustomTableRow from "../../../../../components/custom-components/custom-table-row";
import {updateSelectedOrder} from "../../../../../store/selected/actions";

class ImportContactsDialog extends React.Component {

    hasContacts() {
        const field = this.props.selectedOrganization.contacts;
        return field !== undefined &&
            field !== null &&
            !_.isEmpty(field);
    }

    importContact(index) {
        const contact = this.props.selectedOrganization.contacts[index];

        for (let contactKey in contact) {
            if (!contact.hasOwnProperty(contactKey)) continue;
            const key = this.props.isFinancialContacts ? "financial" + contactKey.charAt(0).toUpperCase() + contactKey.slice(1) : contactKey;
            this.props.dispatch(updateSelectedOrder(key, contact[contactKey]));
        }
        this.props.onRequestClose();
    }

    render() {
        let key = 0;
        return (
            <CustomDialog
                open={this.props.dialogOpen}
                title={this.props.labels.dialogTitle}
                onRequestClose={this.props.onRequestClose}
            >
                <CustomTable headers={this.props.labels.tableHeaders}>
                    {this.hasContacts.bind(this)() ?
                        _.map(this.props.selectedOrganization.contacts, (contactDetails, index) => (
                            <CustomTableRow
                                key={key++}
                                rowIndex={index}
                                headerKeys={this.props.labels.tableHeaders.map((header) => (Object.keys(header)[0]))}
                                element={contactDetails}
                                onPickButton={this.importContact.bind(this)}
                            />
                        )) : null
                    }

                </CustomTable>

            </CustomDialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        labels: getLabels(state).orderPage.contactsSection.importContactsDialog,
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

ImportContactsDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    isFinancialContacts: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ImportContactsDialog);


