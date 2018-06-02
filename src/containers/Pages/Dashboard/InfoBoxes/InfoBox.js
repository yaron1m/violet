import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../../util/Constants/Colors'
import CustomPaper from "../../../../components/CustomComponents/CustomPaper";

export default class InfoBox extends React.Component {

    render() {
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
                backgroundColor: this.props.color,
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
            <CustomPaper style={styles.paper} onClick={this.props.onClick}>
                <span style={styles.iconSpan}>
                  <this.props.Icon
                      style={styles.icon}
                  />
                </span>

                <div style={styles.content}>
                    <span style={styles.text}>{this.props.title}</span>
                    <span style={styles.number}>{this.props.value}</span>
                </div>
            </CustomPaper>
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
