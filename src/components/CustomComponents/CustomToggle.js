import React from 'react';
import Switch from '@material-ui/core/Switch';
import * as _ from "lodash";
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/consts/colors";
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class CustomToggle extends AbstractCustomField {

    showError() {
        return this.state.value === undefined && _.includes(this.requiredFields, this.name);
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