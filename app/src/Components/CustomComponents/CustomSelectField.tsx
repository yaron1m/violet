import React from "react";
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

class CustomSelectField extends AbstractCustomField<CustomSelectFieldProps> {
    render() {
        const formStyle = {
            minWidth: this.width,
        };

        return (
            <FormControl
                style={formStyle}
                className={this.props.classes ? this.props.classes.formControl : undefined}
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

                    {_.map(this.props.options, (option) => (
                        <MenuItem value={option.key} key={option.key}>{option.label}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{this.title}</FormHelperText>
            </FormControl>
        );
    }
}

export interface IOption {
    key: string;
    label: string;
}

interface CustomSelectFieldProps {
    options?: IOption[],
    allowEmpty?: true,
}

export default withStyles(styles)(CustomSelectField);

export function createOptions(labels: string[]): IOption[]{
    return _.map(labels, label => ({
        key: label,
        label,
    }));
}
