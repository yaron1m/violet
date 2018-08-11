import {connect} from 'react-redux';
import {getLabels} from "../../../../../../store/Labels/Reducer";
import CourseLecturesSection from "./CourseLecturesSection";
import {getSelectedPublicCourse} from "../../../../../../store/SelectedPublicCourse/Selectors";
import _ from 'lodash';

function getLecturesIdsOrderedByDate(selectedPublicCourse) {
    const lectures = _.filter(selectedPublicCourse.lectures, x => x.active);
    const datesAndIds = _.map(_.keys(lectures), key => {
        return {
            key,
            date: lectures[key].date
        };
    });
    const orderedDatesAndIds = _.sortBy(datesAndIds, x => x.date);
    return _.map(orderedDatesAndIds, x => x.key);
}

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseLecturesSectionName,
        lecturesIds: getLecturesIdsOrderedByDate(getSelectedPublicCourse(state)),
    };
}

export default connect(mapStateToProps)(CourseLecturesSection);

