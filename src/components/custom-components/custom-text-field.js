import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AbstractField from "./abstract-field";

export default class CustomText extends AbstractField {

    render() {
        const style = {
            ...this.basicStyle,
            width: this.width,
        };

        return (
            <TextField
                style={style}
                floatingLabelText={this.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={(event, newValue) =>  super.handleChange(newValue)}
                multiLine={true}
                rowsMax={4}
                errorText={super.getErrorText()}
            />
        );
    }
}

CustomText.propTypes = {
    ...AbstractField.propTypes,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};

CustomText.defaultProps = {
    disabled: false,
    fullWidth: false,
};