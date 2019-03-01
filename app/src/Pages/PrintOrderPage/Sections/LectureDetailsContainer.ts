import {connect} from "react-redux";
import {getSelectedOrderStatusLabel} from "../../../Store/Labels/Selectors";
import LectureDetailsPrintSection from "./LectureDetails";
import {IState} from "../../../Interfaces/ReduxInterfaces";
import {getSelectedOrder} from "../../../Store/SelectedOrder/Selectors";

function mapStateToProps(state: IState) {
    return {
        selectedOrder: getSelectedOrder(state),
        statusLabel: getSelectedOrderStatusLabel(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);