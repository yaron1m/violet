import React from "react";
import _ from "lodash";
import {Size} from "../../../../../Util/Constants/Size";
import {flexStyle} from "../../../../../Components/CustomComponents/CustomPaper";
import CustomCheckbox from "../../../../../Components/CustomComponents/CustomCheckbox";
import {IPublicCourseLecture} from "@violet/common";
import CustomTextField from "../../../../../Components/CustomComponents/CustomTextField";

export default function CourseLecturesInstance(props: CourseLecturesInstanceProps) {
    if (!props.publicCourseLecture.guestLecturer) {
        return (
            <CustomCheckbox
                title="מרצה אורח"
                value={props.publicCourseLecture.guestLecturer}
                onChange={props.onChangeBoolean("guestLecturer")}
                isRequired={_.includes(props.requiredFields, "guestLecturer")}
            />
        );
    }
    return (
        <span style={flexStyle}>
                <CustomCheckbox
                    title="מרצה אורח"
                    value={props.publicCourseLecture.guestLecturer}
                    onChange={props.onChangeBoolean("guestLecturer")}
                    isRequired={_.includes(props.requiredFields, "guestLecturer")}
                />
                <CustomTextField
                    title="שם מרצה אורח"
                    value={props.publicCourseLecture.guestLecturerName}
                    onChange={props.onChange("guestLecturerName")}
                    isRequired={_.includes(props.requiredFields, "guestLecturerName")}
                    size={Size.M}
                />
                <CustomTextField
                    title="עלות מרצה אורח"
                    value={props.publicCourseLecture.guestLecturerCost}
                    onChange={props.onChange("guestLecturerCost")}
                    isRequired={_.includes(props.requiredFields, "guestLecturerCost")}
                    size={Size.L}
                />
            </span>
    );
}

interface CourseLecturesInstanceProps {
    publicCourseLecture: IPublicCourseLecture;
    onChange: (key: string) => (value: string) => void;
    onChangeBoolean: (key: string) => (value: boolean) => void;
    requiredFields: string[];
}
