import React from 'react';
import {connect} from 'react-redux';
import {clearSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import {getOrderPageLabels} from "../../../Store/Labels/Selectors";
import {hideRequiredFields} from "../../../Store/Appearance/Actions";
import CustomDialog from "../../../Components/CustomComponents/CustomDialog";
import {CustomFlatButton} from "../../../Components/CustomComponents/CustomButtons";
import {clearSelectedOrder} from "../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from '../../../Interfaces/ReduxInterfaces';

function getActions(dialogText: any, clearSelected: () => void, hideRequiredFields: () => void, closeDialog: () => void) {
    return [
        <CustomFlatButton
            key={dialogText.clear}
            label={dialogText.clear}
            onClick={() => {
                clearSelected();
                hideRequiredFields();
                closeDialog();
            }}
        />,
        <CustomFlatButton
            key={dialogText.cancel}
            label={dialogText.cancel}
            onClick={() => {
                closeDialog();
            }}
        />];
}

function mapStateToProps(state: IState) {
    return {
        title: getOrderPageLabels(state).actionButtons.clearDialog.title,
        dialogText: getOrderPageLabels(state).actionButtons.clearDialog,
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        clearSelected: () => {
            dispatch(clearSelectedOrder());
            dispatch(clearSelectedOrganization());
        },
        hideRequiredFields: () => dispatch(hideRequiredFields()),
    };
}

function mergeProps(stateProps: {
    title: string,
    dialogText: any
}, dispatchProps: {
    clearSelected: () => void,
    hideRequiredFields: () => void
}, ownProps: {
    open: boolean,
    onRequestClose: () => void
}) {
    return {
        open: ownProps.open,
        title: stateProps.title,
        onRequestClose: ownProps.onRequestClose,
        actions: getActions(stateProps.dialogText, dispatchProps.clearSelected,
            dispatchProps.hideRequiredFields, ownProps.onRequestClose),
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDialog);
