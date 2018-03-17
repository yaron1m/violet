import React from 'react';
import CustomPaper from "../../../../../components/custom-components/custom-paper";
import PropTypes from "prop-types";
import _ from 'lodash';
import CourseLecturesInstanceContainer from "./CourseLecturesInstanceContainer";

export default class CourseLecturesSection extends React.Component {

    render() {
        return (
            <CustomPaper title={this.props.sectionName}>
                {_.map(this.props.lecturesIds, lectureId =>
                    <CourseLecturesInstanceContainer
                        key={lectureId}
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
