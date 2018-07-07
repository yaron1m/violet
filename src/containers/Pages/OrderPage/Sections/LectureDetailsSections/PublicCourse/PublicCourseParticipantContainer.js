import {connect} from 'react-redux';
import PropTypes from "prop-types";
import PublicCourseParticipant from "./PublicCourseParticipant";
import {getSelectedOrder} from "../../../../../../store/SelectedOrder/Selectors";
import * as Immutable from "seamless-immutable";
import {
    updatePublicCourseLectureParticipating,
    updateSelectedOrder
} from "../../../../../../store/SelectedOrder/Actions";
import {getSelectedPublicCourse} from "../../../../../../store/SelectedPublicCourse/Selectors";

function mapStateToProps(state, ownProps) {
    return {
        selectedPublicCourseLectures: getSelectedPublicCourse(state) ? getSelectedPublicCourse(state).lectures : [],
        selectedOrder: getSelectedOrder(state),
        lecturesAttending: getSelectedOrder(state).publicCourseParticipants[ownProps.participantId].lecturesAttending
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
        onLectureCheck: (lectureId, isAttending) => dispatch(updatePublicCourseLectureParticipating(lectureId, isAttending, ownProps.participantId))
    };
}

export function removeParticipant(selectedOrder, updateSelectedOrder, participantId) {
    const thisSelectedOrder = Immutable.asMutable(selectedOrder, {deep: true});
    const publicCourseParticipants = thisSelectedOrder.publicCourseParticipants;
    publicCourseParticipants.splice(participantId, 1);

    updateSelectedOrder("publicCourseParticipants", publicCourseParticipants);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        participantId: ownProps.participantId,
        lecturesAttending: stateProps.lecturesAttending,
        selectedPublicCourseLectures: stateProps.selectedPublicCourseLectures,
        onDelete: () => removeParticipant(stateProps.selectedOrder, dispatchProps.updateSelectedOrder, ownProps.participantId),
        onLectureCheck: dispatchProps.onLectureCheck,
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicCourseParticipant);

Container.propTypes = {
    participantId: PropTypes.number.isRequired,
};

export default Container;