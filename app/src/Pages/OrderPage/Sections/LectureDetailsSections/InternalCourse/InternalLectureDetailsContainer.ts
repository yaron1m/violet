import {connect} from "react-redux";
import {getOrderSectionsLabels} from "../../../../../Store/Labels/Selectors";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {Status} from "../../../../../Util/Constants/Status";
import {isMatchingStatus} from "../../../../../Util/OrderStatus/OrderStatusUtils";
import InternalLectureDetails from "./InternalLectureDetails";
import {IState} from "../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureDetails.internalLabelSectionName,
        showCancelledCheckBox: isMatchingStatus(getSelectedOrder(state), [Status.approvedOrder, Status.isExecuting, Status.cancelled]),
    };
}

export default connect(mapStateToProps)(InternalLectureDetails);
