import {connect} from "react-redux";
import {getLabels} from "../../../../Store/Labels/Selectors";
import {redirect} from "../../../../Util/HistoryUtil";
import NavigationButton from "./NavigationButton";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.allPublicCourses,
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => redirect("/allPublicCourses"),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);