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

const style = {
    width: this.width,
    height: "inherit"
};

class CustomText extends AbstractCustomField {

    render() {


        return (
            <TextField
                helperText={this.title}
                value={this.state.value ? this.state.value : ""} // A controlled element should not have null or undefined as value
                onChange={event => this.handleChange(event.target.value)}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                error={super.shouldShowError()}

                type={this.props.type}
                multiline={this.props.type !== "date" && this.props.type !== "email" && this.props.type !== "password"}
                rowsMax={4}

                inputProps={{style}}
                className={this.props.classes.textField}
            />
        );
    }
}

CustomText.propTypes = {
    ...AbstractCustomField.propTypes,
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

CustomText.defaultProps = {
    disabled: false,
    fullWidth: false,
    type: null,
};

export default withStyles(styles)(CustomText);
