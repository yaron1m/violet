import React from "react";
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button';

export class CustomIconButton extends React.Component {
    render() {
        return (
            <IconButton
                style={this.props.style}
                onClick={this.props.onClick}
                tooltip={this.props.tooltip}
            >
                {this.props.children}
            </IconButton>
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
            <RaisedButton
                style={this.props.style}
                onClick={this.props.onClick}
                label={this.props.label}
                disabled={this.props.disabled}
                primary={this.props.primary}
            />
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
    primary: PropTypes.bool,
};