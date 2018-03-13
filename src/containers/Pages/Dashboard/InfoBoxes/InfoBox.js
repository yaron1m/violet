import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Colors from '../../../../util/consts/colors'

export default class InfoBox extends React.Component {

    render() {
        const styles = {
            paper: {
                width: "100%",
                marginRight: 20,
                cursor: "pointer",
                marginBottom: 20,
            },
            content: {
                padding: '5px 10px',
                marginRight: 90,
                height: 80
            },
            number: {
                display: 'block',
                fontSize: 22,
                color: this.props.error ? Colors.red : Colors.textGray,
                fontWeight: "bold",
                paddingTop: 10
            },
            text: {
                fontSize: 18,
                color: this.props.error ? Colors.red : Colors.textGray,
            },
            iconSpan: {
                float: 'right',
                height: 90,
                width: 90,
                textAlign: 'center',
                backgroundColor: this.props.color
            },
            icon: {
                height: 48,
                width: 48,
                marginTop: 20,
                maxWidth: '100%'
            }
        };

        return (
            <Paper style={styles.paper} onClick={this.props.onClick}>
                <span style={styles.iconSpan}>
                  <this.props.Icon
                      color={Colors.white}
                      style={styles.icon}
                  />
                </span>

                <div style={styles.content}>
                    <span style={styles.text}>{this.props.title}</span>
                    <span style={styles.number}>{this.props.value}</span>
                </div>
            </Paper>
        );
    }
}

InfoBox.propTypes = {
    Icon: PropTypes.any,
    color: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    error: PropTypes.bool,
    onClick: PropTypes.func,
};