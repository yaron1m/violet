import {connect} from 'react-redux';
import {getLabels} from "../../../../store/labels/reducer";
import {isSelectedOrder} from "../../../../store/SelectedOrder/Selectors";
import {openDialog} from "../../../../store/Appearance/Actions";
import {redirect} from "../../../../util/HistoryUtil";
import PrintOrderButton from "./PrintOrder";

function mapStateToProps(state) {
    return {
        printLabel: getLabels(state).pages.orderPage.actionButtons.print,
        errorLabel: getLabels(state).pages.orderPage.actionButtons.error,
        noOrderSelectedLabel: getLabels(state).pages.orderPage.actionButtons.noOrderSelected,
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
