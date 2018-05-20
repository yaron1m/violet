import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AbstractCustomField from "./AbstractCustomField";

export default class CustomText extends AbstractCustomField {

    render() {
        const style = {
            ...this.basicStyle,
            width: this.width,
        };

        //TODO move helper to right
        return (
            <TextField
                helperText={this.title}
                value={this.state.value}
                onChange={event => this.handleChange(event.target.value)}
                fullWidth={this.props.fullWidth}
                multiline
                rowsMax={4}
                disabled={this.props.disabled}
                error={super.shouldShowError()}
                // style={style}
                // floatingLabelFixed={true}
            />
        );
    }
}

CustomText.propTypes = {
    ...AbstractCustomField.propTypes,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};

CustomText.defaultProps = {
    disabled: false,
    fullWidth: false,
};