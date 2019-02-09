import {connect} from 'react-redux';
import PropTypes from "prop-types";
import PublicCourseParticipant from "./PublicCourseParticipant";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {
    removeParticipant,
    updatePublicCourseLectureParticipating,
    updateSelectedOrder
} from "../../../../../Store/SelectedOrder/Actions";
import {
    getSelectedPublicCourse,
    getSelectedPublicCourseLectures
} from "../../../../../Store/SelectedPublicCourse/Selectors";

function mapStateToProps(state, ownProps) {
    return {
        selectedPublicCourseLectures: getSelectedPublicCourseLectures(state),
        selectedOrder: getSelectedOrder(state),
        lecturesAttending: getSelectedOrder(state).publicCourseParticipants[ownProps.participantId].lecturesAttending,
        courseId: getSelectedPublicCourse(state).id
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
        onLectureCheck: (lectureId, isAttending) => dispatch(updatePublicCourseLectureParticipating(lectureId, isAttending, ownProps.participantId)),
        onDelete: () => dispatch(removeParticipant(ownProps.participantId))
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        participantId: ownProps.participantId,
        lecturesAttending: stateProps.lecturesAttending,
        selectedPublicCourseLectures: stateProps.selectedPublicCourseLectures,
        onDelete: dispatchProps.onDelete,
        onLectureCheck: dispatchProps.onLectureCheck,
        courseId: stateProps.courseId,
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicCourseParticipant);

Container.propTypes = {
    participantId: PropTypes.number.isRequired,
};

export default Container;