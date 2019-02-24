import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {AbstractCustomFieldProps} from "./AbstractCustomFieldProps";
import Colors from "../../Util/Constants/Colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

export default function CustomCheckbox(props: CustomCheckboxProps) {
    const checkedColor = props.checkedColor || Colors.black;
    const labelStyle = {
        color: props.value ? checkedColor : Colors.black
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.value}
                        onChange={(event, isInputChecked) => props.onChange(isInputChecked)}
                        value={props.title}
                        color="primary"
                    />
                }
                label={<span style={labelStyle}>{props.title}</span>}
            />
        </FormGroup>
    );
}

interface CustomCheckboxProps extends AbstractCustomFieldProps<boolean> {
    checkedColor?: string;
}
