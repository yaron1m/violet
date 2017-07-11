import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

class CustomDatePicker extends React.Component {

    render() {
        const styles = {
            field: {
                marginLeft: 20,
            },
            textField: {
                width: 100
            },
        };

        switch (this.props.size) {
            case "S":
                styles.textField.width = 50;
                break;
            case "M":
                styles.textField.width = 100;
                break;
            case "L":
                styles.textField.width = 150;
                break;
            case "XL":
                styles.textField.width = 200;
                break;

            default:
                break;
        }

        let DateTimeFormat;

        /**
         * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
         */
        if (areIntlLocalesSupported('he-IL')) {
            DateTimeFormat = window.Intl.DateTimeFormat;
        }

        return (
            <DatePicker
                floatingLabelText={this.props.title}
                floatingLabelFixed={true}
                DateTimeFormat={DateTimeFormat}
                okLabel="אישור"
                cancelLabel="ביטול"
                locale='he-IL'
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