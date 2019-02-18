import React from "react";

export default function OrderPageTitle(props: { title: string, statusLabel: string }) {
    const style = {
        div: {
            fontSize: 24,
            textAlign: "center" as 'center',
        },
        title: {
            fontWeight: "bold" as 'bold',
        }
    };

    return (
        <div style={style.div}>
            <span style={style.title}>{props.title}</span>
            <span>{" - " + props.statusLabel}</span>
        </div>
    );
}
