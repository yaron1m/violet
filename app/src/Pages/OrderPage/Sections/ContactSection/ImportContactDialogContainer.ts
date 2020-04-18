import {connect} from "react-redux";
import * as _ from "lodash";
import {getOrdersByOrganization} from "../../../../Store/Orders/Selectors";
import {getValueOrEmptyString} from "../../../../Util/StringUtil";
import ImportContactDialog from "./ImportContactDialog";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import {IOrder, IStringObject} from "@violet/common";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";

export interface IContact extends IStringObject {
    contactFirstName: string;
    contactLastName: string;
    contactPhone1: string;
    contactPhone2: string;
    contactPhoneExtension: string;
    contactEmail: string;
    contactFax: string;
    contactJob: string;
}

function getContacts(state: IState) {
    const allContacts: IContact[] = [];
    const addedContacts: { [key: string]: boolean } = {};
    const orders = getOrdersByOrganization(state);
    if (!orders)
        return [];

    // Show contacts from recent orders first
    const sortedOrders = _.sortBy(orders, x => -x.id);

    for (let index = 0; index < sortedOrders.length; index++) {
        addSingleContact(sortedOrders[index], allContacts, addedContacts, true);
        addSingleContact(sortedOrders[index], allContacts, addedContacts, false);
    }
    return _.map(allContacts, x => x);
}

function addSingleContact(order: IOrder, allContacts: IContact[], addedContacts: { [key: string]: boolean }, isFinancialContacts: boolean) {
    const thisContact = getContactsFromOrder(order, isFinancialContacts);
    const thisContactKey = thisContact.contactFirstName.trim() + thisContact.contactLastName.trim();
    if (thisContactKey === "" || addedContacts.hasOwnProperty(thisContactKey))
        return;

    allContacts.push(thisContact);
    addedContacts[thisContactKey] = true;
}

function getContactsFromOrder(order: IOrder, isFinancialContacts: boolean): IContact {
    const getKey = (key: string) => isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key;

    return {
        contactFirstName: getValueOrEmptyString(order, getKey("contactFirstName")),
        contactLastName: getValueOrEmptyString(order, getKey("contactLastName")),
        contactPhone1: getValueOrEmptyString(order, getKey("contactPhone1")),
        contactPhone2: getValueOrEmptyString(order, getKey("contactPhone2")),
        contactPhoneExtension: getValueOrEmptyString(order, getKey("contactPhoneExtension")),
        contactEmail: getValueOrEmptyString(order, getKey("contactEmail")),
        contactFax: getValueOrEmptyString(order, getKey("contactFax")),
        contactJob: getValueOrEmptyString(order, getKey("contactJob")),
    };
}

function importContact(
    contact: IContact,
    updateSelectedOrder: (key: string, value: string) => void,
    onRequestClose: () => void,
    getKey: (key: string) => string
) {
    onRequestClose();
    for (const contactKey in contact) {
        if (!contact.hasOwnProperty(contactKey)) continue;
        const key = getKey(contactKey);
        updateSelectedOrder(key, contact[contactKey]);
    }
}

function mapStateToProps(state: IState, ownProps: ImportContactDialogContainerProps) {
    return {
        onRequestClose: ownProps.onRequestClose,
        contacts: getContacts(state),
        tableHeaders: [
            {pick: "בחר"},
            {contactFirstName: "שם פרטי"},
            {contactLastName: "שם משפחה"},
            {contactJob: "תפקיד"},
            {contactPhone1: "טלפון"},
            {contactEmail: "דואר אלקטרוני"},
        ] as IStringObject[],
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: ImportContactDialogContainerProps) {
    const updateOrder = (key: string, value: string) => {
        dispatch(updateSelectedOrder(key, value));
    };
    const getKey = (key: string) => ownProps.isFinancialContacts ? "financial" + key.charAt(0).toUpperCase() + key.slice(1) : key;
    return {
        importContact: (contact: IContact) => importContact(contact, updateOrder, ownProps.onRequestClose, getKey)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportContactDialog);

interface ImportContactDialogContainerProps {
    dialogOpen: boolean;
    isFinancialContacts: boolean;
    onRequestClose: () => void;
}