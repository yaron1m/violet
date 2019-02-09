import React from 'react';
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

class CustomText extends AbstractCustomField<CustomTextFieldProps> {

    render() {
        const style = {
            width: this.width,
            height: "inherit"
        };

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
                className={this.props.classes ? this.props.classes.textField : undefined}
            />
        );
    }
}

export interface CustomTextFieldProps {
    disabled?: boolean;
    type?: string;
}

export default withStyles(styles)(CustomText);
