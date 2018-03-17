import React from 'react';
import CourseDetailsSection from "./CourseDetails/CourseDetailsSectionContainer";
import CourseLecturesSection from "./Lectures/CourseLecturesSectionContainer";

export default class OrderForm extends React.Component {

    render() {
        return (
            <div>
                <CourseDetailsSection/>

                <CourseLecturesSection/>
            </div>
        );
    }
}
