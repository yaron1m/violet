import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import Status from "../../../../../util/consts/status";
import {isMatchingStatus} from "../../../../../util/order-status";
import InternalLectureDetails from "./InternalLectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.lectureDetails.sectionName,
        showCancelledCheckBox: isMatchingStatus(getSelectedOrder(state), [Status.approvedOrder, Status.isExecuting, Status.cancelled]),
    };
}

export default connect(mapStateToProps)(InternalLectureDetails);
