import React from 'react';
import _ from 'lodash';
import AbstractField from "../abstract-field";

export default class PrintField extends AbstractField {

    validateProps(props) {
        if (!_.has(props.data.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in data.titles`);
    }

    getValue(){
        return this.state.value;
    }

    render() {
        const style = {
            span: {
                marginLeft: 20,
                whiteSpace: "nowrap",
                marginBottom: 5,
            },
            value: {
                fontWeight: 'bold'
            },
        };

        return (
            <span>
                <span style={style.span}>
                    <span>{this.title}</span>
                    <span>: </span>
                    <span style={style.value}>{this.getValue()}</span>
                </span>
                <span> </span>
            </span>
        )
    }
}

PrintField.propTypes = {
    ...AbstractField.propTypes
};
