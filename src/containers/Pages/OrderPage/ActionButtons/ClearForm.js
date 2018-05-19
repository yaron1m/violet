import React from 'react';
import PropTypes from 'prop-types';
import ClearFormDialog from './ClearFormDialogContainer'
import CleanIcon from 'material-ui-icons/Replay';
import CustomIconButton from "../../../../components/CustomComponents/CustomIconButton";

export default class ClearFormButton extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
        }
    }

    render() {
        return (
            <CustomIconButton
                tooltip={this.props.tooltip}
                onClick={() => this.setState({dialogOpen: true})}
            >
                <CleanIcon/>
                <ClearFormDialog
                    open={this.state.dialogOpen}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                />
            </CustomIconButton>
        );
    }
}

ClearFormButton.propTypes = {
    tooltip: PropTypes.string,
};