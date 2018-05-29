import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomDatePicker from "../../../../../components/CustomComponents/CustomDatePicker";
import CustomToggle from "../../../../../components/CustomComponents/CustomToggle";
import CustomCheckbox from "../../../../../components/CustomComponents/CustomCheckbox";
import CustomSelectField from "../../../../../components/CustomComponents/CustomSelectField";
import {getRequiredFieldsObject} from "../../../../../store/appearance/RequiredFields/RequiredFieldsSelectors";

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.orderPage.sections.titles,
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

