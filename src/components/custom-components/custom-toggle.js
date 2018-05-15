import React from 'react';
import Toggle from 'material-ui/Toggle';
import * as _ from "lodash";
import AbstractField from "./abstract-field";
import Colors from "../../util/consts/colors";
import PropTypes from "prop-types";

export default class CustomToggle extends AbstractField {

    showError() {
        return this.state.value === undefined && _.includes(this.requiredFields, this.name);
    }

    render() {
        const style = {
            toggle: {
                marginBottom: 6,
                marginTop: 6,
                paddingBottom: 9,
            },
            labelStyle: {
                marginRight: 45,
                marginLeft: 10,
                color: this.showError() ? Colors.red : Colors.black,
            },
        };

        return (
            <div>
                <Toggle
                    style={style.toggle}
                    label={this.title}
                    labelStyle={style.labelStyle}
                    labelPosition="right"
                    toggled={this.state.value === true}
                    onToggle={(event, isInputChecked) => this.handleChange(isInputChecked)}
                />
            </div>

        );
    }
}

CustomToggle.propTypes = {
    ...AbstractField.propTypes,
};

export class CustomToggleBox extends React.Component {

    render() {
        const style = {
            div: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end",
                marginBottom: 10,
            }
        };

        return (
            <div style={style.div}>
                {this.props.children}
            </div>
        );
    }
}

CustomToggleBox.propTypes = {
    children: PropTypes.node,
};