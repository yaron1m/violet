import React from 'react';

export class ActionButtonsBox extends React.Component {

    render() {
        const styles = {
            buttonsBox: {
                backgroundColor: "#888888",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                marginLeft: "auto",
                top: 60,
                position: 'fixed',
                zIndex: 10, //TODO move to left
            }
        };

        return (
            <div style={styles.buttonsBox}>
                {this.props.children}
            </div>

        );
    }
}
