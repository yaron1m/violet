import React from 'react';
import PublicCoursePageTitle from './PublicCoursePageTitleContainer';
import PublicCoursePageSections from './Sections';
import PublicCourseActionButtons from "./ActionButtons";
import CourseParticipantsTableContainer from "./Sections/CourseDetails/CourseParticipantsTableContainer";
import CourseLecturesDetailsTableContainer from "./Sections/CourseDetails/CourseLecturesDetailsTableContainer";

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <PublicCoursePageTitle/>

                <PublicCourseActionButtons/>

                <PublicCoursePageSections/>

                <CourseParticipantsTableContainer/>
                <CourseLecturesDetailsTableContainer/>
            </div>
        );
    }
}
