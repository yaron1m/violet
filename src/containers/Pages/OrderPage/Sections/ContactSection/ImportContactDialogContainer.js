import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import * as _ from 'lodash';
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getOrdersByOrganization} from "../../../../../store/orders/selectors";
import {getValueOrEmptyString} from "../../../../../util/string-util";
import ImportContactDialog from "./ImportContactDialog";

function getContacts(state, ownProps) {
    const allContacts = {};
    const orders = getOrdersByOrganization(state);
    if(!orders)
        return [];

    for (let index = 0; index < orders.length; index++) {
        const thisContact = getContactsFromOrder(orders[index], ownProps.isFinancialContacts);
        const thisContactKey = thisContact.contactFirstName + thisContact.contactLastName;
        if (thisContactKey === "" || allContacts.hasOwnProperty(thisContactKey))
            continue;

        allContacts[thisContactKey] = thisContact;
    }
    return _.map(allContacts, x => x);
}

function getContactsFromOrder(order, isFinancialContacts) {
    const getKey = (key) => isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key;

    return {
        contactFirstName: getValueOrEmptyString(order, getKey("contactFirstName")),
        contactLastName: getValueOrEmptyString(order,getKey("contactLastName")),
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

    for (let contactKey in contact) {
        if (!contact.hasOwnProperty(contactKey)) continue;
        const key = getKey(contactKey);
        updateSelectedOrder(key, contact[contactKey]);
    }
    onRequestClose();
}


function mapStateToProps(state, ownProps) {
    return {
        dialogTitle: getLabels(state).pages.orderPage.sections.contacts.importContactsDialog.dialogTitle,
        onRequestClose: ownProps.onRequestClose,

        contacts: getContacts(state,ownProps),
        tableHeaders: getLabels(state).pages.orderPage.sections.contacts.importContactsDialog.tableHeaders,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
        getKey: (key)=> ownProps.isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key,
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        dialogOpen: ownProps.dialogOpen,
        dialogTitle: stateProps.dialogTitle,
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