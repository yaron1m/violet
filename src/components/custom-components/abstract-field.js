import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Sizes from "../../util/consts/sizes";

export default class AbstractField extends React.Component {
    constructor(props) {
        super(props);
        this.validateProps(props);

        this.name = props.name;
        this.title = props.data.titles[props.name];

        this.width = getWidth(props);
        this.state = {
            value: props.data.values[props.name]
        };

        this.basicStyle = {
            marginRight: 20,
            marginBottom: 10,
            verticalAlign: "bottom",
        }
    }

    validateProps(props) {
        if (!_.has(props.data.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in data.titles`);

        if (!_.isFunction(props.data.updateAction))
            throw Error(`Field "${props.name}" - data.updateAction must be a function`);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.data.values[this.name] === this.state.value)
            return;

        this.setState(Object.assign({}, this.state, {
            value: nextProps.data.values[this.name] ? nextProps.data.values[this.name] : ""
        }));
    }

    handleChange(newValue) {
        this.props.data.updateAction(this.name, newValue);
    }

    getErrorText() {
        const showError = !this.state.value && !_.isEmpty(this.props.data.requiredFields) && _.includes(this.props.data.requiredFields, this.name);
        return showError ? "שדה חובה" : ""; //TODO extract string to labels
    }
}

AbstractField.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    fullWidth: PropTypes.bool,
};

function getWidth(props) {
    if (props.fullWidth)
        return "100%";

    switch (props.size) {
        case Sizes.S:
            return 50;

        case Sizes.M:
            return 100;

        case Sizes.L:
        default:
            return 150;

        case Sizes.XL:
            return 200;

        case Sizes.XXL:
            return 250;
    }
}