import React from 'react';
import * as _ from "lodash";
import {updateObject} from "../../util/ObjectUpdater";
import {Sizes} from '../../util/Constants/Sizes';

export default class AbstractCustomField extends React.Component<AbstractCustomFieldProps, AbstractCustomFieldState> {
    name: string;
    title: string;
    updateAction: (name: string, newValue: any) => void;
    width: "100%" | number;
    basicStyle: React.CSSProperties;

    constructor(props: AbstractCustomFieldProps) {
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
            return null;

        return updatedState;
    }

    handleChange(newValue: string) {
        this.updateAction(this.name, newValue);
    }

    shouldShowError() {
        return !this.state.value && this.state.isRequired;
    }
}

interface AbstractCustomFieldProps {
    name: string;
    titles: { [key: string]: string; };
    values: { [key: string]: string; };
    updateAction: (name: string, newValue: string) => void;
    requiredFields?: string[];
    fullWidth?: boolean;
    size?: Sizes;
}

interface AbstractCustomFieldState {
    value: string;
    isRequired: boolean;
}

/* eslint-disable no-magic-numbers */
function getWidth(fullWidth?: boolean, size?: Sizes) {
    if (fullWidth)
        return "100%";

    switch (size) {
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