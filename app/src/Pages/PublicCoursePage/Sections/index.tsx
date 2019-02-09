import React from 'react';
import CourseDetailsSection from "./CourseDetails/CourseDetailsSectionContainer";
import CourseLecturesSection from "./Lectures/LecturesList/CourseLecturesSectionContainer";
import CourseParticipantsTableContainer from "./CourseDetails/CourseParticipantsTableContainer";
import CourseLecturesDetailsTableContainer from "./CourseDetails/CourseLecturesDetailsTableContainer";

export default class PublicCourseSections extends React.Component {
    render() {
        return (
            <div>
                <CourseDetailsSection/>

                <CourseLecturesSection/>

                <CourseParticipantsTableContainer/>
                <CourseLecturesDetailsTableContainer/>
            </div>
        );
    }
}
