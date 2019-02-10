import {connect} from 'react-redux';
import {getLabels} from "../../../../../Store/Labels/Selectors";
import CourseLecturesSection from "./CourseLecturesSection";
import {getSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Selectors";
import _ from 'lodash';
import {IState} from '../../../../../Interfaces/ReduxInterfaces';
import IPublicCourse from '../../../../../Interfaces/IPublicCourse';

function getLecturesIdsOrderedByDate(selectedPublicCourse: IPublicCourse) {
    const lectures = _.filter(selectedPublicCourse.lectures, x => x.active);
    const datesAndIds = _.map(lectures, lecture => {
        return {
            id: lecture.id,
            date: lectures[lecture.id].date
        };
    });
    const orderedDatesAndIds = _.sortBy(datesAndIds, x => x.date);
    return _.map(orderedDatesAndIds, x => x.id);
}

function mapStateToProps(state: IState) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseLecturesSectionName,
        lecturesIds: getLecturesIdsOrderedByDate(getSelectedPublicCourse(state)),
    };
}

export default connect(mapStateToProps)(CourseLecturesSection);
