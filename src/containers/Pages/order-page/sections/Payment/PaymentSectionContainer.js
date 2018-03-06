import PaymentSection from './PaymentSection';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import calculateSum from './CalculateSum';

function mapStateToProps(state) {
    const labels = getLabels(state).pages.orderPage.sections.payment;

    return {
        sectionName: labels.sectionName,
        financialContactTitle: labels.financialContactTitle,
        buttonTooltip: labels.buttonTooltip,

        selectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps){
    return {
        ...stateProps,
        ...dispatchProps,
        calculateSum: () => calculateSum(stateProps.selectedOrder, dispatchProps.updateAction)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PaymentSection);