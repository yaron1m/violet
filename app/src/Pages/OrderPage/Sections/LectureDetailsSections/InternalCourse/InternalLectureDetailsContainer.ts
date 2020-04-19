import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {Status, isMatchingStatus} from "@violet/common";
import InternalLectureDetails from "./InternalLectureDetails";
import {IState} from "../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        showCancelledCheckBox: isMatchingStatus(getSelectedOrder(state), [Status.approvedOrder, Status.isExecuting, Status.cancelled]),
    };
}

export default connect(mapStateToProps)(InternalLectureDetails);
