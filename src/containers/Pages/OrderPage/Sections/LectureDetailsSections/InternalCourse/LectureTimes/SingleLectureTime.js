import React from 'react';
import PropTypes from 'prop-types';
import Sizes from "../../../../../../../util/consts/sizes";
import {
    LectureTimesCustomAutoComplete,
    LectureTimesCustomDatePicker,
    LectureTimesCustomText
} from "../../../ConnectedCustomComponents/LectureTimesCustomFields";
import CustomPaper, {flexStyle} from "../../../../../../../components/CustomComponents/CustomPaper";

export default class SingleLectureTime extends React.Component {
    render() {
        const index = this.props.lectureTimeIndex;

        return (
            <CustomPaper style={flexStyle}>
                <LectureTimesCustomDatePicker lectureTimeIndex={index} name="date"/>
                <LectureTimesCustomAutoComplete lectureTimeIndex={index} name="topic"
                                                suggestions={this.props.offeredLectures} size={Sizes.XXL}/>
                <LectureTimesCustomText lectureTimeIndex={index} name="startTime" size={Sizes.M}/>
                <LectureTimesCustomText lectureTimeIndex={index} name="endTime" size={Sizes.M}/>
                <LectureTimesCustomText lectureTimeIndex={index} name="audienceSize" size={Sizes.M}/>
                <LectureTimesCustomText lectureTimeIndex={index} name="tie" size={Sizes.M}/>
            </CustomPaper>
        );
    }
}

SingleLectureTime.propTypes = {
    lectureTimeIndex: PropTypes.number,
    offeredLectures: PropTypes.array,
};

