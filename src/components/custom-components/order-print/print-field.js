import React from 'react';
import _ from 'lodash';
import {isEmptyValue} from "../../../util/string-util";
import AbstractField from "../abstract-field";

export default class PrintField extends AbstractField {

    validateProps(props) {
        if (!_.has(props.data.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in data.titles`);
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

        if (isEmptyValue(this.state, "value"))
            return (
                <span style={style.span}>
                    <span>{this.title}</span>
                    <span>: </span>
                </span>
            );

        return (
            <span>
                <span style={style.span}>
                <span>{this.title}</span>
                <span>: </span>
                <span style={style.value}>{this.state.value}</span>
            </span>
                <span> </span>
            </span>
        )
    }
}

PrintField.propTypes = {
    ...AbstractField.propTypes
};
