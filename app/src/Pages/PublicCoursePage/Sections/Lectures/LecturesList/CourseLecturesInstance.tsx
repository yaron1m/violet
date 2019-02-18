import React from "react";
import {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import PropTypes from "prop-types";
import {
    PublicCourseLectureConnectedAutoComplete, PublicCourseLectureConnectedCheckBox,
    PublicCourseLectureConnectedDatePicker,
    PublicCourseLectureConnectedText
} from "../../ConnectedCustomComponents/PublicCourseLectureConnectedFields";
import {Size} from "../../../../../Util/Constants/Size";
import GuestLecturerFieldsContainer from "./GuestLecturerFieldsContainer";
import CustomDivider from "../../../../../Components/CustomComponents/CustomDivider";
import IndexAvatar from "../../../../../Components/IndexAvatar";
import {ISuggestion} from '../../../../../Components/AutoSuggest';

export default function CourseLecturesInstance(props: CourseLecturesInstanceProps) {
    const index = props.lectureId;
    return (
        <div>
            <div style={flexStyle}>
                <IndexAvatar
                    index={props.index}
                />

                <PublicCourseLectureConnectedDatePicker lectureId={index} name="date"/>
                <PublicCourseLectureConnectedAutoComplete lectureId={index} name="topic"
                                                          suggestions={props.offeredLectures} size={Size.XXL}/>
                <PublicCourseLectureConnectedText lectureId={index} name="startTime" size={Size.M}/>
                <PublicCourseLectureConnectedText lectureId={index} name="endTime" size={Size.M}/>
                <PublicCourseLectureConnectedText lectureId={index} name="duration" size={Size.S}/>
                <PublicCourseLectureConnectedText lectureId={index} name="tie" size={Size.M}/>
            </div>
            <div style={{...flexStyle, marginRight: 55}}>
                <PublicCourseLectureConnectedText lectureId={index} name="price" size={Size.M}/>
                <PublicCourseLectureConnectedText lectureId={index} name="roomCost" size={Size.M}/>
                <PublicCourseLectureConnectedText lectureId={index} name="pages" size={Size.M}/>
                <PublicCourseLectureConnectedCheckBox lectureId={index} name="active"/>

                <GuestLecturerFieldsContainer lectureId={index}/>
            </div>
            <CustomDivider/>
        </div>
    );
}

interface CourseLecturesInstanceProps {
    lectureId: number;
    offeredLectures: ISuggestion[]
    index: number;
}
