import {connect} from 'react-redux';
import {getLabels} from "../../../../../../../store/labels/reducer";
import PropTypes from 'prop-types';
import {getOfferedLectures} from "../../../../../../../store/lists/reducer";
import LectureTimeEditDialog from "./LectrueTimesEditDialog";

function mapStateToProps(state, ownProps) {
    return {
        dialogOpen: ownProps.dialogOpen,
        dialogTitle: getLabels(state).pages.orderPage.sections.lectureTimes.editDialog.dialogTitle,
        lectureTimeIndex: ownProps.lectureTimeIndex,
        onRequestClose: ownProps.onRequestClose,
        offeredLectures: getOfferedLectures(state),
    };
}

const Container = connect(mapStateToProps)(LectureTimeEditDialog);

LectureTimeEditDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    lectureTimeIndex: PropTypes.number,
    onRequestClose: PropTypes.func.isRequired,
};

export default Container;
