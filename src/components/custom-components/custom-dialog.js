import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import React from "react";
import PropTypes from 'prop-types';


class CustomDialog extends React.Component {

    render() {
        const actions = [
            <FlatButton
                label="אישור"
                primary={true}
                //keyboardFocused={true}
                onTouchTap={this.props.onRequestClose}
            />,
        ];

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                //modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                {this.props.children}
            </Dialog>
        );
    }
}


CustomDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onRequestClose: PropTypes.func,
};


export default CustomDialog;