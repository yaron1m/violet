import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";
import CustomDatePicker from "../../../../../components/custom-components/custom-date-picker";
import CustomToggle from "../../../../../components/custom-components/custom-toggle";
import CustomCheckbox from "../../../../../components/custom-components/custom-checkbox";
import CustomSelectField from "../../../../../components/custom-components/custom-select-field";

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.orderPage.sections.titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFields(state).order,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        data:{
            titles: stateProps.titles,
            values: stateProps.values,
            requiredFields: stateProps.requiredFields,
            updateAction: dispatchProps.updateAction,
            ...ownProps,
        },
        ...ownProps,
    };

}

export const OrderCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const OrderCustomDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
export const OrderCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);
export const OrderCustomCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);
export const OrderCustomSelectField = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomSelectField);

