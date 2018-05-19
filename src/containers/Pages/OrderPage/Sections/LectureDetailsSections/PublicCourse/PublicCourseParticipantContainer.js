import {connect} from 'react-redux';
import PropTypes from "prop-types";
import PublicCourseParticipant from "./PublicCourseParticipant";
import {getSelectedOrder, getSelectedPublicCourse} from "../../../../../../store/selected/reducer";
import * as Immutable from "seamless-immutable";
import {updateSelectedOrder} from "../../../../../../store/selected/actions";

function mapStateToProps(state) {
    return {
        selectedPublicCourseLectures: getSelectedPublicCourse(state) ? getSelectedPublicCourse(state).lectures : [],
        selectedOrder: getSelectedOrder(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateSelectedOrder: (key, value) => dispatch(updateSelectedOrder(key, value)),
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
        selectedPublicCourseLectures: stateProps.selectedPublicCourseLectures,
        onDelete: () => removeParticipant(stateProps.selectedOrder, dispatchProps.updateSelectedOrder, ownProps.participantId)
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicCourseParticipant);

Container.propTypes = {
    participantId: PropTypes.number.isRequired,
};

export default Container;