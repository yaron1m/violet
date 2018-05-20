import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Select from '@material-ui/core/Select';
import AbstractCustomField from "./AbstractCustomField";
import CustomMenuItem from "./CustomMenuItem";

export default class CustomSelectField extends AbstractCustomField {

    render() {
        const style = this.basicStyle;

        return (
            <Select
                style={style}
                value={this.state.value}
                onChange={(event) => this.handleChange(event.target.value)}
                // floatingLabelText={this.title}
                // floatingLabelFixed={true}
                // errorText={this.getErrorText()}
            >

                {this.props.allowEmpty ? <CustomMenuItem
                    value={null}
                    primaryText="(-)"
                /> : null}

                {_.map(this.props.options, option =>
                    _.isObject(option) ?
                        <CustomMenuItem
                            key={option.key}
                            value={option.key}
                            primaryText={option.label}
                        /> :
                        <CustomMenuItem
                            key={option}
                            value={option}
                            primaryText={option}
                        />
                )}
            </Select>
        );
    }
}

CustomSelectField.propTypes = {
    ...AbstractCustomField.propTypes,
    options: PropTypes.array.isRequired,
    allowEmpty: PropTypes.bool,
    onChange: PropTypes.func
};

CustomSelectField.defaultProps = {
    allowEmpty: true,
};
