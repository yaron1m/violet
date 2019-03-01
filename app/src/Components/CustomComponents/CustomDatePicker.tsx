import React from "react";
import CustomText, {CustomTextFieldProps} from "./CustomTextField";

export default function CustomDatePicker(props: CustomTextFieldProps) {
    return (
        <CustomText
            type="date"
            {...props}
        />
    );
}