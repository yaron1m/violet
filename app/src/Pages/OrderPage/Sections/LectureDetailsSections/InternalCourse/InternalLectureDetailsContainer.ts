import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {Status} from "@violet/common";
import {isMatchingStatus} from "../../../../../Util/OrderStatus/OrderStatusUtils";
import InternalLectureDetails from "./InternalLectureDetails";
import {IState} from "../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        showCancelledCheckBox: isMatchingStatus(getSelectedOrder(state), [Status.approvedOrder, Status.isExecuting, Status.cancelled]),
    };
}

export default connect(mapStateToProps)(InternalLectureDetails);
