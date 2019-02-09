import {connect} from 'react-redux';
import {getLabels} from "../../../../../Store/Labels/Selectors";
import {addLectureToSelectedPublicCourse} from "../../../../../Store/SelectedPublicCourse/Actions";
import {CustomRaisedButton} from "../../../../../Components/CustomComponents/CustomButtons";

function mapStateToProps(state) {
    return {
        label: getLabels(state).pages.publicCoursePage.actionButtons.addLecture,
        style: {
            marginTop: 10
        }
    };
}

function mapDispatchToProps(dispatch){
    return {
        onClick: () => dispatch(addLectureToSelectedPublicCourse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomRaisedButton);

