import Dialog from "material-ui/Dialog";
import React from "react";
import PropTypes from 'prop-types';
import {CustomFlatButton} from "./CustomButtons";

class CustomDialog extends React.Component {

    render() {
        const actions = [
            <CustomFlatButton
                key="ok"
                label="אישור"
                primary={true}
                onClick={this.props.onRequestClose}
            />,
        ];

        return (
            <Dialog
                title={this.props.title}
                actions={this.props.actions ? this.props.actions : actions}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                {this.props.children}
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