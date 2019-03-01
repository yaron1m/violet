import React from "react";
import {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../../Util/Constants/Size";
import GuestLecturerFieldsContainer from "./GuestLecturerFieldsContainer";
import CustomDivider from "../../../../../Components/CustomComponents/CustomDivider";
import IndexAvatar from "../../../../../Components/IndexAvatar";
import {ISuggestion} from "../../../../../Components/AutoSuggest";
import {IPublicCourseLecture} from "../../../../../Interfaces/IPublicCourse";
import CustomTextField from "../../../../../Components/CustomComponents/CustomTextField";
import _ from "lodash";
import CustomDatePicker from "../../../../../Components/CustomComponents/CustomDatePicker";
import CustomAutoComplete from "../../../../../Components/CustomComponents/CustomAutoComplete";
import CustomCheckbox from "../../../../../Components/CustomComponents/CustomCheckbox";

export default function CourseLecturesInstance(props: CourseLecturesInstanceProps) {
    const index = props.lectureId;
    return (
        <div>
            <div style={flexStyle}>
                <IndexAvatar
                    index={props.index}
                />
                <CustomDatePicker
                    title="תאריך"
                    value={props.publicCourseLecture.date}
                    onChange={props.onChange("date")}
                    isRequired={_.includes(props.requiredFields, "date")}
                />
                <CustomAutoComplete
                    title="נושא"
                    value={props.publicCourseLecture.topic}
                    onChange={props.onChange("topic")}
                    suggestions={props.offeredLectures}
                    isRequired={_.includes(props.requiredFields, "topic")}
                    size={Size.XXL}
                />
                <CustomTextField
                    title="שעת התחלה"
                    value={props.publicCourseLecture.startTime}
                    onChange={props.onChange("startTime")}
                    isRequired={_.includes(props.requiredFields, "startTime")}
                    size={Size.M}
                />
                <CustomTextField
                    title="שעת סיום"
                    value={props.publicCourseLecture.endTime}
                    onChange={props.onChange("endTime")}
                    isRequired={_.includes(props.requiredFields, "endTime")}
                    size={Size.M}
                />
                <CustomTextField
                    title="משך"
                    value={props.publicCourseLecture.duration}
                    onChange={props.onChange("duration")}
                    isRequired={_.includes(props.requiredFields, "duration")}
                    size={Size.S}
                />
                <CustomTextField
                    title="עניבה"
                    value={props.publicCourseLecture.tie}
                    onChange={props.onChange("tie")}
                    isRequired={_.includes(props.requiredFields, "tie")}
                    size={Size.M}
                />
            </div>
            <div style={{...flexStyle, marginRight: 55}}>
                <CustomTextField
                    title="מחיר ללקוח"
                    value={props.publicCourseLecture.price}
                    onChange={props.onChange("price")}
                    isRequired={_.includes(props.requiredFields, "price")}
                    size={Size.M}
                />
                <CustomTextField
                    title="עלות החדר"
                    value={props.publicCourseLecture.roomCost}
                    onChange={props.onChange("roomCost")}
                    isRequired={_.includes(props.requiredFields, "roomCost")}
                    size={Size.M}
                />
                <CustomTextField
                    title="עמודים בחוברת"
                    value={props.publicCourseLecture.pages}
                    onChange={props.onChange("pages")}
                    isRequired={_.includes(props.requiredFields, "pages")}
                    size={Size.M}
                />
                <CustomCheckbox
                    title="מתקיים"
                    value={props.publicCourseLecture.active}
                    onChange={props.onChangeBoolean("active")}
                    isRequired={_.includes(props.requiredFields, "active")}
                />
                <GuestLecturerFieldsContainer lectureId={index}/>
            </div>
            <CustomDivider/>
        </div>
    );
}

interface CourseLecturesInstanceProps {
    publicCourseLecture: IPublicCourseLecture;
    onChange: (key: string) => (value: string) => void;
    onChangeBoolean: (key: string) => (value: boolean) => void;
    requiredFields: string[];
    lectureId: number;
    offeredLectures: ISuggestion[]
    index: number;
}
