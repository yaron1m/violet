import React from 'react';
import PropTypes from "prop-types";
import PrintIcon from '@material-ui/icons/Print';
import {CustomIconButton} from "../../../../components/CustomComponents/CustomButtons";

export default class PrintOrderButton extends React.Component {
    render() {
        return (
            <CustomIconButton
                tooltip={this.props.printLabel}
                onClick={this.props.onClick}
            >
                <PrintIcon/>
            </CustomIconButton>
        );
    }
}

PrintOrderButton.propTypes = {
    printLabel: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
