import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import React from "react";
import PropTypes from 'prop-types';

class CustomDialog extends React.Component {

    render() {
        const actions = [
            <FlatButton
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