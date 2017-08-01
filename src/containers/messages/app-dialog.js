import React from 'react';
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import connect from "react-redux/es/connect/connect";
import {getDialogMessage, getDialogTitle, isDialogOpen} from "../../store/appearance/reducer";
import {closeDialog} from "../../store/appearance/actions";

class AppDialog extends React.Component {

    render() {
        return (
            <Dialog
                open={this.props.isDialogOpen}
                title={this.props.dialogTitle}
                actions={<FlatButton
                    label="אישור"
                    primary={true}
                    onTouchTap={() => this.props.dispatch(closeDialog())}
                />}

                onRequestClose={() => this.props.dispatch(closeDialog())}
            >
                {this.props.dialogMessage}
            </Dialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDialogOpen: isDialogOpen(state),
        dialogTitle: getDialogTitle(state),
        dialogMessage: getDialogMessage(state),
    };
}

export default connect(mapStateToProps)(AppDialog);