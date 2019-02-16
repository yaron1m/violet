import React from 'react';
import Colors from '../../../Util/Constants/Colors';
import CustomPaper from "../../../Components/CustomComponents/CustomPaper";

export default function InfoBox(props: InfoBoxProps) {
    const styles = {
        paper: {
            width: "100%",
            marginRight: 20,
            cursor: "pointer",
            padding: 0,
        },
        content: {
            padding: '5px 10px',
            marginRight: 90,
            height: 80
        },
        number: {
            display: 'block' as 'block',
            fontSize: 22,
            color: props.error ? Colors.red : Colors.textGray,
            fontWeight: "bold" as 'bold',
            paddingTop: 10
        },
        text: {
            fontSize: 18,
            color: props.error ? Colors.red : Colors.textGray,
        },
        iconSpan: {
            float: 'right' as 'right',
            height: 90,
            width: 90,
            textAlign: 'center' as 'center',
            backgroundColor: props.color,
            color: Colors.white,
        },
        icon: {
            height: 48,
            width: 48,
            marginTop: 20,
            maxWidth: '100%'
        }
    };

    return (
        <CustomPaper style={styles.paper} onClick={props.onClick}>
                <span style={styles.iconSpan}>
                    <props.Icon
                        style={styles.icon}
                    />
                </span>

            <div style={styles.content}>
                <span style={styles.text}>{props.title}</span>
                <span style={styles.number}>{props.value}</span>
            </div>
        </CustomPaper>
    );
}

interface InfoBoxProps {
    Icon: React.ComponentType<any>,
    color: string;
    title: string;
    value?: string;
    error?: boolean;
    onClick: () => void;
}
