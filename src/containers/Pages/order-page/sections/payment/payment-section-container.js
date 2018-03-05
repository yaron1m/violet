import PaymentSection from './payment-section';
import {connect} from 'react-redux';
import {getLabels} from "../../../../../store/labels/reducer";
import {getSelectedOrder} from "../../../../../store/selected/reducer";
import {getRequiredFields} from "../../../../../store/required-fields/reducer";
import {updateSelectedOrder} from "../../../../../store/selected/actions";
import calculateSum from './calculate-sum';

function mapStateToProps(state) {
    const labels = getLabels(state).pages.orderPage.sections.payment;

    return {
        sectionName: labels.sectionName,
        titles: labels.titles,
        values: getSelectedOrder(state),
        requiredFields: getRequiredFields(state).order,

        financialContactTitle: labels.financialContactTitle,
        buttonTooltip: labels.buttonTooltip,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateAction: (key, value) => dispatch(updateSelectedOrder(key, value)),
    };
}

function mergeProps(stateProps, dispatchProps){
    return {
        ...stateProps,
        ...dispatchProps,
        calculateSum: () => calculateSum(stateProps.values, dispatchProps.updateAction)
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PaymentSection);