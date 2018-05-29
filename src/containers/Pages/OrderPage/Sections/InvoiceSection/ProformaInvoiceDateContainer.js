/* eslint-disable no-magic-numbers */
import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/Labels/Reducer";
import {getSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import {isEmptyValue} from "../../../../../util/StringUtil";
import ProformaInvoiceDate from './ProformaInvoiceDate'
import {toDateFormat} from "../../../../../util/TimeUtil";

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
            return;
    }

    updateSelectedOrder("expectedPayDate", toDateFormat(paymentDate));
}

function mapStateToProps(state) {
    return {
        paymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedOrganization: getSelectedOrganization(state),
        calculatePayDate,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProformaInvoiceDate);