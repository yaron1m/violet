import connect from "react-redux/es/connect/connect";
import {getLabels} from "../../../../store/Labels/Reducer";
import {getSelectedOrderStatus} from "../../../../util/OrderStatus";
import LectureDetailsPrintSection from "./LectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.lectureDetails.sectionName,
        status: getSelectedOrderStatus(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);