import PaymentSection from "./PaymentSection";
import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import calculateSum from "./CalculateSum";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import IOrder from "../../../../Interfaces/IOrder";

function mapStateToProps(state: IState) {
    return {
        selectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        updateAction: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps: { selectedOrder: IOrder },
                    dispatchProps: { updateAction: (key: string, value: any) => void }) {
    return {
        calculateSum: () => calculateSum(stateProps.selectedOrder, dispatchProps.updateAction)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PaymentSection);