import {connect} from 'react-redux';
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/Labels/Reducer";
import {getSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import ProformaInvoiceDate from './ProformaInvoiceDate'
import calculatePayDate from "./ProformaInvoiceDateCalculator";

function mapStateToProps(state) {
    return {
        paymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedOrganization: getSelectedOrganization(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
        calculatePayDate: function (proformaInvoiceValue, selectedOrganization, paymentConditions) {
            const payDate = calculatePayDate(proformaInvoiceValue, selectedOrganization, paymentConditions);
            dispatch(updateSelectedOrder("expectedPayDate", payDate));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProformaInvoiceDate);