import {connect} from "react-redux";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import PublicCourseLectureDetails from "./PublicCourseLectureDetails";
import {IState} from "../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        numberOfParticipants: getSelectedOrder(state).publicCourseParticipants ? getSelectedOrder(state).publicCourseParticipants.length : 0,
    };
}

export default connect(mapStateToProps)(PublicCourseLectureDetails);
