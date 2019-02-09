import PaymentSection from './PaymentSection';
import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import calculateSum from './CalculateSum';

function mapStateToProps(state: IState) {
    const labels = getOrderSectionsLabels(state).payment;

    return {
        sectionName: labels.sectionName,
        financialContactTitle: labels.financialContactTitle,
        buttonTooltip: labels.buttonTooltip,

        selectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch :IDispatch) {
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