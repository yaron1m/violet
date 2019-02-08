import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/Constants/Colors";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

export default class CustomCheckbox extends AbstractCustomField<boolean, CustomCheckboxProps> {

    render() {
        const checked = this.state.value === true;

        const labelStyle = {
            color: checked ? this.props.checkedColor : Colors.black
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
    checkedColor: "black";
}
