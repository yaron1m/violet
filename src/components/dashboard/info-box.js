import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {white, grey800} from 'material-ui/styles/colors';

export default class InfoBox extends React.Component {

    render() {
        const styles = {
            content: {
                padding: '5px 10px',
                marginRight: 90,
                height: 80
            },
            number: {
                display: 'block',
                fontSize: 22,
                color: grey800,
                fontWeight: "bold",
                paddingTop: 10
            },
            text: {
                fontSize: 18,
                color: grey800,
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
            <Paper>
                <span style={styles.iconSpan}>
                  <this.props.Icon
                      color={white}
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
    style: PropTypes.object,
};
