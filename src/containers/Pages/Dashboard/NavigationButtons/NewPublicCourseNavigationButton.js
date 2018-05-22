import {connect} from "react-redux";
import {getLabels} from "../../../../store/labels/reducer";
import {redirect} from "../../../../util/history-util";
import {clearSelected} from "../../../../store/selected/actions";
import NavigationButton from "./NavigationButton";

function mapStateToProps(state) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.newPublicCourse,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => {
            redirect("/publicCourse");
            dispatch(clearSelected());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);