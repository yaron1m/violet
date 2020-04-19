import React from "react";
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../../Util/Constants/Size";
import _ from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";
import {CustomIconButton} from "../../../../../Components/CustomComponents/CustomButtons";
import {IPublicCourseLecture, IPublicCourseParticipant, toPrintableDateFormat} from "@violet/common";
import CustomTextField from "../../../../../Components/CustomComponents/CustomTextField";
import CustomCheckbox from "../../../../../Components/CustomComponents/CustomCheckbox";

export default function PublicCourseParticipant(props: PublicCourseParticipantProps) {
    return (
        <CustomPaper>
            <div style={flexStyle}>
                <CustomTextField
                    title="שם פרטי"
                    value={props.participant.participantFirstName}
                    isRequired={_.includes(props.requiredFields, "participantFirstName")}
                    onChange={props.updatePublicCourseParticipant("participantFirstName")}
                />
                <CustomTextField
                    title="שם משפחה"
                    value={props.participant.participantLastName}
                    isRequired={_.includes(props.requiredFields, "participantLastName")}
                    onChange={props.updatePublicCourseParticipant("participantLastName")}
                />
                <CustomTextField
                    title="שם פרטי באנגלית"
                    value={props.participant.participantEnglishFirstName}
                    isRequired={_.includes(props.requiredFields, "participantEnglishFirstName")}
                    onChange={props.updatePublicCourseParticipant("participantEnglishFirstName")}
                />
                <CustomTextField
                    title="שם משפחה באנגלית"
                    value={props.participant.participantEnglishLastName}
                    isRequired={_.includes(props.requiredFields, "participantEnglishLastName")}
                    onChange={props.updatePublicCourseParticipant("participantEnglishLastName")}
                />
                <CustomTextField
                    title="תעודת זהות"
                    value={props.participant.idNumber}
                    isRequired={_.includes(props.requiredFields, "idNumber")}
                    onChange={props.updatePublicCourseParticipant("idNumber")}
                />
                <CustomTextField
                    title="טלפון"
                    value={props.participant.phone}
                    isRequired={_.includes(props.requiredFields, "phone")}
                    onChange={props.updatePublicCourseParticipant("phone")}
                />
                <CustomTextField
                    title="מייל"
                    value={props.participant.email}
                    isRequired={_.includes(props.requiredFields, "email")}
                    onChange={props.updatePublicCourseParticipant("email")}
                    size={Size.XL}
                />
                <CustomTextField
                    title="תפקיד"
                    value={props.participant.job}
                    isRequired={_.includes(props.requiredFields, "job")}
                    onChange={props.updatePublicCourseParticipant("job")}
                    size={Size.XL}
                />
                <CustomCheckbox
                    title="חבר איגוד"
                    value={props.participant.isqMember}
                    isRequired={_.includes(props.requiredFields, "isqMember")}
                    onChange={props.updatePublicCourseParticipantBoolean("isqMember")}
                />
                <CustomTextField
                    title="מחיר השתתפות"
                    value={props.participant.participantCost}
                    isRequired={_.includes(props.requiredFields, "participantCost")}
                    onChange={props.updatePublicCourseParticipant("participantCost")}
                />

                <CustomIconButton onClick={props.onDelete}>
                    <DeleteIcon/>
                </CustomIconButton>
            </div>
            <div>
                {_.map(props.selectedPublicCourseLectures,
                    lecture => {
                        const isAttending = props.participant.lecturesAttending ? _.includes(props.participant.lecturesAttending, lecture.id) : false;
                        return (
                            <CustomCheckbox
                                key={props.courseId + "-" + lecture.id}
                                value={isAttending}
                                title={toPrintableDateFormat(new Date(lecture.date)) + " - " + lecture.topic}
                                onChange={(value: boolean) => props.onLectureCheck(lecture.id, value)}
                            />
                        );
                    })}
            </div>
        </CustomPaper>
    );
}

interface PublicCourseParticipantProps {
    participant: IPublicCourseParticipant;
    requiredFields: string[];
    updatePublicCourseParticipant: (filedName: string) => (value: string) => void;
    updatePublicCourseParticipantBoolean: (filedName: string) => (value: boolean) => void;
    onLectureCheck: (lectureId: number, isAttending: boolean) => void;
    selectedPublicCourseLectures: IPublicCourseLecture[];
    onDelete: () => void;
    courseId: number;
}
