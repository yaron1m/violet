import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AbstractField from "./abstract-field";

export default class CustomSelectField extends AbstractField {

    render() {
        const style = this.basicStyle;

        return (
            <SelectField
                style={style}
                value={this.state.value}
                onChange={(event, key, value) => this.props.onChange(value)}
                floatingLabelText={this.title}
                floatingLabelFixed={true}
                errorText={this.getErrorText()}
            >

                {this.props.allowEmpty ? <MenuItem
                    value={null}
                    primaryText="(-)"
                /> : null}

                {_.map(this.props.options, option =>
                    _.isObject(option) ?
                        <MenuItem
                            key={option.key}
                            value={option.key}
                            primaryText={option.label}
                        /> :
                        <MenuItem
                            key={option}
                            value={option}
                            primaryText={option}
                        />
                )}
            </SelectField>
        );
    }
}

CustomSelectField.propTypes = {
    ...AbstractField.propTypes,
    options: PropTypes.array.isRequired,
    allowEmpty: PropTypes.bool,
    onChange: PropTypes.func
};

CustomSelectField.defaultProps = {
    allowEmpty: true,
};
