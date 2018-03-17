import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {
    PublicCourseConnectedText,
    PublicCourseConnectedToggle
} from "../ConnectedCustomComponents/PublicCourseCustomFields";

export default class CourseDetailsSection extends React.Component {

    render() {

        return (
            <CustomPaper title={this.props.sectionName}>
                <div style={flexStyle}>
                    <PublicCourseConnectedText name="courseName"/>
                    <PublicCourseConnectedText name="courseLocation"/>
                    <PublicCourseConnectedText name="mealCost"/>
                    <PublicCourseConnectedText name="distance"/>
                    <PublicCourseConnectedToggle name="roomsApproved"/>
                </div>



                <button onClick={this.props.selectCourse}>
                    Select
                </button>
            </CustomPaper>
        );
    }
}

CourseDetailsSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
};
