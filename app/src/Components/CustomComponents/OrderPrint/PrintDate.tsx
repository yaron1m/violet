import React from "react";
import PrintTextField, {PrintTextFieldProps} from "./PrintTextField";
import {toPrintableDateFormat} from "@violet/common";

export default function PrintDate(props: PrintTextFieldProps) {
    return <PrintTextField
        title={props.title}
        value={!props.value ? "" : toPrintableDateFormat(new Date(props.value))}
    />;
}