import React from 'react';
import CustomPaper, {flexStyle} from "../../../../../components/CustomComponents/CustomPaper";
import PropTypes from "prop-types";
import {
    PublicCourseConnectedText,
    PublicCourseConnectedToggle
} from "../ConnectedCustomComponents/PublicCourseCustomFields";
import Sizes from "../../../../../util/Constants/Sizes";

export default class CourseDetailsSection extends React.Component {

    render() {

        return (
            <CustomPaper title={this.props.sectionName}>
                <div style={flexStyle}>
                    <PublicCourseConnectedText name="courseName" size={Sizes.XL}/>
                    <PublicCourseConnectedText name="courseCity"/>
                    <PublicCourseConnectedText name="courseLocation"/>
                    <PublicCourseConnectedText name="mealCost"/>
                    <PublicCourseConnectedText name="distanceCost"/>
                </div>
                <div style={flexStyle}>
                    <PublicCourseConnectedToggle name="roomsApproved"/>
                    <PublicCourseConnectedToggle name="printedMaterials"/>
                    <PublicCourseConnectedToggle name="printedCertificates"/>
                </div>
            </CustomPaper>
        );
    }
}

CourseDetailsSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
};
