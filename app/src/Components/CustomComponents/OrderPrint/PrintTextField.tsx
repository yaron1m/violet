import React from "react";

const style = {
    span: {
        marginLeft: 20,
        marginBottom: 5,
    },
    value: {
        fontWeight: "bold" as "bold"
    },
};

export default function PrintTextField(props: PrintTextFieldProps) {

    return (
        <span>
            <span style={style.span}>
                <span>{props.title}</span>
                <span>: </span>
                <span style={style.value}>{props.value}</span>
            </span>
            <span> </span>
        </span>
    );
}

export interface PrintTextFieldProps {
    title: string;
    value: string;
}