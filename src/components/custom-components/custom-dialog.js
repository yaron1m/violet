import {Dialog, FlatButton} from "material-ui";
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
    title: PropTypes.string,
    data: PropTypes.bool,
    onRequestClose: PropTypes.func,
};


export default CustomDialog;