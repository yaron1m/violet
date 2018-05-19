import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import AbstractField from "./abstract-field";
import Colors from "../../util/consts/colors";
import PropTypes from 'prop-types';

export default class CustomCheckbox extends AbstractField {

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
    ...AbstractField.propTypes,
    checkedColor: PropTypes.string,
};

CustomCheckbox.defaultProps = {
    checkedColor: Colors.black,
};
