import React from 'react';
import PropTypes from 'prop-types';
import ClearFormDialog from './ClearFormDialogContainer'
import IconButton from "material-ui/IconButton";
import CleanIcon from 'material-ui-icons/Replay';

export default class ClearFormButton extends React.Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
        }
    }

    render() {
        return (
            <IconButton
                tooltip={this.props.tooltip}
                onClick={() => this.setState({dialogOpen: true})}
            >
                <CleanIcon/>
                <ClearFormDialog
                    open={this.state.dialogOpen}
                    onRequestClose={() => this.setState({dialogOpen: false})}
                />
            </IconButton>
        );
    }
}

ClearFormButton.propTypes = {
    tooltip: PropTypes.string,
};