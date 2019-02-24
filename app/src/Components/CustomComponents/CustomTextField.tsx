import React from "react";
import TextField from "@material-ui/core/TextField";
import {AbstractCustomFieldProps} from "./AbstractCustomFieldProps";
import {withStyles} from "@material-ui/core/styles";
import {getFieldWidth} from "../../Util/Constants/Size";

const styles = () => ({
    textField: {
        marginRight: 20,
        marginBottom: 10,
        verticalAlign: "bottom",
    },
});

class CustomTextField extends React.PureComponent<CustomTextFieldProps> {

    render() {
        return (
            <TextField
                helperText={this.props.title}
                value={this.props.value || ""} // A controlled element should not have null or undefined as value
                onChange={event => this.props.onChange(event.target.value)}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                error={this.props.isRequired && !this.props.value}

                type={this.props.type}
                multiline={this.props.type !== "date" && this.props.type !== "email" && this.props.type !== "password"}
                rowsMax={4}

                inputProps={{width: getFieldWidth(this.props.fullWidth, this.props.size)}}
                className={this.props.classes ? this.props.classes.textField : undefined}
            />
        );
    }
}

export interface CustomTextFieldProps extends AbstractCustomFieldProps<string> {
    disabled?: boolean;
    type?: string;
}

export default withStyles(styles)(CustomTextField);
