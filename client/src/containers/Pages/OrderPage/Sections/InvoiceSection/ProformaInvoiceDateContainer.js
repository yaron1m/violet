import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/Labels/Selectors";
import {getSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import ProformaInvoiceDate from './ProformaInvoiceDate'
import calculatePayDate from "./ProformaInvoiceDateCalculator";

function mapStateToProps(state) {
    return {
        allPaymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedPaymentConditions: getSelectedOrganization(state).paymentConditions,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
        calculatePayDate: function (proformaInvoiceValue, selectedPaymentConditions, allPaymentConditions) {
            const payDate = calculatePayDate(proformaInvoiceValue, selectedPaymentConditions, allPaymentConditions);
            if (payDate !== null)
                dispatch(updateSelectedOrder("expectedPayDate", payDate));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProformaInvoiceDate);