import React from 'react';
import SingleLectureTime from "./SingleLectureTime";
import PropTypes from "prop-types";

export default class LectureTimesDetails extends React.Component {
    render() {
        return this.props.lectureTimesIndexes.map((lectureTimeIndex, order) =>
            <SingleLectureTime
                key={lectureTimeIndex}
                index={order}
                lectureTimeIndex={lectureTimeIndex}
                offeredLectures={this.props.offeredLectures}
            />
        );
    }
}

LectureTimesDetails.propTypes = {
    lectureTimesIndexes: PropTypes.array,
    offeredLectures: PropTypes.array,
};
