import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import labels from '../../../lables.json';
import {black} from 'material-ui/styles/colors';

class FormDatePicker extends React.Component {

    render() {
        const styles = {
            field:{
                marginLeft: 20,
            },
            textField:{
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
        } else {
            alert("failed");
        }

        return (
            <DatePicker
                floatingLabelText={this.props.title}
                floatingLabelStyle={styles.floatingLabelText}
                DateTimeFormat={DateTimeFormat}
                okLabel={labels.buttons.ok}
                cancelLabel={labels.buttons.cancel}
                locale="he"
                firstDayOfWeek={0}
                disabled={this.props.disabled}
                style={styles.field}
                textFieldStyle={styles.textField}
            />
        );
    }
}

FormDatePicker.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

export default FormDatePicker;

FormDatePicker.defaultProps = {
    disabled: false
};