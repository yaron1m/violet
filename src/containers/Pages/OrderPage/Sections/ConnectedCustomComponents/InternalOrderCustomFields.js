import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {updateSelectedOrder} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/Labels/Reducer";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomToggle from "../../../../../components/CustomComponents/CustomToggle";
import {getRequiredFieldsObject} from "../../../../../store/Appearance/RequiredFields/RequiredFieldsSelectors";

function mapStateToProps(state) {
    return {
        titles: getLabels(state).pages.orderPage.sections.titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFieldsObject(state).internalOrder,
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

export const InternalOrderCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
export const InternalOrderCustomToggle = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomToggle);

