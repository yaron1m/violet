import {connect} from 'react-redux';
import {getOrderPageLabels} from "../../../../store/Labels/Selectors";
import {isSelectedOrder} from "../../../../store/SelectedOrder/Selectors";
import {openDialog} from "../../../../store/Appearance/Actions";
import {redirect} from "../../../../util/HistoryUtil";
import PrintOrderButton from "./PrintOrder";

function mapStateToProps(state) {
    return {
        printLabel: getOrderPageLabels(state).actionButtons.print,
        errorLabel: getOrderPageLabels(state).actionButtons.error,
        noOrderSelectedLabel: getOrderPageLabels(state).actionButtons.noOrderSelected,
        isSelectedOrder: isSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: (title, content) => dispatch(openDialog(title, content)),
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        printLabel: stateProps.printLabel,
        onClick: () => {
            if (!stateProps.isSelectedOrder)
                dispatchProps.openDialog(stateProps.errorLabel, stateProps.noOrderSelectedLabel);
            else
                redirect("/print");
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PrintOrderButton);
