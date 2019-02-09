import React from 'react';
import PropTypes from 'prop-types';
import {Size} from "../../../../../../util/Constants/Size";
import {
    LectureTimesCustomAutoComplete,
    LectureTimesCustomDatePicker,
    LectureTimesCustomText
} from "../../../ConnectedCustomComponents/LectureTimesCustomFields";
import {flexStyle} from "../../../../../../Components/CustomComponents/CustomPaper";
import IndexAvatar from "../../../../../../Components/IndexAvatar";
import DeleteLectureTimeButton from "./DeleteLectureTimeButton";

export default class SingleLectureTime extends React.Component {
    render() {
        const lectureTimeIndex = this.props.lectureTimeIndex;

        return (
            <div style={flexStyle}>
                <IndexAvatar
                    index={this.props.index + 1}
                />

                <LectureTimesCustomDatePicker lectureTimeIndex={lectureTimeIndex} name="date"/>
                <LectureTimesCustomAutoComplete lectureTimeIndex={lectureTimeIndex} name="topic"
                                                suggestions={this.props.offeredLectures} size={Size.XXL}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="startTime" size={Size.M}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="endTime" size={Size.M}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="duration" size={Size.S}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="audienceSize" size={Size.M}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="tie" size={Size.M}/>

                <DeleteLectureTimeButton lectureTimeIndex={lectureTimeIndex}/>
            </div>
        );
    }
}

SingleLectureTime.propTypes = {
    lectureTimeIndex: PropTypes.number,
    index: PropTypes.number,
    offeredLectures: PropTypes.array,
};
