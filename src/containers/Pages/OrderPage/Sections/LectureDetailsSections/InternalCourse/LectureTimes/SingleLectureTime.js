import React from 'react';
import PropTypes from 'prop-types';
import Sizes from "../../../../../../../util/consts/sizes";
import {
    LectureTimesCustomAutoComplete,
    LectureTimesCustomDatePicker,
    LectureTimesCustomText
} from "../../../ConnectedCustomComponents/LectureTimesCustomFields";
import {flexStyle} from "../../../../../../../components/CustomComponents/CustomPaper";
import IndexAvatar from "../../../../../../../components/IndexAvatar";

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
                                                suggestions={this.props.offeredLectures} size={Sizes.XXL}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="startTime" size={Sizes.M}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="endTime" size={Sizes.M}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="audienceSize" size={Sizes.M}/>
                <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="tie" size={Sizes.M}/>
            </div>
        );
    }
}

SingleLectureTime.propTypes = {
    lectureTimeIndex: PropTypes.number,
    index: PropTypes.number,
    offeredLectures: PropTypes.array,
};
