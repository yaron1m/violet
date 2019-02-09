import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../Store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../Store/Labels/Selectors";
import CustomText from "../../../../Components/CustomComponents/CustomTextField";
import CustomToggle from "../../../../Components/CustomComponents/CustomToggle";
import {getRequiredFieldsObject} from "../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";

function mapStateToProps(state: IState) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFieldsObject(state).internalOrder,
    };
}

function mapDispatchToProps(dispatch :IDispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        titles: stateProps.titles,
        values: stateProps.values,
        requiredFields: stateProps.requiredFields,
        updateAction: dispatchProps.updateAction,
        ...ownProps,
    };
}

export const InternalOrderCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const InternalOrderCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);

