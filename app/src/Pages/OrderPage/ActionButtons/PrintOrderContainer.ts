import {connect} from "react-redux";
import {isSelectedOrder} from "../../../Store/SelectedOrder/Selectors";
import {openDialog} from "../../../Store/Appearance/Actions";
import {redirect} from "../../../Util/HistoryUtil";
import PrintOrderButton from "./PrintOrder";
import {Path} from "../../Path";
import {IDispatch, IState} from "../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        isSelectedOrder: isSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        openDialog: (title: string, content: string) => dispatch(openDialog(title, content)),
    };
}

function mergeProps(stateProps: { isSelectedOrder: boolean; }, dispatchProps: { openDialog: (title: string, content: string) => void; }) {
    return {
        printLabel: "הדפס הזמנה",
        onClick: () => {
            if (!stateProps.isSelectedOrder)
                dispatchProps.openDialog("שגיאה", "לא נבחרה הזמנה");
            else
                redirect(Path.print);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PrintOrderButton);