import PaymentSection from './payment-section';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder, getSelectedOrganization} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import calculateSum from './calculate-sum';

function mapStateToProps(state) {
    return {
        labels: getLabels(state).pages.orderPage.sections.payment,
        possiblePaymentConditions: getLabels(state).pages.orderPage.sections.organization.paymentConditions,
        selectedOrder: getSelectedOrder(state),
        selectedOrganization: getSelectedOrganization(state),
        requiredFields: getRequiredFields(state).order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        calculateSum: (selectedOrder) => calculateSum(selectedOrder, dispatch),
        updateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(PaymentSection);