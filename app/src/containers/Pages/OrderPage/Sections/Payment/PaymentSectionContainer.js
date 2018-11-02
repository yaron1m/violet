import PaymentSection from './PaymentSection';
import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../store/Labels/Selectors";
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import calculateSum from './CalculateSum';

function mapStateToProps(state) {
    const labels = getOrderSectionsLabels(state).payment;

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