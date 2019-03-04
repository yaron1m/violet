import React from "react";
import * as _ from "lodash";
import Select from "@material-ui/core/Select";
import {AbstractCustomFieldProps} from "./AbstractCustomFieldProps";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import {getFieldWidth} from "../../Util/Constants/Size";

const styles = () => ({
    formControl: {
        marginRight: 20,
        marginBottom: 10,
        verticalAlign: "bottom",
    },
});

class CustomSelectField extends React.PureComponent<CustomSelectFieldProps> {
    render() {
        const formStyle = {
            minWidth: getFieldWidth(this.props.fullWidth, this.props.size),
        };

        return (
            <FormControl
                style={formStyle}
                className={this.props.classes ? this.props.classes.formControl : undefined}
                error={this.props.isRequired && !this.props.value}
            >
                <Select
                    value={this.props.value || ""}
                    onChange={(event) => this.props.onChange(event.target.value)}
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
                <FormHelperText>{this.props.title}</FormHelperText>
            </FormControl>
        );
    }
}

export interface IOption {
    key: string | number;
    label: string;
}

interface CustomSelectFieldProps extends AbstractCustomFieldProps<string> {
    options?: IOption[],
    allowEmpty?: true,
}

export default withStyles(styles)(CustomSelectField);

export function createOptions(labels: string[]): IOption[] {
    return _.map(labels, label => ({
        key: label,
        label,
    }));
}
