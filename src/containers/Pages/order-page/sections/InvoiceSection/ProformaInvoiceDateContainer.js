import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {isEmptyValue} from "../../../../../util/string-util";
import ProformaInvoiceDate from './ProformaInvoiceDate'

function calculatePayDate(proformaInvoiceValue, selectedOrganization, paymentConditions, updateSelectedOrder) {
    //TODO test this function
    if (isEmptyValue(selectedOrganization, "paymentConditions"))
        return;

    const proformaInvoiceDate = new Date(proformaInvoiceValue);
    const selectedPaymentConditions = selectedOrganization.paymentConditions;

    let paymentDate;
    switch (selectedPaymentConditions) {
        case paymentConditions["immediate"]:
            paymentDate = proformaInvoiceDate;
            break;

        case paymentConditions["EOM"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 1, 1);
            break;

        case paymentConditions["EOM+30"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 1);
            break;

        case paymentConditions["EOM+45"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 15);
            break;

        case paymentConditions["EOM+60"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 3, 1);
            break;

        case paymentConditions["EOM+30+7"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 7);
            break;

        case paymentConditions["EOM+30+22"]:
            paymentDate = new Date(proformaInvoiceDate.getFullYear(), proformaInvoiceDate.getMonth() + 2, 22);
            break;

        default:
            console.error("Could not parse payment conditions - " + paymentConditions);
            return;
    }

    updateSelectedOrder("expectedPayDate", paymentDate.toJSON());
}

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.orderPage.sections.invoice.titles,
        values: getSelectedOrder(state),
        paymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        ...stateProps,
        updateAction: (key, value) => {
            dispatchProps.updateSelectedOrder(key, value);
            calculatePayDate(value, stateProps.selectedOrganization, stateProps.paymentConditions, dispatchProps.updateSelectedOrder);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProformaInvoiceDate);