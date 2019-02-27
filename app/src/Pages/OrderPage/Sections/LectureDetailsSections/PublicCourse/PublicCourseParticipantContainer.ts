import {connect} from "react-redux";
import PublicCourseParticipant from "./PublicCourseParticipant";
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {removeParticipant, updatePublicCourseLectureParticipating, updatePublicCourseParticipant} from "../../../../../Store/SelectedOrder/Actions";
import {getSelectedPublicCourse, getSelectedPublicCourseLectures} from "../../../../../Store/SelectedPublicCourse/Selectors";
import {IDispatch, IState} from "../../../../../Interfaces/ReduxInterfaces";
import {isRightTabKey} from "../../../../../Store/Appearance/RequiredFields/Util";
import {TabKey} from "../../../../../Util/Constants/Status";
import {getRequiredFieldsObject} from "../../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";

interface PublicCourseParticipantContainerProps {
    participantId: number
}

function mapStateToProps(state: IState, ownProps: PublicCourseParticipantContainerProps) {
    return {
        participant: getSelectedOrder(state).publicCourseParticipants[ownProps.participantId],
        requiredFields: isRightTabKey(getSelectedOrder(state), TabKey.publicCourseTabKey) ? getRequiredFieldsObject(state).publicCourse : [],
        selectedPublicCourseLectures: getSelectedPublicCourseLectures(state),
        courseId: getSelectedPublicCourse(state).id
    };
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: PublicCourseParticipantContainerProps) {
    return {
        updatePublicCourseParticipant: (key: string) => (value: string) =>
            dispatch(updatePublicCourseParticipant(key, value, ownProps.participantId)),
        updatePublicCourseParticipantBoolean: (key: string) => (value: boolean) =>
            dispatch(updatePublicCourseParticipant(key, value, ownProps.participantId)),
        onLectureCheck: (lectureId: number, isAttending: boolean) =>
            dispatch(updatePublicCourseLectureParticipating(lectureId, isAttending, ownProps.participantId)),
        onDelete: () => dispatch(removeParticipant(ownProps.participantId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicCourseParticipant);