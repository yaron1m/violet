import React from "react";
import {toPrintableDateFormat} from "@violet/common";

export default function OrderTimes(props: OrderTimesProps) {
    if (!props.isSelectedOrder)
        return null;

    const style = {
        fontSize: 16,
        marginBottom: 10,
    };

    return (
        <div style={style}>
            <span>תאריך יצירה - </span>
            <span>{toPrintableDateFormat(new Date(props.createdDate))}</span>
            <span>  ;  </span>
            <span>תאריך שינוי - </span>
            <span>{toPrintableDateFormat(new Date(props.changedDate))}</span>
        </div>
    );
}

interface OrderTimesProps {
    isSelectedOrder: boolean,
    createdDate: string,
    changedDate: string,
}
