import React from "react";
import PrintTextField, {PrintTextFieldProps} from "./PrintTextField";

export default function PrintDate(props: PrintTextFieldProps) {
    return <PrintTextField
        title={props.title}
        value={!props.value ? "" : new Date(props.value).toLocaleDateString()}
    />;
}