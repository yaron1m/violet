import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import {
    PublicCourseParticipantsCustomCheckBox,
    PublicCourseParticipantsCustomText
} from "../../ConnectedCustomComponents/PublicCourseParticipantsCustomFields";
import {Size} from "../../../../../Util/Constants/Size";
import _ from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import {CustomIconButton} from "../../../../../Components/CustomComponents/CustomButtons";
import {IPublicCourseLecture} from "../../../../../Interfaces/IPublicCourse";

export default function PublicCourseParticipant(props: PublicCourseParticipantProps) {
    const participantId = props.participantId;

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
                <CustomIconButton onClick={props.onDelete}>
                    <DeleteIcon/>
                </CustomIconButton>
            </div>
            <div>
                {_.map(props.selectedPublicCourseLectures,
                    lecture => {
                        const isAttending = props.lecturesAttending ? _.includes(props.lecturesAttending, lecture.id) : false;
                        return (
                            <PublicCourseParticipantsCustomCheckBox
                                key={props.courseId + "-" + lecture.id}
                                participantIndex={participantId}
                                name="publicCourseLecture"
                                values={{publicCourseLecture: isAttending}}
                                titles={{publicCourseLecture: new Date(lecture.date).toLocaleDateString() + " - " + lecture.topic}}
                                updateAction={(key: string, value: any) => props.onLectureCheck(lecture.id, value)}
                            />
                        );
                    })}
            </div>
        </CustomPaper>
    );
}

interface PublicCourseParticipantProps {
    participantId: number;
    selectedPublicCourseLectures: IPublicCourseLecture[];
    onDelete: () => void;
    onLectureCheck: (lectureId: number, isAttending: boolean) => void;
    lecturesAttending: number[];
    courseId: number;
}
