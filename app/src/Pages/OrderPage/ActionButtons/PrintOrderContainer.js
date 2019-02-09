import {connect} from 'react-redux';
import {getOrderPageLabels} from "../../../Store/Labels/Selectors";
import {isSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import {openDialog} from "../../../Store/Appearance/Actions";
import {redirect} from "../../../Util/HistoryUtil";
import PrintOrderButton from "./PrintOrder";
import {Path} from "../../Path";

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
                redirect(Path.print);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PrintOrderButton);
