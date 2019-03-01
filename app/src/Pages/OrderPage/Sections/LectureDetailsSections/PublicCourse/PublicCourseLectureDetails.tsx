import React from "react";
import _ from "lodash";
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import AddParticipantButtonContainer from "./AddParticipantButtonContainer";
import PublicCourseParticipantContainer from "./PublicCourseParticipantContainer";
import CourseSelectorContainer from "./CourseSelectorContainer";
import {OrderCustomToggle} from "../../ConnectedCustomComponents/OrderCustomFields";

export default function PublicCourseLectureDetails(props: PublicCourseLectureDetails) {
    return (
        <CustomPaper title="הרשמה לקורס ציבורי">
            <div style={flexStyle}>
                <CourseSelectorContainer/>

                <AddParticipantButtonContainer/>

                <OrderCustomToggle title="הזמנה אושרה" name="orderApproved"/>
            </div>

            {_.map(_.range(props.numberOfParticipants), (participantId) =>
                <PublicCourseParticipantContainer key={participantId} participantId={participantId}/>)}
        </CustomPaper>
    );
}

interface PublicCourseLectureDetails {
    numberOfParticipants: number,
}
