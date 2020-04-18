import React from "react";
import CustomPaper, {flexStyle} from "../../../../Components/CustomComponents/CustomPaper";
import {Size} from "../../../../Util/Constants/Size";
import {IPublicCourse} from "@violet/common";
import CustomTextField from "../../../../Components/CustomComponents/CustomTextField";
import CustomToggle from "../../../../Components/CustomComponents/CustomToggle";

export default function CourseDetailsSection(props: CourseDetailsSectionProps) {
    return (
        <CustomPaper title="פרטי הקורס">
            <div style={flexStyle}>
                <CustomTextField
                    title="שם הקורס"
                    value={props.selectedPublicCourse.courseName}
                    onChange={props.onChange("courseName")}
                    size={Size.XL}
                />
                <CustomTextField
                    title="עיר"
                    value={props.selectedPublicCourse.courseCity}
                    onChange={props.onChange("courseCity")}
                />
                <CustomTextField
                    title="מיקום הקורס"
                    value={props.selectedPublicCourse.courseLocation}
                    onChange={props.onChange("courseLocation")}
                />
                <CustomTextField
                    title="עלות ארוחה"
                    value={props.selectedPublicCourse.mealCost}
                    onChange={props.onChange("mealCost")}
                />
                <CustomTextField
                    title="עלות נסיעות"
                    value={props.selectedPublicCourse.distanceCost}
                    onChange={props.onChange("distanceCost")}
                />
            </div>
            <div style={flexStyle}>
                <CustomToggle
                    title="חדרים אושרו"
                    value={props.selectedPublicCourse.roomsApproved}
                    onChange={props.onChangeBoolean("roomsApproved")}
                />
                <CustomToggle
                    title="שולם לאיגוד"
                    value={props.selectedPublicCourse.isoPayed}
                    onChange={props.onChangeBoolean("isoPayed")}
                />
                <CustomToggle
                    title="חוברות הודפסו"
                    value={props.selectedPublicCourse.printedMaterials}
                    onChange={props.onChangeBoolean("printedMaterials")}
                />
                <CustomToggle
                    title="תעודות הודפסו"
                    value={props.selectedPublicCourse.printedCertificates}
                    onChange={props.onChangeBoolean("printedCertificates")}
                />
            </div>
        </CustomPaper>
    );
}

interface CourseDetailsSectionProps {
    selectedPublicCourse: IPublicCourse;
    onChange: (key: string) => (value: string) => void;
    onChangeBoolean: (key: string) => (value: boolean) => void;
}