import React from 'react';
import {Size} from "../../../../../../Util/Constants/Size";
import {
    LectureTimesCustomAutoComplete,
    LectureTimesCustomDatePicker,
    LectureTimesCustomText
} from "../../../ConnectedCustomComponents/LectureTimesCustomFields";
import {flexStyle} from "../../../../../../Components/CustomComponents/CustomPaper";
import IndexAvatar from "../../../../../../Components/IndexAvatar";
import DeleteLectureTimeButton from "./DeleteLectureTimeButton";
import {ISuggestion} from '../../../../../../Components/AutoSuggest';

export default function SingleLectureTime(props: SingleLectureTime) {
    const lectureTimeIndex = props.lectureTimeIndex;

    return (
        <div style={flexStyle}>
            <IndexAvatar index={props.index + 1}/>

            <LectureTimesCustomDatePicker lectureTimeIndex={lectureTimeIndex} name="date"/>
            <LectureTimesCustomAutoComplete lectureTimeIndex={lectureTimeIndex} name="topic"
                                            suggestions={props.offeredLectures} size={Size.XXL}/>
            <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="startTime" size={Size.S}/>
            <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="endTime" size={Size.S}/>
            <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="duration" size={Size.S}/>
            <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="audienceSize" size={Size.S}/>
            <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="tie" size={Size.M}/>
            <LectureTimesCustomText lectureTimeIndex={lectureTimeIndex} name="travelTime" size={Size.S}/>

            <DeleteLectureTimeButton lectureTimeIndex={lectureTimeIndex}/>
        </div>
    );
}

interface SingleLectureTime {
    lectureTimeIndex: number;
    index: number;
    offeredLectures: ISuggestion[];
}
