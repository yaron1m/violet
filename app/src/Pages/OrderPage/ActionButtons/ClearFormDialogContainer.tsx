import React from "react";
import {connect} from "react-redux";
import {clearSelectedOrganization} from "../../../Store/SelectedOrganization/Actions";
import {hideRequiredFields} from "../../../Store/Appearance/Actions";
import CustomDialog from "../../../Components/CustomComponents/CustomDialog";
import {CustomFlatButton} from "../../../Components/CustomComponents/CustomButtons";
import {clearSelectedOrder} from "../../../Store/SelectedOrder/Actions";
import {IDispatch} from "../../../Interfaces/ReduxInterfaces";

function getActions(clearSelected: () => void, hideRequiredFields: () => void, closeDialog: () => void) {
    return [
        <CustomFlatButton
            key="נקה טופס"
            label="נקה טופס"
            onClick={() => {
                clearSelected();
                hideRequiredFields();
                closeDialog();
            }}
        />,
        <CustomFlatButton
            key="בטל"
            label="בטל"
            onClick={() => {
                closeDialog();
            }}
        />];
}

function mapDispatchToProps(dispatch: IDispatch, ownProps: { open: boolean, onRequestClose: () => void }) {
    const clearSelected = () => {
        dispatch(clearSelectedOrder());
        dispatch(clearSelectedOrganization());
    };

    return {
        open: ownProps.open,
        title: "ניקוי טופס הזמנה",
        children: <div>האם אתה בטוח שברצונך לנקות את כל השדות בטופס?</div>,
        onRequestClose: ownProps.onRequestClose,
        actions: getActions(clearSelected, () => dispatch(hideRequiredFields()), ownProps.onRequestClose),

    };
}

export default connect(undefined, mapDispatchToProps)(CustomDialog);
