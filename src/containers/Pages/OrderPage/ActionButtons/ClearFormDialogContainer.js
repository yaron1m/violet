import React from 'react';
import {connect} from 'react-redux';
import {clearSelected} from "../../../../store/selected/actions";
import {getLabels} from "../../../../store/labels/reducer";
import {hideRequiredFields} from "../../../../store/appearance/actions";
import {FlatButton} from "material-ui";
import PropTypes from "prop-types";
import CustomDialog from "../../../../components/custom-components/CustomDialog";

function getActions(dialogText, clearSelected, hideRequiredFields, closeDialog) {
    return [
        <FlatButton
            key={dialogText.clear}
            label={dialogText.clear}
            primary={true}
            onClick={() => {
                clearSelected();
                hideRequiredFields();
                closeDialog();
            }}
        />,
        <FlatButton
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
        title: getLabels(state).pages.orderPage.actionButtons.clearDialog.title,
        dialogText: getLabels(state).pages.orderPage.actionButtons.clearDialog,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearSelected: () => dispatch(clearSelected()),
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
