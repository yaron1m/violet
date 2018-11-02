import React from 'react';
import CustomPaper from "../../../../../../components/CustomComponents/CustomPaper";
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
                        key={lectureId}
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
