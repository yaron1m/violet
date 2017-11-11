import React from 'react';
import _ from 'lodash';
import {isEmptyValue} from "../../../util/string-util";
import AbstractField from "../abstract-field";

export default class PrintBoolean extends AbstractField {

    validateProps(props) {
        if (!_.has(props.data.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in data.titles`);
    }

    calculateValue() {
        if (isEmptyValue(this.state, "value"))
            return false;

        return this.state.value;
    }

    render() {
        const style = {
            span: {
                marginLeft: 20,
                whiteSpace: "nowrap",
                marginBottom: 5,
            },
            key: {},
            value: {
                fontWeight: 'bold'
            },
        };

        switch (this.props.size) {
            case "M":
            default:
                style.fontSize = 20;
                break;
            case "L":
                style.fontSize = 24;
                break;
        }

        const result = this.calculateValue.bind(this)() ?  "V" : "X" ;

        return (
            <span>
                <span style={style.span}>
                <span>{this.title}</span>
                <span>: </span>
                <span style={style.value}>{result}</span>
            </span>
                <span> </span>
            </span>
        )
    }
}

PrintBoolean.propTypes = {
    ...AbstractField.propTypes
};
