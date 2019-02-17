import {connect} from "react-redux";
import {getLabels} from "../../../../../Store/Labels/Selectors";
import {addLectureToSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {CustomRaisedButton} from "../../../../../Components/CustomComponents/CustomButtons";
import {IDispatch, IState} from "../../../../../Interfaces/ReduxInterfaces";

function mapStateToProps(state: IState) {
    return {
        label: getLabels(state).pages.publicCoursePage.actionButtons.addLecture,
        style: {
            marginTop: 10
        }
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        onClick: () => dispatch(addLectureToSelectedPublicCourse())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomRaisedButton);
