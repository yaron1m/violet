import React from 'react';
import PropTypes from 'prop-types';
import AbstractCustomField from "./AbstractCustomField";
import TextField from '@material-ui/core/TextField';

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


        //TODO parse date from old format
        return (
            <TextField
                type="date"
                helperText={this.title}
                value={this.state.value}
                onChange={event => this.handleChange(event.target.value)}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                error={super.shouldShowError()}
                // style={style.field}
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
