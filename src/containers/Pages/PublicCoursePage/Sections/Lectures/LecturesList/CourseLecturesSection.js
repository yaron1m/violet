import React from 'react';
import CustomPaper from "../../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import _ from 'lodash';
import CourseLecturesInstanceContainer from "./CourseLecturesInstanceContainer";
import AddCourseLectureButtonContainer from "../AddLectureButton/AddCourseLectureButtonContainer";

export default class CourseLecturesSection extends React.Component {

    render() {
        return (
            <CustomPaper title={this.props.sectionName}>
                <AddCourseLectureButtonContainer/>

                {_.map(this.props.lecturesIds, (lectureId, index) =>
                    <CourseLecturesInstanceContainer
                        key={index}
                        index={index + 1}
                        lectureId={lectureId}
                    />
                )}
            </CustomPaper>
        );
    }
}

CourseLecturesSection.propTypes = {
    sectionName: PropTypes.string.isRequired,
    lecturesIds: PropTypes.array.isRequired,
};
