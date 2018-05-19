import React from 'react';
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedText
} from "../../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import Sizes from "../../../../../../util/consts/sizes";
import {flexStyle} from "../../../../../../components/custom-components/CustomPaper";

export default class CourseLecturesInstance extends React.Component {

    render() {
        const index = this.props.lectureId;

        if (!this.props.showGuestLecturerDetails) {
            return (<PublicCourseLectureConnectedCheckBox lectureId={index} name="guestLecturer"/>)
        }
        return (
            <span style={flexStyle}>
                <PublicCourseLectureConnectedCheckBox lectureId={index} name="guestLecturer"/>
                 <PublicCourseLectureConnectedText lectureId={index} name="guestLecturerName" size={Sizes.M}/>
                 <PublicCourseLectureConnectedText lectureId={index} name="guestLecturerCost" size={Sizes.L}/>
            </span>
        );
    }
}

CourseLecturesInstance.propTypes = {
    lectureId: PropTypes.string.isRequired,
    showGuestLecturerDetails: PropTypes.bool,
};
