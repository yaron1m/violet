import React from 'react';

export default function PrintSection (props: PrintSectionProps) {

        const style = {
            section: {
                border: "2px solid gray",
                padding: 10,
                marginBottom: 10,
            },
            sectionTitle: {
                fontSize: 25,
                marginBottom: 10,
            },
        };

        return (
            <div style={style.section}>
                <div style={style.sectionTitle}>{props.title}</div>
                {props.children}
            </div>
        )
}

interface PrintSectionProps{
    title: string;
    children: React.ReactNode;
}