import {connect} from "react-redux";
import {getLabels} from "../../../Store/Labels/Selectors";
import {redirect} from "../../../Util/HistoryUtil";
import NavigationButton from "./NavigationButton";
import {IState} from '../../../Interfaces/ReduxInterfaces';
import {Path} from '../../Path';

function mapStateToProps(state:IState) {
    return {
        title: getLabels(state).pages.dashboard.navigationButtons.newPublicCourse,
    };
}

function mapDispatchToProps() {
    return {
        onClick: () => {
            redirect(Path.publicCourse);
           // dispatch(clearSelected()); //TODO clear selected public course
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButton);