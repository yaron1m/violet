import React from "react";
import PropTypes from 'prop-types';
import {CustomFlatButton} from "./CustomButtons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CustomDialog extends React.Component {

    render() {
        const actions = [
            <CustomFlatButton
                key="ok"
                label="אישור"
                primary={true}
                onClick={this.props.onRequestClose}
            />
        ];

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onRequestClose}
                maxWidth="md"
            >
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    {this.props.children}
                </DialogContent>
                <DialogActions>
                    {this.props.actions ? this.props.actions : actions}
                </DialogActions>
            </Dialog>
        );
    }
}


CustomDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    actions: PropTypes.array,
    children: PropTypes.node,
};


export default CustomDialog;