import React from 'react';
import SingleLectureTime from "./SingleLectureTime";
import PropTypes from "prop-types";
import CustomPaper from "../../../../../../../Components/CustomComponents/CustomPaper";
import CustomDivider from "../../../../../../../Components/CustomComponents/CustomDivider";
import AddLectureTimeButtonContainer from "./AddLectureTimeButtonContainer";

export default class LectureTimesDetails extends React.Component {
    render() {
        if (this.props.lectureTimesIndexes.length === 0)
            return <AddLectureTimeButtonContainer/>;

        return (
            <React.Fragment>
                <AddLectureTimeButtonContainer/>
                <CustomPaper>
                    {this.props.lectureTimesIndexes.map((lectureTimeIndex, order) =>
                        <React.Fragment key={lectureTimeIndex}>
                            <SingleLectureTime
                                key={lectureTimeIndex}
                                index={order}
                                lectureTimeIndex={lectureTimeIndex}
                                offeredLectures={this.props.offeredLectures}
                            />

                            {order < this.props.lectureTimesIndexes.length - 1 ? <CustomDivider/> : null}
                        </React.Fragment>
                    )}
                </CustomPaper>
            </React.Fragment>
        )
    }
}

LectureTimesDetails.propTypes = {
    lectureTimesIndexes: PropTypes.array,
    offeredLectures: PropTypes.array,
};
