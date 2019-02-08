import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function CustomPaper(props: CustomPaperProps) {

    const style = {
        paper: {
            padding: 10,
            marginBottom: 20,

            ...props.style,
        },
        title: {
            fontSize: 24,
        },
    };

    return (
        <Paper style={style.paper} onClick={props.onClick}>
            {props.title && (<div style={style.title}>{props.title}</div>)}
            {props.children}
        </Paper>
    );
}

interface CustomPaperProps {
    style: React.CSSProperties,
    onClick: () => void,
    title: string,
    children: React.ReactNode,
}

export const flexStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end"
};
