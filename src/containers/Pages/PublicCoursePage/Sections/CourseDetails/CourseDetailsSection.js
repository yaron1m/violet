import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {PublicCourseConnectedText} from "../ConnectedCustomComponents/PublicCourseCustomFields";

export default class CourseDetailsSection extends React.Component {

    render() {

        return (
            <CustomPaper title={this.props.sectionName}>
                <PublicCourseConnectedText name="courseName"/>
                <PublicCourseConnectedText name="courseLocation"/>
            </CustomPaper>
        );
    }
}

CourseDetailsSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
};
