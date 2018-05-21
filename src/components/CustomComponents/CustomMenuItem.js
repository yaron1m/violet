import React from "react";
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

export default class CustomMenuItem extends React.Component {
    render() {
        return (
            <MenuItem
                value={this.props.value}
                onClick={this.props.onClick}
              //  leftIcon={this.props.leftIcon}
            >
                {this.props.primaryText}
            </MenuItem>
        );
    }
}

CustomMenuItem.propTypes = {
    value: PropTypes.any,
    primaryText: PropTypes.string,
    onClick: PropTypes.func,
    //leftIcon: PropTypes.node,
};