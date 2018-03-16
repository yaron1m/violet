import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import CourseDetailsSection from "./CourseDetailsSection";
import {selectPublicCourse} from "../../../../../store/selected/actions";

function mapStateToProps(state) {
    return {
        sectionName: getLabels(state).pages.publicCoursePage.sections.courseDetailsSectionName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        selectCourse: () => dispatch(selectPublicCourse(100))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailsSection);

