import React from 'react';
import Switch from '@material-ui/core/Switch';
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/Constants/Colors";
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class CustomToggle extends AbstractCustomField {

    showError() {
        return this.state.isRequired && this.state.value === undefined;
    }

    render() {
        const labelStyle = {
            color: this.showError() ? Colors.red : Colors.black
        };

        return (
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.value === true}
                            onChange={(event, checked) => this.handleChange(checked)}
                            color="primary"
                        />
                    }
                    label={<span style={labelStyle}>{this.title}</span>}
                />
            </div>

        );
    }
}

CustomToggle.propTypes = {
    ...AbstractCustomField.propTypes,
};