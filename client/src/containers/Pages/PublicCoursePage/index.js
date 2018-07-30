import React from 'react';
import PublicCoursePageTitle from './PublicCoursePageTitleContainer';
import PublicCoursePageSections from './Sections';
import PublicCourseActionButtons from "./ActionButtons";
import CourseParticipantsTableContainer from "./Sections/CourseParticipants/CourseParticipantsTableContainer";

export default class OrderForm extends React.Component {

    render() {

        return (
            <div>
                <PublicCoursePageTitle/>

                <PublicCourseActionButtons/>

                <PublicCoursePageSections/>

                <CourseParticipantsTableContainer/>
            </div>
        );
    }
}
