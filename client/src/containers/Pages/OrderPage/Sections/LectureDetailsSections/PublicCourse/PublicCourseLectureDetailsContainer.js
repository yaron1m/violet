import {connect} from 'react-redux';
import {getLabels} from "../../../../../../store/Labels/Reducer";
import {getSelectedOrder} from "../../../../../../store/SelectedOrder/Selectors";
import PublicCourseLectureDetails from "./PublicCourseLectureDetails";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.orderPage.sections.lectureDetails.publicCourseSectionName,
        numberOfParticipants: getSelectedOrder(state).publicCourseParticipants ? getSelectedOrder(state).publicCourseParticipants.length : 0,
    };
}

export default connect(mapStateToProps)(PublicCourseLectureDetails);
