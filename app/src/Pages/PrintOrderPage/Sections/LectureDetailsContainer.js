import connect from "react-redux/es/connect/connect";
import {getOrderSectionsLabels} from "../../../Store/Labels/Selectors";
import {getSelectedOrderStatusLabel} from "../../../Store/Labels/Selectors";
import LectureDetailsPrintSection from "./LectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureDetails.sectionName,
        status: getSelectedOrderStatusLabel(state),
    };
}

export default connect(mapStateToProps)(LectureDetailsPrintSection);