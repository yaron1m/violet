import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/consts/colors";
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
    ...AbstractCustomField.propTypes,
    checkedColor: PropTypes.string,
};

CustomCheckbox.defaultProps = {
    checkedColor: Colors.black,
};
