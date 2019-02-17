import {connect} from "react-redux";
import {getOrderPageLabels} from "../../../Store/Labels/Selectors";
import {isSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import {openDialog} from "../../../Store/Appearance/Actions";
import {redirect} from "../../../Util/HistoryUtil";
import PrintOrderButton from "./PrintOrder";
import {Path} from "../../Path";
import {IDispatch, IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        printLabel: getOrderPageLabels(state).actionButtons.print as string,
        errorLabel: getOrderPageLabels(state).actionButtons.error as string,
        noOrderSelectedLabel: getOrderPageLabels(state).actionButtons.noOrderSelected as string,
        isSelectedOrder: isSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        openDialog: (title: string, content: string) => dispatch(openDialog(title, content)),
    };
}

function mergeProps(stateProps: {
    printLabel: string; errorLabel: string; noOrderSelectedLabel: string; isSelectedOrder: boolean;
}, dispatchProps: {
    openDialog: (title: string, content: string) => void;
}) {
    return {
        printLabel: stateProps.printLabel,
        onClick: () => {
            if (!stateProps.isSelectedOrder)
                dispatchProps.openDialog(stateProps.errorLabel, stateProps.noOrderSelectedLabel);
            else
                redirect(Path.print);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PrintOrderButton);