import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Select from '@material-ui/core/Select';
import AbstractCustomField from "./AbstractCustomField";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = () => ({
    formControl: {
        marginRight: 20,
        marginBottom: 10,
        verticalAlign: "bottom",
    },
});

class CustomSelectField extends AbstractCustomField {

    render() {
        const formStyle = {
            minWidth: this.width,
        };

        return (
            <FormControl
                style={formStyle}
                className={this.props.classes.formControl}
                error={this.shouldShowError()}
            >
                <Select
                    value={this.state.value ? this.state.value : ""}
                    onChange={(event) => this.handleChange(event.target.value)}
                >

                    {this.props.allowEmpty ?
                        <MenuItem value="">
                            <em>-</em>
                        </MenuItem>
                        : null}

                    {_.map(this.props.options, option =>
                        _.isObject(option) ?
                            <MenuItem value={option.key} key={option.key}>{option.label}</MenuItem> :
                            <MenuItem value={option} key={option}>{option}</MenuItem>
                    )}
                </Select>
                <FormHelperText>{this.title}</FormHelperText>
            </FormControl>
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

export default withStyles(styles)(CustomSelectField);
