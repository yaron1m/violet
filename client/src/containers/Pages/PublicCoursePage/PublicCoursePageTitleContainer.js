import {connect} from 'react-redux';
import {getLabels} from "../../../store/Labels/Selectors";
import PublicCoursePageTitle from "./PublicCoursePageTitle";

function getPageTitle(state) {
    return getLabels(state).pages.publicCoursePage.pageTitle;
}

function mapStateToProps(state) {
    return {
        title: getPageTitle(state),
    };
}

export default connect(mapStateToProps)(PublicCoursePageTitle);
