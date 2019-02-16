import React from 'react';
import PublicCoursePageTitle from './PublicCoursePageTitleContainer';
import PublicCoursePageSections from './Sections';
import PublicCourseActionButtons from "./ActionButtons";

export default function PublicCoursePage() {
    return (
        <div>
            <PublicCoursePageTitle/>

            <PublicCourseActionButtons/>

            <PublicCoursePageSections/>
        </div>
    );
}
