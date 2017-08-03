import React from 'react';
import Toggle from 'material-ui/Toggle';
import {Paper} from "material-ui";

class CustomToggle extends React.Component {

    render() {
        const style = {
            toggle: {
                marginBottom: 6,
                marginTop: 6,
            },
            labelStyle: {
                marginRight: 50,
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

export default CustomToggle;

class CustomToggleBox extends React.Component {

    render() {
        const style = {
            paper: {
                padding: 5,
                marginTop: 20,
                paddingBottom: 2,
                display: "inline-flex"
            }, flex: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "flex-end"
            }
        };

        return (
            <Paper style={style.paper}>
                <div style={style.flex}>
                    {this.props.children}
                </div>
            </Paper>

        );
    }
}

export {CustomToggleBox};

