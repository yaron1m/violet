import React from "react";

export default function PublicCoursePageTitle(props: { title: string }) {
    const style = {
        div: {
            fontSize: 24,
            marginBottom: 10,
            textAlign: "center" as 'center',
        },
        title: {
            fontWeight: "bold" as 'bold',
        }
    };

    return (
        <div style={style.div}>
            <span style={style.title}>{props.title}</span>
        </div>
    );
}

