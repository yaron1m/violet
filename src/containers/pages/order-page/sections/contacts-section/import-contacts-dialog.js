import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import CustomDialog from "../../../../../components/custom-components/custom-dialog";
import CustomTable from "../../../../../components/tables/custom-table";
import * as _ from 'lodash';
import CustomTableRow from "../../../../../components/tables/custom-table-row";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getOrdersByOrganization} from "../../../../../store/orders/reducer";
import {getValueOrEmptyString} from "../../../../../util/string-util";

class ImportContactsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            isFinancialContacts: props.isFinancialContacts,
        };
    }

    async componentWillReceiveProps(props) {
        if (props.dialogOpen) {
            await this.setState({
                isFinancialContacts: props.isFinancialContacts,
                contacts: this.state.contacts,
            });
            const contacts = this.getContacts();

            this.setState({
                isFinancialContacts: props.isFinancialContacts,
                contacts: contacts,
            });
        }
    }

    getContacts() {
        const allContacts = {};
        const orders = this.props.OrderOfSelectedOrganization;

        for (let index = 0; index < orders.length; index++) {
            const thisContact = this.getContactsFromOrder(orders[index]);
            const thisContactKey = thisContact.contactFirstName + thisContact.contactLastName;
            if (thisContactKey === "" || allContacts.hasOwnProperty(thisContactKey))
                continue;

            allContacts[thisContactKey] = thisContact;
        }
        return _.map(allContacts, x => x);
    }

    getContactsFromOrder(order) {
        return {
            contactFirstName: getValueOrEmptyString(order, this.getKey("contactFirstName")),
            contactLastName: getValueOrEmptyString(order, this.getKey("contactLastName")),
            contactPhone1: getValueOrEmptyString(order, this.getKey("contactPhone1")),
            contactPhone2: getValueOrEmptyString(order, this.getKey("contactPhone2")),
            contactPhoneExtension: getValueOrEmptyString(order, this.getKey("contactPhoneExtension")),
            contactEmail: getValueOrEmptyString(order, this.getKey("contactEmail")),
            contactFax: getValueOrEmptyString(order, this.getKey("contactFax")),
            contactJob: getValueOrEmptyString(order, this.getKey("contactJob")),
        }
    }

    getKey = (key) => this.state.isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key;

    importContact(index) {
        const contact = this.state.contacts[index];

        for (let contactKey in contact) {
            if (!contact.hasOwnProperty(contactKey)) continue;
            const key = this.getKey(contactKey);
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
                    {_.isEmpty(this.state.contacts) ? null :
                        _.map(this.state.contacts, (contactDetails, index) => (
                            <CustomTableRow
                                key={key++}
                                rowIndex={index}
                                headers={this.props.labels.tableHeaders}
                                element={contactDetails}
                                onPickButton={this.importContact.bind(this)}
                            />
                        ))
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
        OrderOfSelectedOrganization: getOrdersByOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

ImportContactsDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    isFinancialContacts: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ImportContactsDialog);
