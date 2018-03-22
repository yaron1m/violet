import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/labels/reducer";
import {getSelectedOrderStatus} from "../../../../util/order-status";
import LectureDetailsPrintSection from "./LectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.lectureDetails.sectionName,
        status: getSelectedOrderStatus(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);