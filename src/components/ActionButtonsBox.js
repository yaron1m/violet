import React from 'react';
import Colors from "../util/consts/colors";

export class ActionButtonsBox extends React.Component {

    render() {
        const styles = {
            buttonsBox: {
                backgroundColor: Colors.orderButtons,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                marginLeft: "auto",
                top: 60,
                position: 'fixed',
                zIndex: 10,
                left: 10,
            }
        };

        return (
            <div style={styles.buttonsBox}>
                {this.props.children}
            </div>
        );
    }
}
