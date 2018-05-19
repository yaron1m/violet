import React from "react";
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

export default class CustomMenuItem extends React.Component {
    render() {
        return (
            <MenuItem
                value={this.props.value}
                primaryText={this.props.primaryText}
                onClick={this.props.onClick}
                leftIcon={this.props.leftIcon}
            />
        );
    }
}

CustomMenuItem.propTypes = {
    key: PropTypes.string,
    value: PropTypes.any,
    primaryText: PropTypes.string,
    onClick: PropTypes.func,
    leftIcon: PropTypes.node,
};