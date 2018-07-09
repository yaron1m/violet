import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/Constants/Colors";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';

export default class CustomCheckbox extends AbstractCustomField {

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

CustomCheckbox.propTypes = {
    ...AbstractCustomField.propTypes,
    checkedColor: PropTypes.string,
};

CustomCheckbox.defaultProps = {
    checkedColor: Colors.black,
};
