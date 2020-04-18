import {connect} from "react-redux";
import CourseLecturesSection from "./CourseLecturesSection";
import {getSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Selectors";
import _ from "lodash";
import {IState} from "../../../../../Interfaces/ReduxInterfaces";
import {IPublicCourse} from "@violet/common";

function getLecturesIdsOrderedByDate(selectedPublicCourse: IPublicCourse) {
    const lectures = _.filter(selectedPublicCourse.lectures, x => x.active);
    const datesAndIds = _.map(lectures, lecture => {
        return {
            id: lecture.id,
            date: lecture.date
        };
    });
    const orderedDatesAndIds = _.sortBy(datesAndIds, x => x.date);
    return _.map(orderedDatesAndIds, x => x.id);
}

function mapStateToProps(state: IState) {
    return {
        lecturesIds: getLecturesIdsOrderedByDate(getSelectedPublicCourse(state)),
    };
}

export default connect(mapStateToProps)(CourseLecturesSection);
