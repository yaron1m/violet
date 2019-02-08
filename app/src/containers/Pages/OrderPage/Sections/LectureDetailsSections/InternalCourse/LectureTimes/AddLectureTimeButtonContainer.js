import {connect} from 'react-redux';
import {addNewLectureTime} from "../../../../../../../store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../../../../store/Labels/Selectors";
import {CustomRaisedButton} from "../../../../../../../Components/CustomComponents/CustomButtons";

function mapStateToProps(state) {
    return {
        label: getOrderSectionsLabels(state).lectureTimes.addRow,
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

