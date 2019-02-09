import React from 'react';
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedText
} from "../../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import {Size} from "../../../../../util/Constants/Size";
import {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";

export default function CourseLecturesInstance(props: CourseLecturesInstanceProps) {
    const index = props.lectureId;

    if (!props.showGuestLecturerDetails) {
        return (<PublicCourseLectureConnectedCheckBox lectureId={index} name="guestLecturer"/>);
    }
    return (
        <span style={flexStyle}>
                <PublicCourseLectureConnectedCheckBox lectureId={index} name="guestLecturer"/>
                 <PublicCourseLectureConnectedText lectureId={index} name="guestLecturerName" size={Size.M}/>
                 <PublicCourseLectureConnectedText lectureId={index} name="guestLecturerCost" size={Size.L}/>
            </span>
    );
}

interface CourseLecturesInstanceProps {
    lectureId: number;
    showGuestLecturerDetails: boolean;
}
