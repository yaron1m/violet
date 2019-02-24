import React from "react";
import Divider from "@material-ui/core/Divider";

export default function CustomDivider(props: { style?: React.CSSProperties }) {
    const style = {
        marginTop: 10,
        marginBottom: 10,
        ...props.style
    };

    return (
        <Divider style={style}/>
    );
}
