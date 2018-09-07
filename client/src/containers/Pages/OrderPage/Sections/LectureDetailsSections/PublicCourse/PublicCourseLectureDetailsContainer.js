import {connect} from 'react-redux';
import {getOrderSectionsLabels} from "../../../../../../store/Labels/Selectors";
import {getSelectedOrder} from "../../../../../../store/SelectedOrder/Selectors";
import PublicCourseLectureDetails from "./PublicCourseLectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getOrderSectionsLabels(state).lectureDetails.publicCourseSectionName,
        numberOfParticipants: getSelectedOrder(state).publicCourseParticipants ? getSelectedOrder(state).publicCourseParticipants.length : 0,
    };
}

export default connect(mapStateToProps)(PublicCourseLectureDetails);
