import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {
    PublicCourseConnectedText,
    PublicCourseConnectedToggle
} from "../ConnectedCustomComponents/PublicCourseCustomFields";
import Sizes from "../../../../../util/consts/sizes";

export default class CourseDetailsSection extends React.Component {

    render() {

        return (
            <CustomPaper title={this.props.sectionName}>
                <div style={flexStyle}>
                    <PublicCourseConnectedText name="courseName" size={Sizes.XL}/>
                    <PublicCourseConnectedText name="courseLocation"/>
                    <PublicCourseConnectedText name="mealCost"/>
                    <PublicCourseConnectedText name="distance"/>
                    <PublicCourseConnectedToggle name="roomsApproved"/>
                </div>
            </CustomPaper>
        );
    }
}

CourseDetailsSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
};
