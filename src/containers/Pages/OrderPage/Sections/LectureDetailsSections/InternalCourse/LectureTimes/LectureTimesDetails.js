import React from 'react';
import SingleLectureTime from "./SingleLectureTime";
import PropTypes from "prop-types";
import _ from 'lodash';

export default class LectureTimesDetails extends React.Component {
    render() {
        return _.map(this.props.lectureTimesIndexes, index =>
            <SingleLectureTime
                key={index}
                lectureTimeIndex={index}
                offeredLectures={this.props.offeredLectures}
            />
        );
    }
}

LectureTimesDetails.propTypes = {
    lectureTimesIndexes: PropTypes.array,
    offeredLectures: PropTypes.array,
};
