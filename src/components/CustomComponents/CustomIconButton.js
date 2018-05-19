import React from "react";
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

class CustomIconButton extends React.Component {
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

export default CustomIconButton;