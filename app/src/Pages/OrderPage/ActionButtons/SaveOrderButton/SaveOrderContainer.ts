import {connect} from "react-redux";
import {getOrderPageLabels} from "../../../../Store/Labels/Selectors";
import {closeDialog, openDialog, showRequiredFields} from "../../../../Store/Appearance/Actions";
import SaveActionButton from "../../../../Components/ActionButtons/SaveActionButton";
import {shouldSaveNewOrder} from "./ShouldSaveNewOrderDecider";
import {getSelectedOrganization, isSelectedOrganization} from "../../../../Store/SelectedOrganization/Selectors";
import {isOrderMissingFields} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {saveNewOrganization} from "../../../../Store/SelectedOrganization/Actions";
import {saveNewOrder} from "../../../../Store/SelectedOrder/Actions";
import {IDispatch, IState} from "../../../../Interfaces/ReduxInterfaces";
import * as React from "react";
import IOrganization from "../../../../Interfaces/IOrganization";

function mapStateToProps(state: IState) {
    const orderPageLabels = getOrderPageLabels(state);
    return {
        tooltip: orderPageLabels.actionButtons.save as string,
        orderPageLabels,
        isSelectedOrganization: isSelectedOrganization(state),
        selectedOrganization: getSelectedOrganization(state),
        isOrderMissingFields: isOrderMissingFields(state),
    };
}

function mapDispatchToProps(dispatch: IDispatch) {
    return {
        openDialog: (title: string, content: string, actions?: React.ReactNode[]) => dispatch(openDialog(title, content, actions)),
        closeDialog: () => dispatch(closeDialog()),
        showRequiredFields: () => dispatch(showRequiredFields()),
        saveNewOrganization: () => dispatch(saveNewOrganization()),
        saveNewOrder: () => dispatch(saveNewOrder()),
    };
}

function mergeProps(stateProps: {
    tooltip: string; orderPageLabels: any; isSelectedOrganization: boolean; selectedOrganization: IOrganization; isOrderMissingFields: boolean;
}, dispatchProps: {
    openDialog: (title: string, content: string, actions?: React.ReactNode[]) => void;
    closeDialog: () => void;
    showRequiredFields: () => void;
    saveNewOrganization: () => void;
    saveNewOrder: () => void;
}) {
    return {
        tooltip: stateProps.tooltip,
        onClick: () => {
            const shouldSave = shouldSaveNewOrder(
                stateProps.orderPageLabels,
                stateProps.isSelectedOrganization,
                stateProps.selectedOrganization,
                dispatchProps.openDialog,
                dispatchProps.closeDialog,
                stateProps.isOrderMissingFields,
                dispatchProps.showRequiredFields,
                dispatchProps.saveNewOrganization,
                dispatchProps.saveNewOrder
            );

            if (!shouldSave)
                return;

            dispatchProps.saveNewOrder();
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
