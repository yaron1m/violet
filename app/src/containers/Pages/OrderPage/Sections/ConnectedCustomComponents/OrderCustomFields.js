import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../Store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../../Store/SelectedOrder/Actions";
import {getOrderSectionsLabels} from "../../../../../Store/Labels/Selectors";
import CustomText from "../../../../../Components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../Components/CustomComponents/CustomDatePicker";
import CustomToggle from "../../../../../Components/CustomComponents/CustomToggle";
import CustomCheckbox from "../../../../../Components/CustomComponents/CustomCheckbox";
import CustomSelectField from "../../../../../Components/CustomComponents/CustomSelectField";
import {getRequiredFieldsObject} from "../../../../../Store/Appearance/RequiredFields/RequiredFieldsSelectors";

function mapStateToProps(state) {
    return {
        titles: getOrderSectionsLabels(state).titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFieldsObject(state).order,
    };
}

function mapDispatchToProps(dispatch) {
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

export const OrderCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const OrderCustomDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const OrderCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
export const OrderCustomCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);
export const OrderCustomSelectField = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomSelectField);

