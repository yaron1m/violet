import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/consts/colors";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';

export default class CustomCheckbox extends AbstractCustomField {

    render() {
        const checked = this.state.value === true;

        const style = {
            checkbox: {
                marginBottom: 6,
                marginTop: 6,
                paddingBottom: 9,
            },
            labelStyle: {
                marginRight: 20,
                color: checked ? this.props.checkedColor : Colors.black,
            },
            iconStyle: {
                fill: checked ? this.props.checkedColor : null,
                borderColor: Colors.black,
            },
        };

        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                    <Checkbox
                        // style={style.checkbox}
                        // labelStyle={style.labelStyle}
                        // labelPosition="right"
                        checked={checked}
                        // switched={checked}
                        onChange={(event, isInputChecked) => this.handleChange(isInputChecked)}
                        // iconStyle={style.iconStyle}
                    />
                }
                    label={this.title}
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
