import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import {
    PublicCourseParticipantsCustomCheckBox,
    PublicCourseParticipantsCustomText
} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";
import {Size} from "../../../../../util/Constants/Size";
import _ from 'lodash';
import PropTypes from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';
import {CustomIconButton} from "../../../../../Components/CustomComponents/CustomButtons";

export default class PublicCourseParticipant extends React.Component {

    render() {
        const participantId = this.props.participantId;

        return (
            <CustomPaper>
                <div style={flexStyle}>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantFirstName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantEnglishFirstName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId}
                                                        name="participantEnglishLastName"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="idNumber"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="phone"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="job"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="email"
                                                        size={Size.XL}/>
                    <PublicCourseParticipantsCustomCheckBox participantIndex={participantId}
                                                            name="isqMember"/>
                    <PublicCourseParticipantsCustomText participantIndex={participantId} name="participantCost"/>
                    <CustomIconButton onClick={this.props.onDelete}>
                        <DeleteIcon/>
                    </CustomIconButton>
                </div>
                <div>
                    {_.map(this.props.selectedPublicCourseLectures,
                        lecture => {
                            const isAttending = this.props.lecturesAttending ? this.props.lecturesAttending.includes(lecture.id) : false;
                            return (
                                <PublicCourseParticipantsCustomCheckBox
                                    key={this.props.courseId + "-" + lecture.id}
                                    participantIndex={participantId}
                                    name="publicCourseLecture"
                                    values={{publicCourseLecture: isAttending}}
                                    titles={{publicCourseLecture: new Date(lecture.date).toLocaleDateString() + " - " + lecture.topic}}
                                    updateAction={(key, value) => this.props.onLectureCheck(lecture.id, value)}
                                />
                            )
                        })}
                </div>
            </CustomPaper>
        );
    }
}

PublicCourseParticipant.propTypes = {
    participantId: PropTypes.number.isRequired,
    selectedPublicCourseLectures: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onLectureCheck: PropTypes.func.isRequired,
    lecturesAttending: PropTypes.array,
    courseId: PropTypes.number,
};
