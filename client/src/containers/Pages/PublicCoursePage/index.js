import React from 'react';
import PublicCoursePageTitle from './PublicCoursePageTitleContainer';
import PublicCoursePageSections from './Sections';
import PublicCourseActionButtons from "./ActionButtons";

export default class PublicCoursePage extends React.Component {

    render() {

        return (
            <div>
                <PublicCoursePageTitle/>

                <PublicCourseActionButtons/>

                <PublicCoursePageSections/>
            </div>
        );
    }
}
