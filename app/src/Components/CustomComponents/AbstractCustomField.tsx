import React from 'react';
import * as _ from "lodash";
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

        // Avoid sending too many actions
        this.updateAction = _.debounce(props.updateAction, 400);

        this.width = getWidth(props.fullWidth, props.size);
        this.state = getInitialStateFromProps(props);

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

    static getDerivedStateFromProps(props: AbstractCustomFieldProps, state: AbstractCustomFieldState) {
        if (props.entityId !== state.entityId) {
            // New entity was loaded - must update state
            return getInitialStateFromProps(props);
        }

        // Otherwise - update only on state changes
        return state;
    }

    handleChange(newValue: any) {
        this.setState({
            value: newValue
        });

        this.updateAction(this.name, newValue)
    }

    shouldShowError() {
        return !this.state.value && this.state.isRequired;
    }
}

function getInitialStateFromProps(props: AbstractCustomFieldProps): AbstractCustomFieldState {
    return {
        value: props.values[props.name],
        isRequired: _.includes(props.requiredFields, props.name),
        entityId: props.entityId,
    };
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
    entityId: number | string;
}

interface AbstractCustomFieldState {
    value: any;
    isRequired: boolean;
    entityId: number | string;
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