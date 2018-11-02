import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../../store/Labels/Selectors";
import {getSelectedOrderStatusLabel} from "../../../../store/Labels/Selectors";
import LectureDetailsPrintSection from "./LectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureDetails.sectionName,
        status: getSelectedOrderStatusLabel(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);