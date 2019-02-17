import {connect} from "react-redux";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import NavigationButton from "./NavigationButton";
import {IDispatch, IState} from "../../../Interfaces/ReduxInterfaces";
import {Path} from "../../Path";
import {clearSelectedPublicCourse} from "../../../Store/SelectedPublicCourse/Actions";

function mapStateToProps(state: IState) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.newPublicCourse,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onClick: () => {
            redirect(Path.publicCourse);
            dispatch(clearSelectedPublicCourse());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);