import React from "react";
import CustomPaper from "../../../../../Components/CustomComponents/CustomPaper";
import _ from 'lodash';
import CourseLecturesInstanceContainer from "./CourseLecturesInstanceContainer";
import AddCourseLectureButtonContainer from "../AddLectureButton/AddCourseLectureButtonContainer";

export default function CourseLecturesSection(props: CourseLecturesSectionProps) {
    return (
        <CustomPaper title={props.sectionName}>
            <AddCourseLectureButtonContainer/>

            {_.map(props.lecturesIds, (lectureId, index) =>
                <CourseLecturesInstanceContainer
                    key={lectureId}
                    index={index + 1}
                    lectureId={lectureId}
                />
            )}
        </CustomPaper>
    );
}

interface CourseLecturesSectionProps {
    sectionName: string;
    lecturesIds: number[];
}
