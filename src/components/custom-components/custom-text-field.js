import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import * as _ from "lodash";
import Sizes from "../../util/consts/sizes";

export default class CustomText extends React.Component {
    constructor(props) {
        validateProps(props);

        super(props);

        const style = {
            marginRight: 20,
            verticalAlign: "bottom",
            marginBottom: 10,
        };

        switch (this.props.size) {
            case Sizes.S:
                style.width = 50;
                break;
            case Sizes.M:
                style.width = 100;
                break;
            case Sizes.L:
            default:
                if (this.props.fullWidth)
                    break;
                style.width = 150;
                break;
            case Sizes.XL:
                style.width = 200;
                break;
        }

        this.state = {
            name: this.props.name,
            title: this.props.data.titles[this.props.name],
            value: this.props.data.values[this.props.name],
            style,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data.values[this.state.name] === this.state.value)
            return;

        this.setState(Object.assign({}, this.state, {
            value: nextProps.data.values[this.state.name] ? nextProps.data.values[this.state.name] : ""
        }));

    }

    handleChange = (event, newValue) => {
        if (this.props.data.updateAction) {
            this.props.data.updateAction(this.state.name, newValue);
        } else {
            console.error("No update action to text field - " + this.state.name);
        }
    };


    render() {

        let showError = false;
        if (!this.state.value && !_.isEmpty(this.props.data.requiredFields) && _.includes(this.props.data.requiredFields, this.state.name))
            showError = true;

        return (
            <TextField
                style={this.state.style}
                floatingLabelText={this.state.title}
                floatingLabelFixed={true}
                fullWidth={this.props.fullWidth}
                disabled={this.props.disabled}
                value={this.state.value}
                onChange={this.handleChange}
                multiLine={true}
                rowsMax={4}
                errorText={showError ? "שדה חובה" : ""}
            />//TODO extract string to labels
        );
    }
}

CustomText.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    values: PropTypes.object,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};

CustomText.defaultProps = {
    disabled: false,
    fullWidth: false,
};

function validateProps(props) {
    if (!_.has(props.data.titles, props.name))
        throw Error(`TextField field "${props.name}" doesn't have a matching title in data.titles`);

    if (!_.isFunction(props.data.updateAction))
        throw Error(`TextField field "${props.name}" - data.updateAction must be a function`);
}