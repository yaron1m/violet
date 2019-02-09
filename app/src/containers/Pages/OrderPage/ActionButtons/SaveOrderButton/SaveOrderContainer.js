import {connect} from 'react-redux';
import {getOrderPageLabels} from "../../../../../Store/Labels/Selectors";
import {closeDialog, openDialog, showRequiredFields} from "../../../../../Store/Appearance/Actions";
import SaveActionButton from "../../../../../Components/ActionButtons/SaveActionButton";
import {shouldSaveNewOrder} from "./ShouldSaveNewOrderDecider";
import {getSelectedOrganization, isSelectedOrganization} from "../../../../../Store/SelectedOrganization/Selectors";
import {isOrderMissingFields} from "../../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {saveNewOrganization} from "../../../../../Store/SelectedOrganization/Actions";
import {saveNewOrder} from "../../../../../Store/SelectedOrder/Actions";


function mapStateToProps(state) {
    const orderPageLabels = getOrderPageLabels(state);
    return {
        tooltip: orderPageLabels.actionButtons.save,

        orderPageLabels,
        isSelectedOrganization: isSelectedOrganization(state),
        selectedOrganization: getSelectedOrganization(state),
        isOrderMissingFields: isOrderMissingFields(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openDialog: (title, content, actions) => dispatch(openDialog(title, content, actions)),
        closeDialog: () => dispatch(closeDialog()),
        showRequiredFields: () => dispatch(showRequiredFields()),
        saveNewOrganization: () => dispatch(saveNewOrganization()),

        saveNewOrder: () => dispatch(saveNewOrder()),
    }
}

function mergeProps(stateProps, dispatchProps) {
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SaveActionButton);
