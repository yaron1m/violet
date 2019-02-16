import React from 'react';

export function PrintPageTitle(props: { title: string }) {
    const style = {
        fontSize: 30,
        textAlign: "center" as "center",
        marginBottom: 10,
    };

    return (
        <div style={style}>{props.title}</div>
    );
}

