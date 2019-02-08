import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../../store/Labels/Selectors";
import {getSelectedOrder} from "../../../../../../store/SelectedOrder/Selectors";
import {Status} from "../../../../../../util/Constants/Status";
import {isMatchingStatus} from "../../../../../../util/OrderStatus/OrderStatusUtils";
import InternalLectureDetails from "./InternalLectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureDetails.internalLabelSectionName,
        showCancelledCheckBox: isMatchingStatus(getSelectedOrder(state), [Status.approvedOrder, Status.isExecuting, Status.cancelled]),
    };
}

export default connect(mapStateToProps)(InternalLectureDetails);
