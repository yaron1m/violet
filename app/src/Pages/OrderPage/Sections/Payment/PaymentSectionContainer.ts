import PaymentSection from './PaymentSection';
import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import calculateSum from './CalculateSum';
import {IDispatch, IState} from '../../../../Interfaces/ReduxInterfaces';
import IOrder, {IStringObject} from '../../../../Interfaces/IOrder';

function mapStateToProps(state: IState) {
    const labels = getOrderSectionsLabels(state).payment as IStringObject;

    return {
        sectionName: labels.sectionName,
        financialContactTitle: labels.financialContactTitle,
        buttonTooltip: labels.buttonTooltip,

        selectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps: {
    sectionName: string; financialContactTitle: string; buttonTooltip: string; selectedOrder: IOrder;
}, dispatchProps: {
    updateAction: (key: string, value: any) => void
}) {
    return {
        ...stateProps,
        ...dispatchProps,
        calculateSum: () => calculateSum(stateProps.selectedOrder, dispatchProps.updateAction)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PaymentSection);