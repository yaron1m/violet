import React from 'react';
import * as _ from "lodash";
import {updateObject} from "../../Util/ObjectUpdater";
import {Size} from '../../Util/Constants/Size';
import {IStringObject} from '../../Interfaces/IOrder';

export default class AbstractCustomField<AdditionalProps>
    extends React.PureComponent<AbstractCustomFieldProps & AdditionalProps, AbstractCustomFieldState> {
    name: string;
    title: string;
    updateAction: (name: string, newValue: any) => void;
    width: "100%" | number;
    basicStyle: React.CSSProperties;

    constructor(props: AbstractCustomFieldProps & AdditionalProps) {
        super(props);
        this.validateProps(props);

        this.name = props.name;
        this.title = props.titles[props.name];
        this.updateAction = props.updateAction;

        this.width = getWidth(props.fullWidth, props.size);
        this.state = {
            value: props.values[props.name],
            isRequired: _.includes(props.requiredFields, props.name)
        };

        this.basicStyle = {
            marginRight: 20,
            marginBottom: 10,
            verticalAlign: "bottom",
        };
    }

    validateProps(props: AbstractCustomFieldProps) {
        if (!_.has(props.titles, props.name))
            throw Error(`Field "${props.name}" doesn't have a matching title in titles`);

        if (!_.isFunction(props.updateAction))
            throw Error(`Field "${props.name}" - updateAction must be a function`);
    }

    static getDerivedStateFromProps(nextProps: AbstractCustomFieldProps, prevState: AbstractCustomFieldState) {
        let shouldUpdate = false;

        const name = nextProps.name;
        const updatedState = updateObject(prevState);
        if (nextProps.values[name] !== prevState.value) {
            updatedState.value = nextProps.values[name] ? nextProps.values[name] : "";
            shouldUpdate = true;
        }

        if (prevState.isRequired && !_.includes(nextProps.requiredFields, name)) {
            updatedState.isRequired = false;
            shouldUpdate = true;
        } else if (!prevState.isRequired && _.includes(nextProps.requiredFields, name)) {
            updatedState.isRequired = true;
            shouldUpdate = true;
        }

        if (shouldUpdate)
            return updatedState;

        return null;
    }

    handleChange(newValue: any) {
        this.updateAction(this.name, newValue);
    }

    shouldShowError() {
        return !this.state.value && this.state.isRequired;
    }
}

export interface AbstractCustomFieldProps {
    name: string;
    titles: IStringObject;
    values: { [key: string]: any; };
    updateAction: (name: string, newValue: any) => void;
    requiredFields?: string[];
    fullWidth?: boolean;
    size?: Size;
    classes?: IStringObject;
}

interface AbstractCustomFieldState {
    value: any;
    isRequired: boolean;
}

/* eslint-disable no-magic-numbers */
function getWidth(fullWidth?: boolean, size?: Size) {
    if (fullWidth)
        return "100%";

    switch (size) {
        case Size.S:
            return 50;

        case Size.M:
            return 100;

        case Size.L:
        default:
            return 150;

        case Size.XL:
            return 200;

        case Size.XXL:
            return 250;
    }
}