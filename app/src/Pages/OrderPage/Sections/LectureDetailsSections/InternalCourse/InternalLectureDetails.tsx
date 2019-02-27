import React from "react";
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../../Util/Constants/Size";
import {FieldType, OrderCustomCheckBox, OrderCustomText, OrderCustomToggle} from "../../ConnectedCustomComponents/OrderCustomFields";
import RejectedOrderContainer from "./OrderTerminateOptions/RejectedOrderContainer";
import CancelledOrderContainer from "./OrderTerminateOptions/CancelledOrderContainer";
import Colors from "../../../../../Util/Constants/Colors";
import LectureTimesDetailsContainer from "./LectureTimes/LectureTimesDetailsContainer";

export default function InternalLectureDetails(props: InternalLectureDetailsProps) {
    return (
        <CustomPaper title="פרטי ההרצאה">

            <div>
                <OrderCustomText title="רחוב" name="street" fieldType={FieldType.InternalLecture}/>
                <OrderCustomText title="מספר" name="streetNumber" size={Size.S} fieldType={FieldType.InternalLecture}/>
                <OrderCustomText title="עיר" name="city" fieldType={FieldType.InternalLecture}/>
                <OrderCustomText title="מיקום" name="location" size={Size.XL} fieldType={FieldType.InternalLecture}/>
                <OrderCustomText title="קהל יעד" name="audienceType" fieldType={FieldType.InternalLecture}/>
                <OrderCustomText title='מהות היום + לו"ז' name="daySchedule" fieldType={FieldType.InternalLecture}/>
            </div>

            <div style={flexStyle}>
                <OrderCustomToggle title="מקרן" name="projector" fieldType={FieldType.InternalLecture}/>
                <OrderCustomToggle title="מערכת הגברה" name="soundSystem" fieldType={FieldType.InternalLecture}/>
                <OrderCustomToggle title="מיקרופון דש" name="microphone" fieldType={FieldType.InternalLecture}/>
                <OrderCustomToggle title="חניה" name="parking" fieldType={FieldType.InternalLecture}/>
                <OrderCustomToggle title="הזמנה אושרה" name="orderApproved"/>
                <OrderCustomToggle title="קהל יעד זהה" name="sameAudience" fieldType={FieldType.InternalLecture}/>

                <OrderCustomCheckBox
                    title="הזמנה לא יצאה לפועל"
                    name="rejected"
                    checkedColor={Colors.red}
                    fieldType={FieldType.InternalLecture}
                />

                {props.showCancelledCheckBox &&
                <OrderCustomCheckBox
                    title="הזמנה בוטלה"
                    name="cancelled"
                    checkedColor={Colors.red}
                    fieldType={FieldType.InternalLecture}
                />}
            </div>

            <RejectedOrderContainer/>

            <CancelledOrderContainer/>

            <LectureTimesDetailsContainer/>
        </CustomPaper>
    );
}

interface InternalLectureDetailsProps {
    showCancelledCheckBox: boolean,
}
