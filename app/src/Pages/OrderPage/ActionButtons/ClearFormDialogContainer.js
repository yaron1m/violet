import React from 'react';
import {connect} from 'react-redux';
import {clearSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import {getOrderPageLabels} from "../../../Store/Labels/Selectors";
import {hideRequiredFields} from "../../../Store/Appearance/Actions";
import PropTypes from "prop-types";
import CustomDialog from "../../../Components/CustomComponents/CustomDialog";
import {CustomFlatButton} from "../../../Components/CustomComponents/CustomButtons";
import {clearSelectedOrder} from "../../../Store/SelectedOrder/Actions";

function getActions(dialogText, clearSelected, hideRequiredFields, closeDialog) {
    return [
        <CustomFlatButton
            key={dialogText.clear}
            label={dialogText.clear}
            primary={true}
            onClick={() => {
                clearSelected();
                hideRequiredFields();
                closeDialog();
            }}
        />,
        <CustomFlatButton
            key={dialogText.cancel}
            label={dialogText.cancel}
            primary={true}
            onClick={() => {
                closeDialog();
            }}
        />]
}

function mapStateToProps(state) {
    return {
        title: getOrderPageLabels(state).actionButtons.clearDialog.title,
        dialogText: getOrderPageLabels(state).actionButtons.clearDialog,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearSelected: () => {
            dispatch(clearSelectedOrder());
            dispatch(clearSelectedOrganization());
        },
        hideRequiredFields: () => dispatch(hideRequiredFields()),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        open: ownProps.open,
        title: stateProps.title,
        onRequestClose: ownProps.onRequestClose,
        actions: getActions(stateProps.dialogText, dispatchProps.clearSelected,
            dispatchProps.hideRequiredFields, ownProps.onRequestClose),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDialog);

Container.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default Container;
