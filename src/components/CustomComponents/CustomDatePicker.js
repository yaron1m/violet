import React from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from "./AbstractCustomField";
import DatePicker from 'material-ui/DatePicker';

export default class CustomDatePicker extends AbstractCustomField {

    render() {
        const style = {
            field: {
                marginRight: 20,
            },
            datePickerTextFieldStyle: {
                width: this.width,
                verticalAlign: "bottom",
                marginBottom: 10,
            },
        };

        return (
            <DatePicker
                style={style.field}
                floatingLabelText={this.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value ? new Date(this.state.value) : null}
                onChange={(nothing, date) => this.handleChange(date.toJSON())}
                errorText={super.getErrorText()}

                textFieldStyle={style.datePickerTextFieldStyle}
                DateTimeFormat={window.Intl.DateTimeFormat}
                okLabel="אישור"
                cancelLabel="ביטול"
                locale='he-IL'
                firstDayOfWeek={0}
            />
        );
    }
}

CustomDatePicker.propTypes = {
    ...AbstractCustomField.propTypes,
    disabled: PropTypes.bool,
};

CustomDatePicker.defaultProps = {
    disabled: false,
    fullWidth: false,
};