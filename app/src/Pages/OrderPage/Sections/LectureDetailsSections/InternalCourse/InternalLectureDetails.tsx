import React from "react";
import CustomPaper, {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../../Util/Constants/Size";
import {
    OrderCustomCheckBox,
    OrderCustomText,
    OrderCustomToggle
} from "../../ConnectedCustomComponents/OrderCustomFields";
import RejectedOrderContainer from "./OrderTerminateOptions/RejectedOrderContainer";
import CancelledOrderContainer from "./OrderTerminateOptions/CancelledOrderContainer";
import Colors from "../../../../../Util/Constants/Colors";
import LectureTimesDetailsContainer from "./LectureTimes/LectureTimesDetailsContainer";

export default function InternalLectureDetails(props: InternalLectureDetailsProps) {
    return (
        <CustomPaper title="פרטי ההרצאה">

            <div>
                <OrderCustomText title="רחוב" name="street" internalLectureField={true}/>
                <OrderCustomText title="מספר" name="streetNumber" size={Size.S} internalLectureField={true}/>
                <OrderCustomText title="עיר" name="city" internalLectureField={true}/>
                <OrderCustomText title="מיקום" name="location" size={Size.XL} internalLectureField={true}/>
                <OrderCustomText title="קהל יעד" name="audienceType" internalLectureField={true}/>
                <OrderCustomText title='מהות היום + לו"ז' name="daySchedule" internalLectureField={true}/>
            </div>

            <div style={flexStyle}>
                <OrderCustomToggle title="מקרן" name="projector" internalLectureField={true}/>
                <OrderCustomToggle title="מערכת הגברה" name="soundSystem" internalLectureField={true}/>
                <OrderCustomToggle title="מיקרופון דש" name="microphone" internalLectureField={true}/>
                <OrderCustomToggle title="חניה" name="parking" internalLectureField={true}/>
                <OrderCustomToggle title="הזמנה אושרה" name="orderApproved"/>
                <OrderCustomToggle title="קהל יעד זהה" name="sameAudience" internalLectureField={true}/>

                <OrderCustomCheckBox
                    title="הזמנה לא יצאה לפועל"
                    name="rejected"
                    checkedColor={Colors.red}
                    internalLectureField={true}
                />

                {props.showCancelledCheckBox &&
                <OrderCustomCheckBox
                    title="הזמנה בוטלה"
                    name="cancelled"
                    checkedColor={Colors.red}
                    internalLectureField={true}
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
