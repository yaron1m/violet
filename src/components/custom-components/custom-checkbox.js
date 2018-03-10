import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import AbstractField from "./abstract-field";
import Colors from "../../util/consts/colors";

export default class CustomCheckbox extends AbstractField {

    render() {
        const checked = this.state.value === true;

        const style = {
            checkbox: {
                marginBottom: 6,
                marginTop: 6,
            },
            labelStyle: {
                marginRight: 20,
                color: checked ? Colors.red : Colors.black,
            },
            iconStyle: {
                fill: checked ? Colors.red : null,
                borderColor: Colors.black,
            },
        };

        return (
            <div>
                <Checkbox
                    style={style.checkbox}
                    label={this.title}
                    labelStyle={style.labelStyle}
                    labelPosition="right"
                    checked={checked}
                    switched={checked}
                    onCheck={(event, isInputChecked) => this.handleChange(isInputChecked)}
                    iconStyle={style.iconStyle}
                />
            </div>

        );
    }
}

CustomCheckbox.propTypes = {
    ...AbstractField.propTypes,
};
