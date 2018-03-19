import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import LectureDetailsSection from "./LecturesDetailsSection";


function mapStateToProps(state) {
    return {
        internalLabel: getLabels(state).pages.orderPage.sections.lectureDetails.tabs.internalLabel,
        publicCourseLabel: getLabels(state).pages.orderPage.sections.lectureDetails.tabs.publicCourseLabel,
    };
}

export default connect(mapStateToProps)(LectureDetailsSection);
