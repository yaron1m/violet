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
            <span>{props.createdDateLabel}</span>
            <span>{new Date(props.createdDate).toLocaleDateString()}</span>
            <span>  ;  </span>
            <span>{props.changedDateLabel}</span>
            <span>{new Date(props.changedDate).toLocaleDateString()}</span>
        </div>
    );
}

interface OrderTimesProps {
    isSelectedOrder: boolean,
    createdDateLabel: string,
    createdDate: string,
    changedDateLabel: string,
    changedDate: string,
}
