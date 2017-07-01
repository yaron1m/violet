import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import {black} from 'material-ui/styles/colors';

class CustomDatePicker extends React.Component {

    render() {
        const styles = {
            field: {
                marginLeft: 20,
            },
            textField: {
                width: 100
            },
            floatingLabelText: {
                color: black,
            }
        };

        let DateTimeFormat;

        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported(['he', 'he-IL'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        }

        return (
            <DatePicker
                floatingLabelText={this.props.title}
                floatingLabelStyle={styles.floatingLabelText}
                DateTimeFormat={DateTimeFormat}
                okLabel="אישור"
                cancelLabel="ביטול"
                locale="he"
                firstDayOfWeek={0}
                disabled={this.props.disabled}
                style={styles.field}
                textFieldStyle={styles.textField}
            />
        );
    }
}

CustomDatePicker.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

CustomDatePicker.defaultProps = {
    disabled: false
};

export default CustomDatePicker;