import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import * as _ from 'lodash';
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import {getOrdersByOrganization} from "../../../../Store/Orders/Selectors";
import {getValueOrEmptyString} from "../../../../Util/StringUtil";
import ImportContactDialog from "./ImportContactDialog";

function getContacts(state) {
    const allContacts = {};
    const orders = getOrdersByOrganization(state);
    if (!orders)
        return [];

    for (let index = 0; index < orders.length; index++) {
        addSingleContact(orders[index], allContacts, true);
        addSingleContact(orders[index], allContacts, false);
    }
    return _.map(allContacts, x => x);
}

function addSingleContact(order, allContacts, isFinancialContacts) {
    const thisContact = getContactsFromOrder(order, isFinancialContacts);
    const thisContactKey = thisContact.contactFirstName.trim() + thisContact.contactLastName.trim();
    if (thisContactKey === "" || allContacts.hasOwnProperty(thisContactKey))
        return;

    allContacts[thisContactKey] = thisContact;
}

function getContactsFromOrder(order, isFinancialContacts) {
    const getKey = (key) => isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key;

    return {
        contactFirstName: getValueOrEmptyString(order, getKey("contactFirstName")),
        contactLastName: getValueOrEmptyString(order, getKey("contactLastName")),
        contactPhone1: getValueOrEmptyString(order, getKey("contactPhone1")),
        contactPhone2: getValueOrEmptyString(order, getKey("contactPhone2")),
        contactPhoneExtension: getValueOrEmptyString(order, getKey("contactPhoneExtension")),
        contactEmail: getValueOrEmptyString(order, getKey("contactEmail")),
        contactFax: getValueOrEmptyString(order, getKey("contactFax")),
        contactJob: getValueOrEmptyString(order, getKey("contactJob")),
    }
}


function importContact(contacts, index, updateSelectedOrder, onRequestClose, getKey) {
    const contact = contacts[index];

    for (const contactKey in contact) {
        if (!contact.hasOwnProperty(contactKey)) continue;
        const key = getKey(contactKey);
        updateSelectedOrder(key, contact[contactKey]);
    }
    onRequestClose();
}


function mapStateToProps(state, ownProps) {
    return {
        dialogTitle: getOrderSectionsLabels(state).contacts.importContactsDialog.dialogTitle,
        noContactsLabel: getOrderSectionsLabels(state).contacts.importContactsDialog.noContactsLabel,
        onRequestClose: ownProps.onRequestClose,

        contacts: getContacts(state),
        tableHeaders: getOrderSectionsLabels(state).contacts.importContactsDialog.tableHeaders,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
        getKey: (key) => ownProps.isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key,
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        dialogOpen: ownProps.dialogOpen,
        dialogTitle: stateProps.dialogTitle,
        noContactsLabel: stateProps.noContactsLabel,
        contacts: stateProps.contacts,
        tableHeaders: stateProps.tableHeaders,
        onRequestClose: ownProps.onRequestClose,

        importContact: (index) => importContact(stateProps.contacts, index, dispatchProps.updateSelectedOrder, ownProps.onRequestClose, dispatchProps.getKey)
    };
}


const Container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ImportContactDialog);

Container.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    isFinancialContacts: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
};

export default Container;
