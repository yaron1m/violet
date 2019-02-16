import React from 'react';

export default function PageTitle(props: PageTitleProps) {
    const style = {
        pageTitle: {
            fontSize: 24,
            maxWidth: props.maxWidth,
            marginBottom: 10,
        },
    };

    return (
        <div style={style.pageTitle}>
            {props.title}
        </div>
    );
}

interface PageTitleProps {
    title: string;
    maxWidth?: number;
}