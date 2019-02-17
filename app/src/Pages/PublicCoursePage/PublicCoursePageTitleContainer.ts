import {connect} from "react-redux";
import {getLabels} from "../../Store/Labels/Selectors";
import PublicCoursePageTitle from "./PublicCoursePageTitle";
import {IState} from "../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.publicCoursePage.pageTitle
    };
}

export default connect(mapStateToProps)(PublicCoursePageTitle);
