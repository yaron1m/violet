import React from "react";
import {Size} from "../../../../../../Util/Constants/Size";
import {
    LectureTimesCustomAutoComplete,
    LectureTimesCustomDatePicker,
    LectureTimesCustomText
} from "../../../ConnectedCustomComponents/LectureTimesCustomFields";
import IndexAvatar from "../../../../../../Components/IndexAvatar";
import DeleteLectureTimeButton from "./DeleteLectureTimeButton";
import {ISuggestion} from "../../../../../../Components/AutoSuggest";
import PreparationTimesContainer from "./PreparationTimesContainer";

const styles = {
    container: {
        display: "flex" as "flex",
    },
    content: {
        display: "flex" as "flex",
        flexDirection: "column" as "column",
    },
    row: {
        display: "flex" as "flex",
        flexWrap: "wrap" as "wrap",
    }
};
export default function SingleLectureTime(props: SingleLectureTime) {
    const lectureTimeIndex = props.lectureTimeIndex;

    return (
        <div style={styles.container}>
            <IndexAvatar index={props.index + 1}/>

            <div style={styles.content}>
                <div style={styles.row}>
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

                <PreparationTimesContainer lectureTimeIndex={lectureTimeIndex}/>
            </div>


        </div>
    );
}

interface SingleLectureTime {
    lectureTimeIndex: number;
    index: number;
    offeredLectures: ISuggestion[];
}
