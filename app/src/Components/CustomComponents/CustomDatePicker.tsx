import React from 'react';
import CustomText, {CustomTextFieldProps} from "./CustomTextField";
import {AbstractCustomFieldProps} from './AbstractCustomField';

export default function CustomDatePicker(props: CustomTextFieldProps & AbstractCustomFieldProps<string>) {
    return (
        <CustomText
            type="date"
            {...props}
        />
    );
}