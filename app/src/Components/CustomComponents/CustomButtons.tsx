import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

export function CustomIconButton(props: CustomIconButtonProps) {
    if (!props.tooltip)
        return (
            <IconButton
                style={props.style}
                onClick={props.onClick}
            >
                {props.children}
            </IconButton>
        );

    return (
        <Tooltip title={props.tooltip}>
            <IconButton
                style={props.style}
                onClick={props.onClick}
            >
                {props.children}
            </IconButton>
        </Tooltip>
    );
}

interface CustomIconButtonProps extends CustomFlatButtonProps {
    children?: React.ReactNode;
    tooltip?: string;
}

export function CustomRaisedButton(props: CustomRaisedButtonProps) {
    return (
        <Button
            style={props.style}
            onClick={props.onClick}
            disabled={props.disabled}
            color="primary"
        >
            {props.label}
        </Button>
    );
}

interface CustomRaisedButtonProps extends CustomFlatButtonProps {
    disabled?: boolean;
    label: string;
}

export function CustomFlatButton(props: CustomFlatButtonProps) {
    return (
        <Button onClick={props.onClick}>
            {props.label}
        </Button>
    );
}

interface CustomFlatButtonProps {
    onClick: () => void;
    label?: string;
    style?: React.CSSProperties;
}