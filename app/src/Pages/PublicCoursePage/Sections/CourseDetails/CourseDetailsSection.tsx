import React from "react";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {PublicCourseConnectedText, PublicCourseConnectedToggle} from "../ConnectedCustomComponents/PublicCourseCustomFields";
import {Size} from "../../../../Util/Constants/Size";

export default function CourseDetailsSection (props: {sectionName: string}) {
        return (
            <CustomPaper title={props.sectionName}>
                <div style={flexStyle}>
                    <PublicCourseConnectedText name="courseName" size={Size.XL}/>
                    <PublicCourseConnectedText name="courseCity"/>
                    <PublicCourseConnectedText name="courseLocation"/>
                    <PublicCourseConnectedText name="mealCost"/>
                    <PublicCourseConnectedText name="distanceCost"/>
                </div>
                <div style={flexStyle}>
                    <PublicCourseConnectedToggle name="roomsApproved"/>
                    <PublicCourseConnectedToggle name="isoPayed"/>
                    <PublicCourseConnectedToggle name="printedMaterials"/>
                    <PublicCourseConnectedToggle name="printedCertificates"/>
                </div>
            </CustomPaper>
        );
}