import React from "react";
import Checkbox from '@material-ui/core/Checkbox';
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../Util/Constants/Colors";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

export default class CustomCheckbox extends AbstractCustomField<CustomCheckboxProps> {

    render() {
        const checked = this.state.value === true;

        const checkedColor = this.props.checkedColor ? this.props.checkedColor : Colors.black;
        const labelStyle = {
            color: checked ? checkedColor : Colors.black
        };

        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={(event, isInputChecked) => this.handleChange(isInputChecked)}
                            value={this.title}
                            color="primary"
                        />
                    }
                    label={<span style={labelStyle}>{this.title}</span>}
                />
            </FormGroup>
        );
    }
}

interface CustomCheckboxProps {
    checkedColor?: string;
}
