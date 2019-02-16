import React from 'react';
import Colors from "../../Util/Constants/Colors";

export default function ActionButtonsBox(props: { children: React.ReactNode }) {
    const styles = {
        buttonsBox: {
            backgroundColor: Colors.orderButtons,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            marginLeft: "auto" as "auto",
            top: 60,
            position: 'fixed' as "fixed",
            zIndex: 10,
            left: 10,
        }
    };

    return (
        <div style={styles.buttonsBox}>
            {props.children}
        </div>
    );
}
