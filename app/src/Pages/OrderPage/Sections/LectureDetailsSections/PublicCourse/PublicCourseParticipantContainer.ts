import {connect} from 'react-redux';
import PublicCourseParticipant from './PublicCourseParticipant';
import {getSelectedOrder} from '../../../../../Store/SelectedOrder/Selectors';
import {removeParticipant, updatePublicCourseLectureParticipating, updateSelectedOrder} from '../../../../../Store/SelectedOrder/Actions';
import {getSelectedPublicCourse, getSelectedPublicCourseLectures} from '../../../../../Store/SelectedPublicCourse/Selectors';
import {IDispatch, IState} from '../../../../../Interfaces/ReduxInterfaces';
import {IPublicCourseLecture} from '../../../../../Interfaces/IPublicCourse';
import IOrder from '../../../../../Interfaces/IOrder';

interface PublicCourseParticipantContainerProps {
    participantId: number
}

function mapStateToProps(state: IState, ownProps: PublicCourseParticipantContainerProps) {
    return {
        selectedPublicCourseLectures: getSelectedPublicCourseLectures(state),
        selectedOrder: getSelectedOrder(state),
        lecturesAttending: getSelectedOrder(state).publicCourseParticipants[ownProps.participantId].lecturesAttending,
        courseId: getSelectedPublicCourse(state).id
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: PublicCourseParticipantContainerProps) {
    return {
        updateSelectedOrder: (key: string, value: any) => dispatch(updateSelectedOrder(key, value)),
        onLectureCheck: (lectureId: number, isAttending: boolean) => dispatch(updatePublicCourseLectureParticipating(lectureId, isAttending, ownProps.participantId)),
        onDelete: () => dispatch(removeParticipant(ownProps.participantId))
    };
}

function mergeProps(stateProps: {
    selectedPublicCourseLectures: IPublicCourseLecture[]; selectedOrder: IOrder; lecturesAttending: number[]; courseId: number;
}, dispatchProps: {
    updateSelectedOrder: (key: string, value: any) => void; onLectureCheck: (lectureId: number, isAttending: boolean) => void; onDelete: () => void;
}, ownProps: PublicCourseParticipantContainerProps) {
    return {
        participantId: ownProps.participantId,
        lecturesAttending: stateProps.lecturesAttending,
        selectedPublicCourseLectures: stateProps.selectedPublicCourseLectures,
        onDelete: dispatchProps.onDelete,
        onLectureCheck: dispatchProps.onLectureCheck,
        courseId: stateProps.courseId,
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PublicCourseParticipant);