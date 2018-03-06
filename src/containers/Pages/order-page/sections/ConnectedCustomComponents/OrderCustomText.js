import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import {getLabels} from "../../../../../store/labels/reducer";
import CustomText from "../../../../../components/custom-components/custom-text-field";

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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);

