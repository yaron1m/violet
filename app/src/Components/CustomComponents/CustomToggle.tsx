import React from "react";
import Switch from "@material-ui/core/Switch";
import {AbstractCustomFieldProps} from "./AbstractCustomFieldProps";
import Colors from "../../Util/Constants/Colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CustomToggle(props: AbstractCustomFieldProps<boolean>) {
    const labelStyle = {
        color: props.isRequired && props.value === undefined ? Colors.red : Colors.black
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={props.value === true}
                        onChange={(event, checked) => props.onChange(checked)}
                        color="primary"
                    />
                }
                label={<span style={labelStyle}>{props.title}</span>}
            />
        </div>

    );
}