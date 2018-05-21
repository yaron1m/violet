import React from 'react';
import Switch from '@material-ui/core/Switch';
import * as _ from "lodash";
import AbstractCustomField from "./AbstractCustomField";
import Colors from "../../util/consts/colors";
import PropTypes from "prop-types";
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class CustomToggle extends AbstractCustomField {

    showError() {
        return this.state.value === undefined && _.includes(this.requiredFields, this.name);
    }

    render() {
        // const style = {
        //     toggle: {
        //         marginBottom: 6,
        //         marginTop: 6,
        //         paddingBottom: 9,
        //     },
        //     labelStyle: {
        //         marginRight: 45,
        //         marginLeft: 10,
        //     },
        // };
        const labelStyle = {
            color: this.showError() ? Colors.red : Colors.black
        };

        return (
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.value === true}
                            onChange={(event, checked) => this.handleChange(checked)}
                            color="primary"
                        />
                    }
                    label={<span style={labelStyle}>{this.title}</span>}
                />
            </div>

        );
    }
}

CustomToggle.propTypes = {
    ...AbstractCustomField.propTypes,
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