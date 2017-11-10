import React from 'react';
import connect from "react-redux/es/connect/connect";
import {getDialogActions, getDialogContent, getDialogTitle, isDialogOpen} from "../../store/appearance/reducer";
import {closeDialog} from "../../store/appearance/actions";
import CustomDialog from "../../components/custom-components/custom-dialog";

class AppDialog extends React.Component {

    render() {
        return (
            <CustomDialog
                open={this.props.isDialogOpen}
                title={this.props.dialogTitle}
                onRequestClose={() => this.props.dispatch(closeDialog())}
                actions={this.props.actions}
            >
                {this.props.dialogContent}
            </CustomDialog>
        );
    }
}

function mapStateToProps(state) {
    return {
        isDialogOpen: isDialogOpen(state),
        dialogTitle: getDialogTitle(state),
        dialogContent: getDialogContent(state),
        actions: getDialogActions(state),
    };
}

export default connect(mapStateToProps)(AppDialog);
