import React from "react";
import PrintTextField from "./PrintTextField";

export default function PrintBoolean(props: PrintBooleanProps) {
    return <PrintTextField
        value={props.value === true ? "V" : "X"}
        title={props.title}
    />;
}

interface PrintBooleanProps {
    title: string;
    value?: boolean;
}