import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/Labels/Reducer";
import {closeDialog, openDialog, showRequiredFields} from "../../../../../store/Appearance/Actions";
import {SaveActionButton} from "../../../../../components/ActionButtons/SaveActionButton";
import {shouldSaveNewOrder} from "./NewOrderSaver";
import {getSelectedOrganization, isSelectedOrganization} from "../../../../../store/SelectedOrganization/Selectors";
import {isOrderMissingFields} from "../../../../../store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {saveNewOrganization} from "../../../../../store/SelectedOrganization/Actions";
import {saveNewOrder} from "../../../../../store/SelectedOrder/Actions";


function mapStateToProps(state) {
    const orderPageLabels = getLabels(state).pages.orderPage;
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
