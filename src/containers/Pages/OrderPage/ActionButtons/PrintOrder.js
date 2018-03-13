import React from 'react';
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import PrintIcon from 'material-ui/svg-icons/action/print';

export default class PrintOrderButton extends React.Component {
    render() {
        return (
            <IconButton
                tooltip={this.props.printLabel}
                onClick={this.props.onClick}
            >
                <PrintIcon/>
            </IconButton>
        );
    }
}

PrintOrderButton.propTypes = {
    printLabel: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
