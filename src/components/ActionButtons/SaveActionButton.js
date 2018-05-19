import React from 'react';
import IconButton from "material-ui/IconButton";
import SaveIcon from 'material-ui-icons/Save';
import PropTypes from "prop-types";

export class SaveActionButton extends React.Component {
    render() {
        return (
            <IconButton
                onClick={this.props.onClick}
                tooltip={this.props.tooltip}>
                <SaveIcon/>
            </IconButton>
        );
    }
}

SaveActionButton.propTypes = {
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
