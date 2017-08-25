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
                zIndex: 10,
                left: 10, //TODO move into maxWidth 1200
            }
        };

        return (
            <div style={styles.buttonsBox}>
                {this.props.children}
            </div>

        );
    }
}
