import React from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import Sizes from "../../util/consts/sizes";

export default class AbstractCustomField extends React.Component {
    constructor(props) {
        super();
        this.validateProps(props);

        this.name = props.name;
        this.title = props.titles[props.name];
        this.updateAction = props.updateAction;
        this.requiredFields = props.requiredFields;

        this.width = getWidth(props);
        this.state = {
            value: props.values[props.name]
        };

        this.basicStyle = {
            marginRight: 20,
            marginBottom: 10,
            verticalAlign: "bottom",
        }
    }

    validateProps(props) {
        if (!_.has(props.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in titles`);

        if (!_.isFunction(props.updateAction))
            throw Error(`Field "${props.name}" - updateAction must be a function`);
    }


    //TODO fix deprecated function
    componentWillReceiveProps(nextProps) {
        if (nextProps.values[this.name] !== this.state.value)
            this.setState(Object.assign({}, this.state, {
                value: nextProps.values[this.name] ? nextProps.values[this.name] : ""
            }));

        this.requiredFields = nextProps.requiredFields;
    }

    handleChange(newValue) {
        this.updateAction(this.name, newValue);
    }

    shouldShowError() {
        return !this.state.value && !_.isEmpty(this.requiredFields) && _.includes(this.requiredFields, this.name);
    }
}

AbstractCustomField.propTypes = {
    name: PropTypes.string.isRequired,
    titles: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    updateAction: PropTypes.func.isRequired,
    requiredFields: PropTypes.array,
    fullWidth: PropTypes.bool,
};

/* eslint-disable no-magic-numbers */
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