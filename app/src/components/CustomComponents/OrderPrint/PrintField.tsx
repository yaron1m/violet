import React from 'react';
import _ from 'lodash';
import AbstractCustomField from "../AbstractCustomField";

export default class PrintField extends AbstractCustomField {
    constructor(props: PrintFieldProps){
        super({
            ...props,
            updateAction: function(){},
        })
    }

    validateProps(props: PrintFieldProps) {
        if (!_.has(props.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in data.titles`);
    }

    getValue(){
        return this.state.value;
    }

    render() {
        const style = {
            span: {
                marginLeft: 20,
                marginBottom: 5,
            },
            value: {
                fontWeight: 'bold' as 'bold'
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

export interface PrintFieldProps {
    name: string;
    titles: { [key: string]: string; };
    values: { [key: string]: string; };
}
