import React from "react";
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export class CustomIconButton extends React.Component {
    render() {
        if (!this.props.tooltip)
            return (
                <IconButton
                    style={this.props.style}
                    onClick={this.props.onClick}
                >
                    {this.props.children}
                </IconButton>
            );


        return (
            <Tooltip title={this.props.tooltip}>
                <IconButton
                    style={this.props.style}
                    onClick={this.props.onClick}
                >
                    {this.props.children}
                </IconButton>
            </Tooltip>
        );
    }
}

CustomIconButton.propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node,
    tooltip: PropTypes.string,
};

export class CustomRaisedButton extends React.Component {
    render() {
        return (
            <Button
                style={this.props.style}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                primary={this.props.primary}
                color="primary"
            >
                {this.props.label}
            </Button>
        );
    }
}

CustomRaisedButton.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    style: PropTypes.object,
};

export class CustomFlatButton extends React.Component {
    render() {
        return (
            <Button
                onClick={this.props.onClick}
            >
                {this.props.label}
            </Button>
        );
    }
}

CustomFlatButton.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
};