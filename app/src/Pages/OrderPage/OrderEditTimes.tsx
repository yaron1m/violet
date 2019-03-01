import React from "react";

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
            <span>{new Date(props.createdDate).toLocaleDateString()}</span>
            <span>  ;  </span>
            <span>תאריך שינוי - </span>
            <span>{new Date(props.changedDate).toLocaleDateString()}</span>
        </div>
    );
}

interface OrderTimesProps {
    isSelectedOrder: boolean,
    createdDate: string,
    changedDate: string,
}
