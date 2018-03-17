import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import {PublicCourseLectureConnectedText} from "../ConnectedCustomComponents/PublicCourseLectureConnectedFields";

export default class CourseLecturesInstance extends React.Component {

    render() {
        return (
            <CustomPaper >
                <PublicCourseLectureConnectedText lectureId={this.props.lectureId} name="topic"/>
            </CustomPaper>
        );
    }
}

CourseLecturesInstance.propTypes = {
    lectureId: PropTypes.string.isRequired,
};
