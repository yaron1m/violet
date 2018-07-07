import {connect} from 'react-redux';
import {getSelectedOrder} from "../../../../../store/SelectedOrder/Selectors";
import {updatePublicCourseParticipant} from "../../../../../store/SelectedOrder/Actions";
import {getLabels} from "../../../../../store/Labels/Reducer";
import CustomText from "../../../../../components/CustomComponents/CustomTextField";
import CustomCheckbox from "../../../../../components/CustomComponents/CustomCheckbox";
import {getRequiredFieldsObject} from "../../../../../store/Appearance/RequiredFields/RequiredFieldsSelectors";
import {isRightTabKey} from "../../../../../store/Appearance/RequiredFields/Util";
import {publicCourseTabKey} from "../../../../../util/Constants/TabKeys";

function getValues(state, ownProps) {
    if (ownProps.participantIndex === null || getSelectedOrder(state).publicCourseParticipants === undefined)
        return null;

    return getSelectedOrder(state).publicCourseParticipants[ownProps.participantIndex];
}

function mapStateToProps(state, ownProps) {
    return {
        titles: getLabels(state).pages.orderPage.sections.publicCourse.titles,
        values: getValues(state, ownProps),
        requiredFields: isRightTabKey(getSelectedOrder(state), publicCourseTabKey) ? getRequiredFieldsObject(state).publicCourse : [],
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateAction: (key, value) => dispatch(updatePublicCourseParticipant(key, value, ownProps.participantIndex))
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

export const PublicCourseParticipantsCustomText = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomText);
// export const PublicCourseParticipantsCustomDatePicker = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomDatePicker);
// export const PublicCourseParticipantsCustomAutoComplete = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomAutoComplete);
export const PublicCourseParticipantsCustomCheckBox = connect(mapStateToProps, mapDispatchToProps, mergeProps)(CustomCheckbox);

