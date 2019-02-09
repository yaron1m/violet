import {connect} from 'react-redux';
import {getLabels} from "../../../../../Store/Labels/Selectors";
import CourseDetailsSection from "./CourseDetailsSection";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseDetailsSectionName,
    };
}

export default connect(mapStateToProps)(CourseDetailsSection);

