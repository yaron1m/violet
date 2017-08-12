import React from 'react';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

export default class CustomToggle extends React.Component {

    render() {
        const style = {
            toggle: {
                marginBottom: 6,
                marginTop: 6,
            },
            labelStyle: {
                marginRight: 45,
                marginLeft: 10
            },
        };

        return (
            <div>
                <Toggle
                    style={style.toggle}
                    label={this.props.data.titles[this.props.name]}
                    labelStyle={style.labelStyle}
                    labelPosition="right"
                    toggled={this.props.data.values[this.props.name]}
                    onToggle={(event, isInputChecked) =>
                        this.props.data.updateAction(this.props.name, isInputChecked)}
                />
            </div>

        );
    }
}

export class CustomCheckbox extends React.Component {

    render() {
        const checked = this.props.data.values[this.props.name];

        const style = {
            checkbox: {
                marginBottom: 6,
                marginTop: 6,
            },
            labelStyle: {
                marginRight: 20,
                //marginLeft: -10,
                color: checked ? "red" : "black",
            },
            iconStyle: {
                fill: checked ? 'red' : null,
                borderColor: "black",
            },
        };

        return (
            <div>
                <Checkbox
                    style={style.checkbox}
                    label={this.props.data.titles[this.props.name]}
                    labelStyle={style.labelStyle}
                    labelPosition="right"
                    checked={checked}
                    switched={checked}
                    onCheck={(event, isInputChecked) =>
                        this.props.data.updateAction(this.props.name, isInputChecked)}
                    iconStyle={style.iconStyle}
                />
            </div>

        );
    }
}

class CustomToggleBox extends React.Component {

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

export {CustomToggleBox};

