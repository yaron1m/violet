import {connect} from "react-redux";
import {getLabels} from "../../../../store/Labels/Selectors";
import {redirect} from "../../../../util/HistoryUtil";
import NavigationButton from "./NavigationButton";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.newPublicCourse,
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => {
            redirect("/publicCourse");
           // dispatch(clearSelected()); //TODO clear selected public course
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);