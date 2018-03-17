import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import CourseLecturesSection from "./CourseLecturesSection";
import {getSelectedPublicCourse} from "../../../../../store/selected/reducer";
import _ from 'lodash';

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseLecturesSectionName,
        lecturesIds: _.keys(getSelectedPublicCourse(state).lectures),
    };
}

export default connect(mapStateToProps)(CourseLecturesSection);

