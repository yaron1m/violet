import {connect} from 'react-redux';
import {addNewLectureTime} from "../../../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../../../store/labels/reducer";
import {CustomRaisedButton} from "../../../../../../../components/CustomComponents/CustomButtons";

function mapStateToProps(state) {
    return {
        label: getLabels(state).pages.orderPage.sections.lectureTimes.addRow,
        style: {
            marginBottom: 10
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => dispatch(addNewLectureTime())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomRaisedButton);

