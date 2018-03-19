import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import CourseLecturesSection from "./CourseLecturesSection";
import {getSelectedPublicCourse} from "../../../../../store/selected/reducer";
import _ from 'lodash';

function getLecturesIdsOrderedByDate(selectedPublicCourse){
    const lectures = selectedPublicCourse.lectures;
    const orderedLectures = _.sortBy(lectures, x=> x.date);
    return _.map(orderedLectures, x=> x.id);
}

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseLecturesSectionName,
        lecturesIds: getLecturesIdsOrderedByDate(getSelectedPublicCourse(state)),
    };
}

export default connect(mapStateToProps)(CourseLecturesSection);

