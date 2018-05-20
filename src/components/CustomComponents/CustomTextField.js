import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AbstractCustomField from "./AbstractCustomField";
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
    textField: {
        marginRight: 20,
        marginBottom: 10,
        verticalAlign: "bottom",
    },
});

class CustomText extends AbstractCustomField {

    render() {
        const style = {
            width: this.width,
        };

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

                inputProps={{style}}
                className={this.props.classes.textField}
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

export default withStyles(styles)(CustomText);
