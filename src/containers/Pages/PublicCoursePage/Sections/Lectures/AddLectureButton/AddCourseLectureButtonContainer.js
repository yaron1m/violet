import {connect} from 'react-redux';
import {getLabels} from "../../../../../../store/labels/reducer";
import {addLectureToSelectedPublicCourse} from "../../../../../../store/SelectedPublicCourse/Actions";
import {CustomRaisedButton} from "../../../../../../components/CustomComponents/CustomButtons";

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

