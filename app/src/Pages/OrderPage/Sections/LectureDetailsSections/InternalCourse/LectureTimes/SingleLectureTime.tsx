import React from "react";
import _ from "lodash";
import {Size} from "../../../../../../Util/Constants/Size";
import IndexAvatar from "../../../../../../Components/IndexAvatar";
import DeleteLectureTimeButton from "./DeleteLectureTimeButton";
import {ISuggestion} from "../../../../../../Components/AutoSuggest";
import {ILectureTime} from "../../../../../../Interfaces/IOrder";
import CustomDatePicker from "../../../../../../Components/CustomComponents/CustomDatePicker";
import CustomAutoComplete from "../../../../../../Components/CustomComponents/CustomAutoComplete";
import CustomTextField from "../../../../../../Components/CustomComponents/CustomTextField";
import PreparationTimes from "./PreparationTimes";

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
                    <CustomDatePicker
                        title="תאריך"
                        value={props.lectureTime.date}
                        onChange={props.onChange("date")}
                        isRequired={_.includes(props.requiredFields, "date")}
                    />
                    <CustomAutoComplete
                        title="נושא"
                        value={props.lectureTime.topic}
                        onChange={props.onChange("topic")}
                        suggestions={props.offeredLectures}
                        isRequired={_.includes(props.requiredFields, "topic")}
                        size={Size.XXL}
                    />

                    <CustomTextField
                        title="שעת התחלה"
                        value={props.lectureTime.startTime}
                        onChange={props.onChange("startTime")}
                        isRequired={_.includes(props.requiredFields, "startTime")}
                        size={Size.S}
                    />
                    <CustomTextField
                        title="שעת סיום"
                        value={props.lectureTime.endTime}
                        onChange={props.onChange("endTime")}
                        isRequired={_.includes(props.requiredFields, "endTime")}
                        size={Size.S}
                    />
                    <CustomTextField
                        title="משך"
                        value={props.lectureTime.duration}
                        onChange={props.onChange("duration")}
                        isRequired={_.includes(props.requiredFields, "duration")}
                        size={Size.S}
                    />
                    <CustomTextField
                        title="מס' משתתפים"
                        value={props.lectureTime.audienceSize}
                        onChange={props.onChange("audienceSize")}
                        isRequired={_.includes(props.requiredFields, "audienceSize")}
                        size={Size.S}/>
                    <CustomTextField
                        title="עניבה"
                        value={props.lectureTime.tie}
                        onChange={props.onChange("tie")}
                        isRequired={_.includes(props.requiredFields, "tie")}
                        size={Size.M}
                    />
                    <CustomTextField
                        title="זמן נסיעה"
                        value={props.lectureTime.travelTime}
                        onChange={props.onChange("travelTime")}
                        isRequired={_.includes(props.requiredFields, "travelTime")}
                        size={Size.S}
                    />
                    <DeleteLectureTimeButton lectureTimeIndex={lectureTimeIndex}/>
                </div>

                <PreparationTimes lectureTime={props.lectureTime}/>
            </div>
        </div>
    );
}

interface SingleLectureTime {
    lectureTimeIndex: number;
    lectureTime: ILectureTime;
    onChange: (key: string) => (value: string) => void;
    requiredFields: string[];
    index: number;
    offeredLectures: ISuggestion[];
}
