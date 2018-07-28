import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from "prop-types";
import {CustomIconButton} from "../CustomComponents/CustomButtons";

export class SaveActionButton extends React.Component {
    render() {
        return (
            <CustomIconButton
                onClick={this.props.onClick}
                tooltip={this.props.tooltip}>
                <SaveIcon/>
            </CustomIconButton>
        );
    }
}

SaveActionButton.propTypes = {
    tooltip: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};
